var button = document.getElementById('button');
var input = document.getElementById('input');
var list = document.getElementById('list');

button.addEventListener('click', clickButton);


//database에 글을 저장하고 doc을 받아옴
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
function clickButton() {
	postNewToDo(input.value).then((json)=>{
		if(json.docID){
			var temp = document.createElement('li');
			temp.setAttribute("class", "list-group-item");
			temp.setAttribute("id", "li"+json.docID);
			temp.innerHTML = input.value;
			temp.innerHTML += "<button style='float: right;' class='btn btn-outline-secondary' type='button' onclick='remove("+json.docID+")'>삭제</button>";
			list.appendChild(temp);
			
		}
	})
  
}

function remove(cnt) {
  //window.alert(cnt);
  var li = document.getElementById('li'+cnt);
  list.removeChild(li);
}