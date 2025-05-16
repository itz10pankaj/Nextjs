import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const publicDir = path.join(__dirname, 'public');

const filesToUpdate = [
  {
    file: 'sitemap.xml',
    xsl: 'sitemap-index.xsl',
  },
  {
    file: 'sitemap-0.xml',
    xsl: 'sitemap.xsl',
  },
];

filesToUpdate.forEach(({ file, xsl }) => {
  const filePath = path.join(publicDir, file);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return console.error(`Error reading ${file}:`, err);

    if (data.includes('xml-stylesheet')) {
      console.log(`${file}: Stylesheet already present`);
      return;
    }

    const updated = data.replace(
      /(<\?xml version="1.0" encoding="UTF-8"\?>)/,
      `$1\n<?xml-stylesheet type="text/xsl" href="/${xsl}"?>`
    );

    fs.writeFile(filePath, updated, (err) => {
      if (err) return console.error(`Error writing ${file}:`, err);
      console.log(`${file}: Stylesheet inserted successfully`);
    });
  });
});
