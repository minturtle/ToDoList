var idForm = document.getElementById('formID');
var idMsg = document.getElementById('idMsg');
var pwForm = document.getElementById('formPW');
var pwMSg = document.getElementById('pwMsg');


idForm.addEventListener('blur', (event)=>{
	//id는 6글자 이상이어야 한다.
	if(idForm.value.length < 6){
		idMsg.innerHTML = '<span style = "color:red; font-size:50%;">아이디는 6글자 이상이어야 합니다.</span>'
	}
	//아이디가 6자 이상이면 서버에 아이디를 보내 중복되는지 확인한다.
	else{
		var ID = idForm.value;
		var url = 'https://todolist-jfslj.run.goorm.io/members/see?id='+ID;
		
		fetch(url).then((res)=>{
			return res.json();
		}).then((data) =>{
			if(data.id == ID){
				idMsg.innerHTML = '<span style = "color:red; font-size:50%;">이미 가입된 아이디입니다.</span>'
			}
			else{
				idMsg.innerHTML = '';
			}
			
		})
		
	}
})


pwForm.addEventListener('blur', (event)=>{
	if(pwForm.value.length < 8){
		pwMsg.innerHTML = '<span style = "color:red; font-size:50%;">비밀번호는 8글자 이상이어야 합니다.</span>';
	}
	else{
		pwMsg.innerHTML = "";
	}
})

