const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const srcDir = path.join(__dirname, '..', 'images');
const outDir = path.join(srcDir, 'cropped');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

async function crop(inputName, outputName) {
  const input = path.join(srcDir, inputName);
  const output = path.join(outDir, outputName);
  try {
    await sharp(input)
      .resize(2048, 1024, { fit: 'cover', position: 'centre' })
      .toFile(output);
    console.log('Saved', output);
  } catch (err) {
    console.error('Failed to process', inputName, err.message);
  }
}

(async function run() {
  await crop('DIGIPLOT 1.png', 'DIGIPLOT1_cropped.jpg');
  await crop('DIGIPLOT 1.webp', 'DIGIPLOT1_cropped.webp');
  await crop('DIGIPLOT 2.png', 'DIGIPLOT2_cropped.jpg');
  console.log('All done');
})();
