const fs = require('fs');

async function fetchGoogleDocText(url) {
  const exportUrl = url.replace(/\/edit.*$/, '/export?format=txt');
  const response = await fetch(exportUrl);
  if (!response.ok) throw new Error(`Failed to fetch ${exportUrl}: ${response.statusText}`);
  return await response.text();
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const urls = [
  'https://docs.google.com/document/d/1BpAEANNGX7PvO0f2vlBuZuY7nijYY2wt/edit',
  'https://docs.google.com/document/d/1NFSD9GnPWfvUVr7UVU2dafo4NsvV0vja/edit',
  'https://docs.google.com/document/d/19GJSX18dR2TOR0HxJS0vorf4gSfHAE_9/edit',
  'https://docs.google.com/document/d/1J-PiCqgfTsRtFtpLQR3T8rD5yyMKaesl/edit',
  'https://docs.google.com/document/d/1uJwnfPDjHhm2-MgJ1uitnYB5Y_HZHnq8/edit'
];

const DOCTOR_SLUG = 'viswa-sundeep';
const DOCTOR_CATEGORY = 'Neuro Surgeon';

async function main() {
  let result = '';

  for (let index = 0; index < urls.length; index++) {
    console.log(`Fetching blog ${index + 1}...`);
    const content = await fetchGoogleDocText(urls[index]);
    
    // Remove BOM
    let text = content.charCodeAt(0) === 65279 ? content.substring(1) : content;
    
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) continue;

    const title = lines[0];
    const excerpt = lines.length > 1 ? lines[1] : '';
    const slug = slugify(title);
    
    let htmlContent = '';
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.endsWith('?')) {
          htmlContent += `<h3>${line}</h3>\\n`;
      } else if ((/^[0-9]\./.test(line) || /^[A-Z][a-z]+ [A-Z]/.test(line)) && line.length < 60 && !line.includes('.')) {
          htmlContent += `<h3>${line}</h3>\\n`;
      } else if (line.startsWith('*') || line.startsWith('-')) {
          htmlContent += `<ul><li>${line.substring(1).trim()}</li></ul>\\n`;
      } else {
          htmlContent += `<p>${line}</p>\\n`;
      }
    }
    
    // Simplify multiple uls
    htmlContent = htmlContent.replace(/<\/ul>\\n<ul>/g, '\\n');

    const obj = `
  {
    id: ${Date.now() + index},
    doctorSlug: '${DOCTOR_SLUG}',
    slug: '${slug}',
    title: \`${title}\`,
    excerpt: \`${excerpt}\`,
    category: '${DOCTOR_CATEGORY}',
    date: '21 Sep 2026',
    readTime: '4 min read',
    image: '/images/doctor-blogs/${DOCTOR_SLUG}-blog-${index + 1}.jpg',
    content: \`
${htmlContent.trim()}
    \`
  },`;
    
    result += obj;
  }

  const mainFile = 'src/data/doctor-blogs.js';
  let mainContent = fs.readFileSync(mainFile, 'utf8');
  mainContent = mainContent.substring(0, mainContent.lastIndexOf('];')) + ',' + result + '\n];\n';
  fs.writeFileSync(mainFile, mainContent);
  console.log('Successfully appended blogs for Dr. Viswa Sundeep');
}

main().catch(console.error);
