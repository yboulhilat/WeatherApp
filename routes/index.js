var express = require('express');
var router = express.Router();
var request = require('request');
var villeModel = require('../models/villes');

////////////* Login *////////////
router.get('/', function(req, res, next) {
  req.session.user = null;
  res.render('login');
});
////////////* Inscription *////////////
router.get('/inscription', function (req, res, next) {
  res.render('signup');
});

////////////* Comptes avec les villes *////////////
router.get('/villes', function (req, res, next) {
  if (!req.session.user) {
    res.redirect('/villes');
  } else {
  villeModel.find(
    function (err, villes) {
      res.render('index', { cityList: villes, user : req.session.user });
    }
  );
  }
});



////////////* Ajouter une ville *////////////
router.post('/add-city', function (req, res, next) {
  request("http://api.openweathermap.org/data/2.5/weather?q=" + req.body.cityName + "&lang=fr&units=metric&APPID=d01a1dce408a9f8ce796d48b9e88897d", function (error, response, body) {
    body = JSON.parse(body);
    console.log(body);
    if (body.cod == '404' || body.cod == '400') {
      villeModel.find(
        function (err, villes) {
          console.log(villes);
          res.render('index', { cityList: villes, user: req.session.user });
        });
    } else {
      //////////////////////// Enregistre un document 1. préparation des données
      var newVille = new villeModel({
        name: req.body.cityName,
        desc: body.weather[0].description,
        img: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png",
        temp_min: Math.round(body.main.temp_min),
        temp_max: Math.round(body.main.temp_max),
        lat: body.coord.lat,
        lng: body.coord.lon,
      });

      //////////////////////// Ecrire la données
      newVille.save( function (error, ville) {

        villeModel.find(
        function (err, villes) {
              console.log(villes);
            res.render('index', { cityList: villes, user: req.session.user });
            }
          );
          
        }
      );
      // cityList.push(
      //   {
      //     name: req.body.cityName,
      //     desc: body.weather[0].description,
      //     img: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png",
      //     temp_min: Math.round(body.main.temp_min),
      //     temp_max: Math.round(body.main.temp_max),
      //     trash: "/images/cancel.svg",
      //   }
      // );
    }

  });
 
});

/* Supprimer une ville */
router.get('/delete-city', function (req, res, next) {
  
  villeModel.deleteOne({ _id: req.query.id },
      function (error) {
        villeModel.find(
          function (err, villes) {
            console.log(villes);
            res.render('index', { cityList: villes, user: req.session.user });
          }
        );
      }
    );

});

module.exports = router;
