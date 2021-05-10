const express = require('express');
const mysql = require('mysql');
const pw = require('../secret/passwords.js');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

const db = mysql.createConnection({
	host: 'localhost',
	user:'root',
	password: pw.databasePassword,
	database: 'mydb'
});

passport.serializeUser(function(user, done) {
  done(null, user.nickname);
});
passport.deserializeUser(function(nickname, done) {
  done(null, nickname);
});


//local strategy
passport.use('local-join', new LocalStrategy({usernameField: 'id', passwordField: 'pw'},
  function(username, pw, done) {
    var queryData = "SELECT userID, password, nickname FROM user_info WHERE userId = ?";
	
	db.query(queryData, [username], function(err, rows){
		if(err){
			console.log(err);
		}
		if(rows.length){
			if(rows[0].password ==pw){
				var user = {
					id: rows[0].userID,
					pw : rows[0].password,
					nickname : rows[0].nickname
				}
				return done(null, user);
			}
			else{
				return done(null, false, {message:"비밀번호가 틀립니다."});
			}
		}
		else{
			return done(null, false,{message:"아이디가 틀립니다."});
		}
		
	})
	
    }));





//login form
router.get('/', (req,res)=>{
	res.send('<<login form>>');
})


//local-login 시도
router.post('/locallogin', passport.authenticate('local-join', 
					{ successRedirect: '/',
					failureRedirect: '/login',
					falilureFlash: true}
));

//logout
router.post('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});










module.exports = router;