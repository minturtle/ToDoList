var button = document.getElementById('button');
var input = document.getElementById('input');
var list = document.getElementById('list');

button.addEventListener('click', clickButton);

window.onload = function(){
	//html 로드가 완료되면 siteInit을 통해 유저의 Todo를 불러오고, 프론트에 추가한다.
	siteInit().then((rows)=>{
		for(var i = 0; i < rows.length; i++){
			addNewToDo(rows[i].docID, rows[i].title);
		}
	})
}


//사이트가 처음 실행될때 데이터를 불러오는 함수
var siteInit = async function(){
	var result = await fetch('/lists')
  .then(function(response) {
    return response.json();
  })
	
	return result;
}
//TODO를 삭제하는 요청을 보내는함수
var delToDo = async function(docID){
	var url = '/posting/deletedoc';
	var result = await fetch(url, {
		method : "DELETE",
		headers: {
            'Content-Type': 'application/json'
        },
		body : JSON.stringify({docID : docID})
	})
	
	return result;
}

var addNewToDo = function(docID, value){
	var temp = document.createElement('li');
	temp.setAttribute('class', 'list-group-item');
	temp.setAttribute('id', 'li'+docID);
	temp.innerHTML = value;
	temp.innerHTML += "<button style='float: right;' class='btn btn-outline-secondary' type='button' onclick='remove("+docID+")'><i class='fas fa-trash'></i></button>";
	list.appendChild(temp);
}

var addError = function(msg){
	var errDiv = document.getElementById('error');
	errDiv.innerHTML = msg;
	errDiv.style.color = 'red';
	errDiv.style.fontSize = '120%';
}
var delError = function(){
	var errDiv = document.getElementById('error');
	errDiv.innerHTML = '';
}

//database에 글을 저장하고 docID를 받아옴
var postNewToDo = async function(title){
	var result = await fetch('https://todolist-jfslj.run.goorm.io/posting',{
		method: 'POST',
		headers : {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({title:title})
	})
  .then(res=>{
    return res.json();
  })
  
	return result;
}
//데이터를 입력받으면 일단 데이터베이스로 보낸후 프론트에 추가
function clickButton() {
	postNewToDo(input.value).then((json)=>{
		if(json.docID){
			delError();
			addNewToDo(json.docID, input.value);
		}
		else{
			addError(json.message);
		}
	})
  
}

function remove(docID) {
	delToDo(docID).then((res)=>{
		var li = document.getElementById('li'+docID);
		list.removeChild(li);	
	})
}