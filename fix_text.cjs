const fs = require('fs');
const file = 'c:/Users/bhava/Downloads/srikara-main-main/srikara-main-main/src/components/sections/FounderVisionSection.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('THE VISION BEHIND <span className="text-[#8B1A4A]">SRIKARA</span>', 'THE VISION THAT BUILT <span className="text-[#8B1A4A]">SRIKARA</span>');
fs.writeFileSync(file, content);
console.log('Fixed text in srikara-main-main');
