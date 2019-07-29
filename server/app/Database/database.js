let mongoose = require('mongoose');
const mongoDB =
  'mongodb+srv://Valentin:nayla@cluster0-vnytu.mongodb.net/music-blog-dev?retryWrites=true';

class Database {
  constructor() {
    // this.connect();
  }

  connect() {
    mongoose.set('useCreateIndex', true);
    mongoose
      .connect(mongoDB, {
        useNewUrlParser: true
      })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error', err);
      });

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
    db.once('open', function() {
      console.log('Connexion à la base OK');
    });
  }
}
module.exports = new Database();
