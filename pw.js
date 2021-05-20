const pwObj = require('./secret/password.js');

var dbpw = null;
var sessky = null;

if(process.env.NODE_ENV === 'production'){
	dbpw = process.env.DATABASE_PASSWORD;
	sessky = process.env.SESSION_KEY;
}
else{
	dbpw = pwObj.databasePassword;
	sessky = pwObj.sessionKey;
}

module.exports = {
	databasePassword: dbpw,
	sessionKey : sessky
}