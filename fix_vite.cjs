const fs = require('fs');
const file = 'c:/Users/bhava/Downloads/srikara-main-main/srikara-main-main/vite.config.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/base:\s*['"]\/?['"],/g, "base: './',");
fs.writeFileSync(file, content);
console.log('Fixed vite.config.js in srikara-main-main');
