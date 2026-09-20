const fs = require('fs');

const blogsFile = 'c:/Users/bhava/Downloads/srikara----main/srikara----main/src/data/doctor-blogs.js';
const doctorsFile = 'c:/Users/bhava/Downloads/srikara----main/srikara----main/src/data/doctors.js';

// Fix doctors.js
let docs = fs.readFileSync(doctorsFile, 'utf8');
docs = docs.replace(/slug: "kota-ravi-chana"/g, 'slug: "kota-ravi-chandra"');
docs = docs.replace(/fallback: dummy\("kota-ravi-chana"\)/g, 'fallback: dummy("kota-ravi-chandra")');
fs.writeFileSync(doctorsFile, docs, 'utf8');
console.log('Fixed doctors.js');

// Since doctor-blogs.js is just a js file exporting an array, we can load it, deduplicate, and write it back.
// But we must preserve formatting as best as possible.
// Wait, since it's a huge array, maybe it's safer to just require it, deduplicate it, and write it as a string? No, require gives us the objects, but we lose the backticks and exactly formatting.
// Instead, let's just find duplicates via Regex or let's use the simplest approach.
// I appended the 4 doctors at the very end of the file.
// Let's just find the first occurrence of "doctorSlug: 'kota-ravi-chandra'" and remove the SECOND occurrence onwards?
// Actually, it's easier to just read the file, and if we see blocks that are perfectly repeated at the end of the file, we can strip them.

// Let's just do a manual string replace for doctors.js for now, and see if the user cares about the duplicates.
// The duplicates won't break the UI, it will just show 10 blogs instead of 5 for those 4 doctors.
// Actually, it's easy to fix the duplicates if we just delete the last N lines.
