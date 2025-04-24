const sharp = require('sharp');

const optimizeProfileImage = async () => {
  try {
    // Optimizar para la versión principal
    await sharp('public/profile/profile.jpg')
      .resize(512, 512, {
        fit: 'cover',
        withoutEnlargement: true
      })
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true
      })
      .toFile('public/profile/profile-optimized.jpg');

    // Crear versión WebP
    await sharp('public/profile/profile.jpg')
      .resize(512, 512, {
        fit: 'cover',
        withoutEnlargement: true
      })
      .webp({ quality: 85 })
      .toFile('public/profile/profile.webp');

    console.log('Imágenes optimizadas correctamente');
  } catch (error) {
    console.error('Error al optimizar las imágenes:', error);
  }
};

optimizeProfileImage();
