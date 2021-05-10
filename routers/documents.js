const express = require('express');
const mysql = require('mysql');
const pw = require('../secret/passwords.js');



const router = express.Router();

const db = mysql.createConnection({
	host: 'localhost',
	user:'root',
	password: pw.databasePassword,
	database: 'mydb'
});

//글 작성
router.post('/',(req, res)=>{
	if(true){
		var doc = {
		title : req.body.title,
		desc : req.body.desc, //description
		writer: req.body.writer
	}
	var queryData = "INSERT INTO doc_info(title, writer) VALUES (?,?)";
	db.query(queryData, [doc.title, doc.writer],
		(err, rows)=>{
			if(err){
				console.log(err);
			}
			else{
				res.sendStatus(200);
			}
		
	})
	}
	else{
		res.sendStatus(404);
	}
	
	
})

//글 목록보기
router.get('/lists',(req,res)=>{
	var nickname = req.user;
	queryData = "SELECT title,docID FROM doc_info WHERE writer=?";
	db.query(queryData,[nickname],(err, rows)=>{
		if(err){
			console.log(err);
		}
		else{
			res.send(rows);
		}
	})
})


//글 삭제(나중에 회원이 맞을때만 글 삭제 요청하는거 구현)
router.delete('/deletedoc', (req,res)=>{
	var docId = req.body.docID;
	var queryData = "DELETE FROM doc_info WHERE docID=?";
	
	db.query(queryData, [docId], (err, rows)=>{
		if(err){
			console.log(err);
		}
		else{
			res.sendStatus(200);
		}
	})
	
})



module.exports = router;