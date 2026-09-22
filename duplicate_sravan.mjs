import fs from 'fs';
import { DOCTOR_BLOGS } from './src/data/doctor-blogs.js';

const sravanBlogs = DOCTOR_BLOGS.filter(b => b.doctorSlug === 'p-sravan-reddy');
const newBlogs = sravanBlogs.map((b, i) => {
  const newBlog = { ...b, id: Date.now() + i, doctorSlug: 'sravan-reddy-p' };
  let str = "  {\n";
  for (let key in newBlog) {
    if (key === 'content' || key === 'excerpt' || key === 'title') {
      str += `    ${key}: \`${newBlog[key].replace(/`/g, '\\`')}\`,\n`;
    } else if (typeof newBlog[key] === 'string') {
      str += `    ${key}: '${newBlog[key]}',\n`;
    } else {
      str += `    ${key}: ${newBlog[key]},\n`;
    }
  }
  str += "  }";
  return str;
});

if (newBlogs.length > 0) {
    let text = fs.readFileSync('./src/data/doctor-blogs.js', 'utf8');
    text = text.replace('];', ',\n' + newBlogs.join(',\n') + '\n];');
    fs.writeFileSync('./src/data/doctor-blogs.js', text);
    console.log('Successfully duplicated ' + newBlogs.length + ' blogs for sravan-reddy-p');
} else {
    console.log('No blogs found for p-sravan-reddy');
}
