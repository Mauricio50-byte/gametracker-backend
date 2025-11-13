const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  titulo: { type: String, required: true, trim: true, maxlength: 120 },
  contenido: { type: String, required: true, trim: true },
  puntuacion: { type: Number, required: true, min: 1, max: 5 },
  aspectosPositivos: { type: [String], default: [] },
  aspectosNegativos: { type: [String], default: [] },
  recomendado: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
}, { timestamps: true });

reviewSchema.pre('save', function(next) {
  this.fechaActualizacion = Date.now();
  next();
});

reviewSchema.index({ juegoId: 1 });

module.exports = mongoose.model('Review', reviewSchema);