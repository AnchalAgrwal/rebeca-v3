import fs from 'fs';
import sharp from 'sharp';

const directory = './public/rebeca-pink-frames'; // Path to your JPGs

fs.readdirSync(directory).forEach(file => {
  if (file.endsWith('.jpg')) {
    sharp(`${directory}/${file}`)
      .webp({ quality: 80 })
      .toFile(`${directory}/${file.replace('.jpg', '.webp')}`)
      .then(() => console.log(`Converted: ${file}`))
      .catch(err => console.error(err));
  }
});