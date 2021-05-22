const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const passport = require('passport');


const portNum = process.env.PORT||80;

const pw = require('./pw');

const membersRouter = require('./routers/members');
const loginRouter = require('./routers/login');
const docuRouter = require('./routers/documents');

const app = express();
console.log(pw);
var sessionStore = new mysqlStore({
	host: pw.databaseHost,
	port: 3306,
	user: pw.databaseUser,
	password: pw.databasePassword,
	database: pw.sessionDatabaseName
})

app.use(session({
	secret : pw.sessionKey,
	store:sessionStore,
	resave: false,
	saveUninitialized: true	
}))
/*mysql://bddf1b9ad1fe87:b53d4776@us-cdbr-east-03.cleardb
.com/heroku_b7514d9e1c820d0?reconnect=true*/
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/members', membersRouter);
app.use('/login', loginRouter);
app.use('/posting', docuRouter);

app.get('/', (req,res)=>{
	if(req.user){
		res.sendFile(path.join(__dirname, './public/indexLogin.html'));
	}
	else{
		res.sendFile(path.join(__dirname, './public/indexNotLogin.html'));
	}
})

app.listen(portNum, ()=>{
	console.log('server is running.. at ' + portNum);
})