import mongoose from 'mongoose';

const InstrukcjaSchema = new mongoose.Schema({
  krok_nr: { type: Number, required: true },
  nazwa_kroku: { type: String, required: true },
  opis: { type: String, required: true },
  czas_minuty: { type: Number},
  temperatura_stopnie_c: { type: mongoose.Schema.Types.Mixed} 
}, { _id: false });

const SkladnikSchema = new mongoose.Schema({
  nazwa: { type: String, required: true },
  ilosc: { type: String, required: true },
  uwagi: { type: String, default: '' }
}, { _id: false });

const WartoscOdzywczaSchema = new mongoose.Schema({
  kalorie_kcal: { type: Number, required: true },
  bialko_g: { type: Number, required: true },
  weglowodany_g: { type: Number, required: true },
  tluszcze_g: { type: Number, required: true }
}, { _id: false });

const RecipeSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tytul: { type: String, required: true, trim: true },
  opis: { type: String, required: true },
  porcje: { type: Number, required: true, min: 1 },
  czas_przygotowania_minuty: { type: Number, required: true },
  czas_calkowity_minuty: { type: Number, required: true },
  trudnosc: { 
    type: String, 
    enum: ['Łatwy', 'Średni', 'Trudny'], 
    required: true 
  },
  skladniki: [SkladnikSchema],
  instrukcje: [InstrukcjaSchema],
  uwagi_dietetyczne: { type: String, required: true },

  
  wartosci_odzywcze_na_porcje: { 
    type: WartoscOdzywczaSchema, 
    required: true 
  }

}, {
  timestamps: true
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

export default Recipe;
