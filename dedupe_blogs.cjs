const fs = require('fs');
const parser = require('@babel/parser');

const targetFile = 'c:/Users/bhava/Downloads/srikara----main/srikara----main/src/data/doctor-blogs.js';
const code = fs.readFileSync(targetFile, 'utf8');

const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx']
});

let doctorBlogsArray = null;

ast.program.body.forEach(node => {
  if (node.type === 'ExportNamedDeclaration' && node.declaration && node.declaration.type === 'VariableDeclaration') {
    const decl = node.declaration.declarations[0];
    if (decl.id.name === 'DOCTOR_BLOGS' && decl.init.type === 'ArrayExpression') {
      doctorBlogsArray = decl.init;
    }
  }
});

if (!doctorBlogsArray) {
  console.error("Could not find DOCTOR_BLOGS array");
  process.exit(1);
}

const seen = new Set();
const nodesToRemove = [];

doctorBlogsArray.elements.forEach(element => {
  if (!element || element.type !== 'ObjectExpression') return;
  
  let doctorSlug = '';
  let slug = '';
  
  element.properties.forEach(prop => {
    if (prop.key && prop.key.name === 'doctorSlug') {
      doctorSlug = prop.value.value;
    }
    if (prop.key && prop.key.name === 'slug') {
      slug = prop.value.value;
    }
  });
  
  const key = doctorSlug + '|' + slug;
  if (seen.has(key)) {
    nodesToRemove.push(element);
  } else {
    seen.add(key);
  }
});

console.log(`Found ${nodesToRemove.length} duplicate blogs to remove.`);

// Sort backwards so that slicing doesn't affect earlier offsets
nodesToRemove.sort((a, b) => b.start - a.start);

let updatedCode = code;

nodesToRemove.forEach(node => {
  let start = node.start;
  let end = node.end;
  
  // Find the comma after the object to remove it too
  while (end < updatedCode.length && updatedCode[end] !== ',') {
    if (updatedCode[end] === ']' || updatedCode[end] === '}') break; // Should not happen but just in case
    if (!updatedCode[end].match(/\s/)) break; // Found something else
    end++;
  }
  if (updatedCode[end] === ',') end++;
  
  updatedCode = updatedCode.slice(0, start) + updatedCode.slice(end);
});

// Remove trailing whitespace before the closing bracket if any got messed up
updatedCode = updatedCode.replace(/,\s*\];$/, '\n];');

fs.writeFileSync(targetFile, updatedCode, 'utf8');
console.log('Successfully deduplicated doctor-blogs.js');
