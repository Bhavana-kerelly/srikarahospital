const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src/data/branches');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && f !== 'index.js');
files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  const newImagePath = '/images/branches/' + f.replace('.js', '.jpg');
  content = content.replace(/heroImage:\s*['"][^'"]+['"]/, `heroImage: '${newImagePath}'`);
  fs.writeFileSync(filePath, content);
});
console.log('Done updating branch images to local paths.');
