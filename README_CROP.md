Crop images to 1920x1080 (Digiplot)

1. From the project root, install dependencies (requires Node/npm):

```bash
npm install
```

2. Run the crop script (it will resize to 2048×1024):

```bash
npm run crop
```

3. Output files will be placed in `images/cropped/` with names:
- `DIGIPLOT1_cropped.jpg`
- `DIGIPLOT1_cropped.webp`
- `DIGIPLOT2_cropped.jpg`

Notes:
- If you don't have Node or cannot run scripts, you can crop images manually with any image editor to 1920×1080.
- The script uses `sharp` and will create the `images/cropped` folder if missing.
If you don't want spaces in filenames (recommended), rename the carousel images locally to use hyphens or underscores, e.g.:
- `PRIMERA_IMAGEN_CARRUSEL.png` or `primera-imagen-carrusel.png`

A small client-side fallback is included (`js/images-fallback.js`) that will try `-`/`_`/no-space variants automatically if those files exist.
