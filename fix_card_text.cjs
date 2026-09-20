const fs = require('fs');
const file = 'c:/Users/bhava/Downloads/srikara-main-main/srikara-main-main/src/components/sections/FounderChairmanCard.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  'The Vision <span className="text-[#8B1A4A]">Behind Srikara</span>',
  'The Vision That Built <span className="text-[#8B1A4A]">Srikara</span>'
);
fs.writeFileSync(file, content);
console.log('Fixed text in FounderChairmanCard.jsx');
