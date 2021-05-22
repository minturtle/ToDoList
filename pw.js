
/*mysql://bddf1b9ad1fe87:b53d4776@us-cdbr-east-03.cleardb
.com/heroku_b7514d9e1c820d0?reconnect=true*/


var obj = {
	databasePassword : null,
	sessionKey : null,
	databaseHost:null,
	databaseName:null,
	databaseUser:null
};

if(process.env.NODE_ENV === 'production'){
	obj.databasePassword = process.env.DATABASE_PASSWORD;
	obj.sessionKey = process.env.SESSION_KEY;
	obj.databaseHost = process.env.DATABASE_HOST;
	obj.sessionDatabaseName = process.env.DATABASE_NAME;
	obj.myDatabaseName = process.env.DATABASE_NAME;
	obj.databaseUser = process.env.DATABASE_USER;
}
else{
	const pwObj = require('./config/dev.js');
	obj.databasePassword = pwObj.databasePassword;
	obj.sessionKey = pwObj.sessionKey;
	obj.databaseHost = "localhost";
	obj.sessionDatabaseName = 'session_store';
	obj.myDatabaseName = "mydb";
	obj.databaseUser = 'root';
}

module.exports = obj;
