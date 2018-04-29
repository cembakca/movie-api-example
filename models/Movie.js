const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MovieSchema = new Schema ({
  director_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: [true, '`{PATH}` alanı zorunludur.'], 
    // `{PATH}` BULUNDUĞU ALANI BELİRTİR. BURADA title içinde olduğumuz için path title olarak dönecek ekranda.
    maxlength:[40, '`{PATH}` alanına `{VALUE}` girildi, en fazla `{MAXLENGTH}` karakter içerebilir.'],
    // `{VALUE}` GİRİLEN DEĞER. Post işleminde buraya ne girildiyse onu gösterir.
    // `{MAXLENGTH}` OLMASI GEREKEN DEĞER. Burada 17 verdiğimiz için ekrana 17 yazacak.
    minlength:[2, '`{PATH}` alanına {VALUE}` girildi, en az `{MINLENGTH}` karakter içermelidir.']
  },
  category : String,
  country: String,
  year: Number,
  imdb_score: {
    type: Number,
    max: [10, 'IMDB puanı maksimum 10 derece olabilir.'],
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('movie', MovieSchema);