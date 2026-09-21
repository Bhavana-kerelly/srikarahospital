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
  'https://docs.google.com/document/d/1p8R0KXOwM0g3IbwhjdS11nfMP3UX9inZ/edit',
  'https://docs.google.com/document/d/1ckCChMIOuXw6gVk7x8y9XyK4yVjFhS_a/edit',
  'https://docs.google.com/document/d/1_2LywlyjW0rjdPGTiiARmUqddi682iM3/edit',
  'https://docs.google.com/document/d/10M7o5z-331chG6I9S1ZM594IwfeW-6zN/edit',
  'https://docs.google.com/document/d/18gtPN0Klp2QPE3EKndzpdP28gnA_oYUX/edit'
];

const DOCTOR_SLUG = 'pankaj-kumar';
const DOCTOR_CATEGORY = 'General & Laparoscopic Surgery';

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
  console.log('Successfully appended blogs for Dr. Pankaj Kumar');
}

main().catch(console.error);
