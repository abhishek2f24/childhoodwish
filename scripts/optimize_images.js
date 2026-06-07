const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Paths
const artifactDir = 'C:\\Users\\Abhishek\\.gemini\\antigravity\\brain\\4e157c6e-3434-4027-ad73-31777a4c6852';
const targetDir = path.join(__dirname, '..', 'public', 'images');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Image mapping from artifact prefixes to final public filenames
const imageMap = {
  'rc_helicopter_1': ['rc-helicopter-1.jpg', 'rc-helicopter-2.jpg'],
  'rc_car_1': ['rc-car-1.jpg', 'rc-car-2.jpg'],
  'kancha_1': ['kancha-1.jpg'],
  'brick_game_1': ['brick-game-1.jpg'],
  'phantom_1': ['phantom-1.jpg'],
  'geometry_1': ['geometry-1.jpg'],
  'beyblade_1': ['beyblade-1.jpg'],
  'hotwheels_1': ['hotwheels-1.jpg'],
  'trump_1': ['trump-1.jpg'],
  'box_90s': ['box-90s.jpg'],
  'box_dreamer': ['box-dreamer.jpg'],
  'box_custom': ['box-custom.jpg']
};

async function optimize() {
  console.log('Starting image optimization...');
  const files = fs.readdirSync(artifactDir);

  for (const [prefix, destNames] of Object.entries(imageMap)) {
    // Find the file that starts with the prefix and ends with .png
    const matchingFile = files.find(f => f.startsWith(prefix) && f.endsWith('.png'));
    if (!matchingFile) {
      console.log(`Source image not found yet for prefix: ${prefix}`);
      continue;
    }

    const srcPath = path.join(artifactDir, matchingFile);
    for (const destName of destNames) {
      const destPath = path.join(targetDir, destName);
      console.log(`Optimizing ${matchingFile} -> ${destName}...`);
      await sharp(srcPath)
        .resize(600, 600, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(destPath);
      console.log(`Successfully saved ${destName}`);
    }
  }
  console.log('All available images optimized!');
}

optimize().catch(err => {
  console.error('Error optimizing images:', err);
});
