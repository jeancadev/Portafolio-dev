const sharp = require('sharp');

sharp('public/profile/profile.jpg')
  .resize(512, 512, {
    fit: 'cover',
    withoutEnlargement: true
  })
  .webp({ quality: 85 })
  .toFile('public/profile/profile.webp')
  .then(info => console.log('Imagen optimizada:', info))
  .catch(err => console.error('Error:', err));

// Crear una versión pequeña para el placeholder
sharp('public/profile/profile.jpg')
  .resize(20, 20, { fit: 'cover' })
  .blur(2)
  .toBuffer()
  .then(buffer => {
    const blurDataURL = ;
    console.log('Blur placeholder:', blurDataURL);
  });
