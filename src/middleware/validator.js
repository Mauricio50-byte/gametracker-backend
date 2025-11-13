function validateGameCreate(req, res, next) {
  const { titulo, plataforma, genero } = req.body || {};
  if (!titulo || !plataforma || !genero) {
    return res.status(400).json({ success: false, message: 'Campos requeridos: titulo, plataforma, genero' });
  }
  next();
}

function validateReviewCreate(req, res, next) {
  const { juegoId, titulo, contenido, puntuacion } = req.body || {};
  if (!juegoId || !titulo || !contenido || typeof puntuacion !== 'number') {
    return res.status(400).json({ success: false, message: 'Campos requeridos: juegoId, titulo, contenido, puntuacion' });
  }
  if (puntuacion < 1 || puntuacion > 5) {
    return res.status(400).json({ success: false, message: 'puntuacion debe estar entre 1 y 5' });
  }
  next();
}

module.exports = { validateGameCreate, validateReviewCreate };