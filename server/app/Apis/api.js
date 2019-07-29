// const express = require('express');
// const app = express();
const ChronicsControllers = require('../Controllers/chronicsController');

class Api {
  constructor() {}

  route(app) {
    // get full list of chronics
    app.get('/api/chronics', (req, res) => {
      const range = req.query.range;
      console.log(range);
      ChronicsControllers.fetchChronicsList(range)
        .then(chronics => {
          res.json({ chronics: chronics });
        })
        .catch(err => {
          res.send(err);
        });
    });

    // get chronic details
    app.get('/api/chronics/:id', (req, res) => {
      ChronicsControllers.fetchChronicsById(req.params.id)
        .then(chronic => {
          res.send(chronic);
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        });
    });

    // get chronics by name
    app.get('/api/chronics', (req, res) => {
      const name = req.query.name;
      ChronicsControllers.fetchChronicsByName(name)
        .then(chronics => {
          res.send(chronics);
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        });
    });

    // save a new chronic into db
    app.post('/api/chronics', (req, res) => {
      const chronic = req.body;
      ChronicsControllers.postNewChronic(chronic)
        .then(chronic => {
          res.send(chronic);
        })
        .catch(err => {
          res.send(err);
        });
    });
  }
}

module.exports = new Api();
