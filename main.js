const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const passport = require('passport');


const portNum = 3000;

const pw = require('./secret/passwords');

const membersRouter = require('./routers/members');
const loginRouter = require('./routers/login');
const docuRouter = require('./routers/documents');

const app = express();

var sessionStore = new mysqlStore({
	host:'localhost',
	port:3306,
	user:'root',
	password:  pw.databasePassword,
	database: 'session_store'
})

app.use(session({
	secret : pw.sessionKey,
	store:sessionStore,
	resave: false,
	saveUninitialized: true	
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/members', membersRouter);
app.use('/login', loginRouter);
app.use('/posting', docuRouter);

app.get('/', (req,res)=>{
	res.send('main_page');
})

app.listen(portNum, ()=>{
	console.log('server is running..');
})