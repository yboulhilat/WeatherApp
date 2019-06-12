var express = require('express');
var router = express.Router();
var request = require('request');
var request = require('request');
var mongoose = require('mongoose');
////////////////////***** Connexion à la base de donnée Mango DB avec Mangoose
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
};
mongoose.connect('mongodb+srv://bouls:Bouls08128989@yousseflacapsule-hmk9t.mongodb.net/WeatherApp?retryWrites=true&w=majority',
  options,
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Mango DB Ok");
    }
  }
);

////////////////////***** Schema pour chaque ville
var villeSchema = mongoose.Schema ({
  name: String,
  desc: String,
  img: String,
  temp_min: Number,
  temp_max: Number,
});

////////////////////***** Modele pour pour lier le schéma au modèle *****////////////////////
var villeModel = mongoose.model('villes', villeSchema);

// var cityList = [
//   //////////// { name: "Paris", desc: "Couvert", img: "/images/cloud.svg", temp_min: "13", temp_max: "12", trash: "/images/cancel.svg"},
//   //////////// { name: "Marseille", desc: "Orageux", img: "/images/storm.svg", temp_min: "12", temp_max: "22", trash: "/images/cancel.svg" },
//   //////////// { name: "Lyon", desc: "Nuageaux", img: "/images/cloud.svg", temp_min: "22", temp_max: "14", trash: "/images/cancel.svg"},
//   //////////// { name: "Lille", desc: "Couvert", img: "/images/cloudy.svg", temp_min: "12", temp_max: "32", trash: "/images/cancel.svg" },
// ];

////////////////////***** Route récupration des villes de la base *****////////////////////
// router.get('/search', function(req, res, next) {
//   villeModel.find( function (err, villes) {
//       console.log(ville);
//     res.render('index', { cityList, ville : ville });
//   });
// });
////////////////////***** Route récupration des villes de la base avec le nom de la ville *****////////////////////
// router.get('/search', function (req, res, next) {
//   villeModel.find(
//     { name: req.body.cityName }
//      function (err, ville) {
//     
//     console.log(ville);
//     res.render('index', { cityList, ville : ville });
//   });
// });

////////////////////***** Rechercher une ville de la base avec le nom de la ville *****////////////////////
// router.get('/search', function (req, res, next) {
//   villeModel.fineOne (
//     { name: req.body.cityName }
//      function (err, ville) {
//      console.log(ville);
//     res.render('index', { cityList, ville : ville });
//   });
// });

////////////////////***** Rechercher une ville par ID *****////////////////////
// router.get('/search', function (req, res, next) {
//   villeModel.findById (
//    "5d00ba75d23e591aabe920d7"
//      function (err, ville) {
//      console.log(ville);
//     res.render('index', { cityList, ville : ville });
//   });
// });

////////////////////***** Modifier un enregistrement *****////////////////////
// router.get('/search', function (req, res, next) {
//   villeModel.updateOne (
//    name: req.body.cityName,
//    desc: body.weather[0].description,
//    img: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png",
//    temp_min: Math.round(body.main.temp_min),
//    temp_max: Math.round(body.main.temp_max),
//      function (err, raw) {
//      console.log(ville);
//     res.render('index', { cityList, ville : ville });
//   });
// });

////////////////////***** Modifier plusieurs enregistrements *****////////////////////
// router.get('/search', function (req, res, next) {
//   villeModel.updateMany (
//    name: req.body.cityName,
//    desc: body.weather[0].description,
//    img: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png",
//    temp_min: Math.round(body.main.temp_min),
//    temp_max: Math.round(body.main.temp_max),
//      function (err, raw) {
//      console.log(ville);
//     res.render('index', { cityList, ville : ville });
//   });
// });

////////////////////***** Supprimer un enregistrement *****////////////////////
// router.get('/search', function (req, res, next) {
//   villeModel.deleteOne (
//    name: req.body.cityName,
//    desc: body.weather[0].description,
//    img: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png",
//    temp_min: Math.round(body.main.temp_min),
//    temp_max: Math.round(body.main.temp_max),
//      function (err, raw) {
//      console.log(ville);
//     res.render('index', { cityList, ville : ville });
//   });
// });

////////////////////***** Supprimer  plusieurs enregistrements *****////////////////////
// router.get('/search', function (req, res, next) {
//   villeModel.deleteMany (
//    name: req.body.cityName,
//    desc: body.weather[0].description,
//    img: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png",
//    temp_min: Math.round(body.main.temp_min),
//    temp_max: Math.round(body.main.temp_max),
//      function (err, raw) {
//      console.log(ville);
//     res.render('index', { cityList, ville : ville });
//   });
// });

////////////* Accueil *////////////
router.get('/', function(req, res, next) {
  villeModel.find(
    function (err, villes) {
      console.log(villes);
      res.render('index', { cityList: villes });
    }
  );
  
});

////////////* Ajouter une ville *////////////
router.post('/add-city', function (req, res, next) {
  request("http://api.openweathermap.org/data/2.5/weather?q=" + req.body.cityName + "&lang=fr&units=metric&APPID=d01a1dce408a9f8ce796d48b9e88897d", function (error, response, body) {
    body = JSON.parse(body);

    if (body.cod == '404' || body.cod == '400') {
      res.render('index', { cityList : villes });
    } else {

      //////////////////////// Enregistre un document 1. préparation des données
      var newVille = new villeModel({
        name: req.body.cityName,
        desc: body.weather[0].description,
        img: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png",
        temp_min: Math.round(body.main.temp_min),
        temp_max: Math.round(body.main.temp_max),
      });

      //////////////////////// Ecrire la données
      newVille.save( function (error, ville) {

        villeModel.find(
        function (err, villes) {
              console.log(villes);
              res.render('index', { cityList: villes });
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
            res.render('index', { cityList: villes });
          }
        );
      }
    );

});

module.exports = router;
