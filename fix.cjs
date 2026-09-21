const fs = require('fs');
['add_pln_patel_blogs.cjs', 'add_gopinath_blogs.cjs', 'add_pankaj_kumar_blogs.cjs', 'add_thanuja_blogs.cjs'].forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(
    'mainContent = mainContent.replace(/},?\\s*\\];\\s*$/, `},${result}\\n];\\n`);',
    "mainContent = mainContent.substring(0, mainContent.lastIndexOf('];')) + ',' + result + '\\n];\\n';"
  );
  fs.writeFileSync(f, c);
});
