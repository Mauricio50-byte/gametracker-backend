const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true, maxlength: 100 },
  plataforma: {
    type: String,
    required: true,
    enum: [
      'PC',
      'PlayStation 5',
      'PlayStation 4',
      'Xbox Series X/S',
      'Xbox One',
      'Nintendo Switch',
      'Mobile',
      'Otra'
    ]
  },
  genero: {
    type: String,
    required: true,
    enum: [
      'Acción',
      'Aventura',
      'RPG',
      'Estrategia',
      'Deportes',
      'Simulación',
      'Puzzle',
      'Terror',
      'Indie',
      'Otro'
    ]
  },
  desarrollador: { type: String, trim: true },
  anioLanzamiento: { type: Number, min: 1970, max: new Date().getFullYear() + 2 },
  portada: { type: String, default: 'https://via.placeholder.com/300x400?text=Sin+Portada' },
  completado: { type: Boolean, default: false },
  puntuacion: { type: Number, min: 1, max: 5 },
  horasJugadas: { type: Number, default: 0, min: 0 },
  aspectosPositivos: { type: [String], default: [] },
  aspectosNegativos: { type: [String], default: [] },
  fechaAgregado: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
}, { timestamps: true });

gameSchema.pre('save', function(next) {
  this.fechaActualizacion = Date.now();
  next();
});

gameSchema.index({ titulo: 1 });
gameSchema.index({ plataforma: 1, genero: 1 });

module.exports = mongoose.model('Game', gameSchema);