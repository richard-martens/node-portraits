'use strict';

const errorhandler = function(error) {
        console.log('ERROR:', error); // print error;
        res.status(500).send(error.message);
      }

exports.index = function (req, res, next) {
  res.render('order/index');
};

exports.imageCreate = function (req, res, next) {
  const db = require('../db').instance;

  db.one('INSERT INTO images(name, mimetype, size, file) VALUES($1, $2, $3, $4) RETURNING id', 
          [req.file.originalname, req.file.mimetype, req.file.size, req.file.buffer])
    .then(data => {  
      res.json({
        id: data.id
      });
    })
    .catch(errorhandler);

}

exports.imageDelete = function(req, res, next) {
  const db = require('../db').instance;

  db.none("DELETE FROM images WHERE id = $1", [ req.id ])
    .then(data => res.status(201).send( data.rowCount + ' images deleted'))
    .catch(errorhandler);
}

exports.imageRead = function(req, res, next) {
  const db = require('../db').instance;

  db.one("SELECT * FROM images WHERE id = $1", [req.params.id])
    .then(data => {
      res.status(200)
        .setHeader('Content-Length', data.file.length)
        .setHeader('Content-Type', data.mimetype)
        .write(data.file, 'binary')
        .end();
    }).catch(errorhandler)
}