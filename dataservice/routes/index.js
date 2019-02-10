var express = require('express');
var mysql = require('mysql');
var router = express.Router();


var connection = mysql.createConnection({
    host     : 'db',
    port     : 3306,
    user     : 'root',
    password : 'password',
    database : 'FIFA'
});

connection.connect();

/* GET get_player_info. */
router.get('/get_player_info/:player_name', function(req, res, next) {
  console.log(req.params.player_name);
  connection.query('SELECT * FROM `PERSONAL` INNER JOIN `ATTRIBUTE` on PERSONAL.id = ATTRIBUTE.id WHERE `name` like ?',[req.params.player_name] ,function (error, results, fields) {
      if (error) {
          res.status(400).send('Error in database operation');
      }
      else {
          console.log('The result is: ', results[0]);
          res.send(results);
      }
  });
});


/* GET get_club_player_list */
router.get('/get_club_player_list/:club_name', function(req, res, next) {
    console.log(req.params.club_name);
    connection.query('SELECT * FROM `PERSONAL` INNER JOIN `ATTRIBUTE` on PERSONAL.id = ATTRIBUTE.id WHERE `club` like ?',[req.params.club_name] ,function (error, results, fields) {
        if (error) {
            res.status(400).send('Error in database operation');
        }
        else {
            console.log('The result is: ', results[0]);
            res.send(results);
        }
    });
});

module.exports = router;
