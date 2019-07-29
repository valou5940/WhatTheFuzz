const chronicModel = require('../Schemas/chronicSchema');
const Chronic = require('../Models/chronic');
const moment = require('moment');

class chronicsController {
  // get full chronics list
  fetchChronicsList(range) {
    const numericRange = parseInt(range);
    return new Promise((resolve, reject) => {
      chronicModel.find(
        null,
        null,
        { sort: { date: '-1' }, skip: numericRange - 10, limit: numericRange },
        (err, chronics) => {
          console.log(chronics);
          if (err) {
            reject(err);
            // } else {
            //   chronics.splice().forEach(chronic => {
            //     if (chronic.date !== undefined) {
            //       let formattedDate = moment(chronic.date).format('DD/MM/YYYY');
            //       console.log(formattedDate);
            //       Object.assign({}, chronic, { date: formattedDate });
            //     }
            //   });
            //   console.log(chronics);
          } else {
            resolve(chronics);
          }
        }
      );
    });
  }

  // get chronic by its Id
  fetchChronicById(chronicId) {
    return new Promise((resolve, reject) => {
      chronicModel.findById(chronicId, (err, chronic) => {
        console.log(err, chronic);
        if (err) {
          reject(err);
        } else {
          resolve(chronic);
        }
      });
    });
  }

  // get chronic given their names
  fetchChronicsByName(chronicName) {
    return new Promise((resolve, reject) => {
      chronicModel.find({ name: chronicName }, (err, chronics) => {
        if (err) {
          reject(err);
        } else {
          resolve(chronics);
        }
      });
    });
  }

  // post a new chronic
  postNewChronic(chronic) {
    // let  = new Chronic();
    // dummyChronic.name = 'dummytitle';
    // dummyChronic.date = Date.now();
    // dummyChronic.content = 'LOREM IPSUM TARACE';
    // dummyChronic.bandName = 'TestBand';
    // dummyChronic.discName = 'test name';
    // dummyChronic.rating = '9/10';

    const newChronic = new chronicModel({
      name: chronic.name,
      date: chronic.date,
      content: chronic.content,
      bandName: chronic.bandName,
      discName: chronic.discName,
      rating: chronic.rating
    });

    return new Promise((resolve, reject) => {
      newChronic.save((err, chronic) => {
        if (err) {
          reject(err);
        } else {
          console.log(chronic);
          resolve(chronic);
        }
      });
    });
  }
}

module.exports = new chronicsController();
