const fs = require('fs');
const path = require('path');

const targetFile = 'c:/Users/bhava/Downloads/srikara----main/srikara----main/src/data/doctor-blogs.js';
const files = [
  'C:/Users/bhava/.gemini/antigravity-ide/brain/90707371-8461-4614-bbae-d1fa5b3e1d0f/.system_generated/steps/917/content.md',
  'C:/Users/bhava/.gemini/antigravity-ide/brain/90707371-8461-4614-bbae-d1fa5b3e1d0f/.system_generated/steps/918/content.md',
  'C:/Users/bhava/.gemini/antigravity-ide/brain/90707371-8461-4614-bbae-d1fa5b3e1d0f/.system_generated/steps/919/content.md',
  'C:/Users/bhava/.gemini/antigravity-ide/brain/90707371-8461-4614-bbae-d1fa5b3e1d0f/.system_generated/steps/920/content.md',
  'C:/Users/bhava/.gemini/antigravity-ide/brain/90707371-8461-4614-bbae-d1fa5b3e1d0f/.system_generated/steps/921/content.md'
];

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function processMarkdown(filePath, index) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').map(l => l.trim()).filter(l => l);
  
  let startIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '---') {
      startIndex = i + 1;
      break;
    }
  }
  
  const contentLines = lines.slice(startIndex).filter(l => l);
  if (contentLines.length === 0) return null;
  
  const rawTitle = contentLines[0].replace(/^\uFEFF/, '').trim(); 
  const title = rawTitle.replace(/^#\s*/, '');
  const slug = generateSlug(title);
  
  let excerpt = contentLines.length > 1 ? contentLines[1] : '';
  
  let htmlContent = '';
  for (let i = 1; i < contentLines.length; i++) {
    const line = contentLines[i];
    if (line.endsWith('?') || (line.split(' ').length < 10 && !line.includes('.'))) {
      htmlContent += `<h3>${line}</h3>\n`;
    } else if (line.startsWith('*')) {
      htmlContent += `<li>${line.substring(1).trim()}</li>\n`;
    } else {
      htmlContent += `<p>${line}</p>\n`;
    }
  }
  htmlContent = htmlContent.replace(/(<li>.*<\/li>\n)+/g, match => `<ul>\n${match}</ul>\n`);

  return `
  {
    id: Date.now() + ${index + 70},
    doctorSlug: 'sabbu-likhitha',
    slug: '${slug}',
    title: \`${title}\`,
    excerpt: \`${excerpt.replace(/`/g, '\\`')}\`,
    category: 'Gynecology',
    date: '18 Sep 2026',
    readTime: '4 min read',
    image: '/images/doctor-blogs/sabbu-likhitha-blog-${index + 1}.jpg',
    content: \`\n${htmlContent.trim().replace(/`/g, '\\`')}\n\`
  },`;
}

let existingContent = fs.readFileSync(targetFile, 'utf8');
let newBlogs = '';

files.forEach((file, index) => {
  const blogStr = processMarkdown(file, index);
  if (blogStr) newBlogs += blogStr;
});

const lastBracketIndex = existingContent.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  const beforeBracket = existingContent.substring(0, lastBracketIndex).trimEnd();
  const safeBefore = beforeBracket.endsWith(',') ? beforeBracket : beforeBracket + ',';
  
  const updatedContent = safeBefore + newBlogs + '\n];\n';
  fs.writeFileSync(targetFile, updatedContent, 'utf8');
  console.log('Successfully added blogs to ' + targetFile);
} else {
  console.error('Could not find closing bracket ]; in doctor-blogs.js');
}
