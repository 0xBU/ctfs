function main_header(){
	$.get(
	"header.php",{ NULL:'' },function (data){
		$('#header').html(data);
	$.get(
	"main_challenge.php",{ NULL:'' },function (data){
		$('#bulletin').html(data);
	$.get(
	"main_notice.php",{ NULL:'' },function (data){
		$('#notice').html(data);
	$.get(
	"main_myrank.php",{ NULL:'' },function (data){
		$('#mylank').html(data);
	$.get(
	"main_rank.php",{ NULL:'' },function (data){
		$('#toplank').html(data);
	});});});});});
}


///////////////////////////////////main
function main(){
	if(window.location.hash){
		var hash = window.location.hash.substring(1);
		menu(hash);
	}else{
		$.get(
		"main.php",{ NULL:'' },function (data){
			$('#main').html(data);
			window.location.hash = "Main"
		}
		);
	}

main_header();




}


function menu(e){
	switch(e){
	case "YUT":
		go="yut.php";
		break;
	case "Notice":
		go="notice.php";
		break;
	case "Login":
		go="login.php";
		break;
	case "Logout":
		go="logout.php";
		break;
	case "Rules":
		go="rules.php";
		break;
	case "scene":
		go="scene.php";
		break;
	case "HallOfFame":
		go="halloffame.php";
		break;
	default:
		go="main.php";
		main_header();

		break;
	}

	$.get(
		go,{ NULL:'' },function (data){
			$('#main').html(data);
			window.location.hash = e;
		}
	);
}


function problem(category,num){
	$.get(
	"problem.php?category="+category+"&num="+num,{ NULL:'' },function (data){
		$('#toplank').html(data);
	}
	);
}


function login(){
	$.post(
		"login_check.php",{
				id:document.getElementById('id').value,
				password:document.getElementById('password').value
			 },
		function (data){
			$('#login').html(data);
		}
	);
}


function apply_button(){
	$.get(
	"apply.php",{	NULL:''
			 },
		function (data){
		$('#main').html(data);
		}
	);
}



function apply(){
	var realname = new Array();
	var n_o_m = $("#select_number_of_member option:selected").val();
	for(i=0;i<n_o_m;i++){
		realname[i] = $("#realname"+(i+1)).val();
	}
	var realname = realname.join(",");

	$.post(
	"apply_submit.php",{
				id:$("#id").val(),
				password:$('#password').val(),
				password2:$('#password2').val(),
				teamname:$('#teamname').val(),
				email:$('#email').val(),
				phone:$('#phone').val(),
				country:$('#country').val(),
				"realname":realname
			 },
		function (data){
		$('#apply').html(data);
		}
	);
}


function answer_button(){
	$.post(
	"auth_check.php",{
			category:document.getElementById('category').value,
			number:document.getElementById('number').value,
			answer:document.getElementById('answer').value
			 },
		function (data){
			$('#answer_request').html(data);
			setTimeout("clear_req()",500);
		}
	);
}

function clear_req(){
	$('#answer_request').html("");
}

function yut_kor(){
	$.get(
	"yut_kor.php",{ NULL:'' },function (data){
		$('#yutpage').html(data);
	}
	);
}

function yut_eng(){
	$.get(
	"yut_eng.php",{ NULL:'' },function (data){
		$('#yutpage').html(data);
	}
	);
}


function rule_kor(){
	$.get(
	"rule_kor.php",{ NULL:'' },function (data){
		$('#rulepage').html(data);
	}
	);
}

function rule_eng(){
	$.get(
	"rule_eng.php",{ NULL:'' },function (data){
		$('#rulepage').html(data);
	}
	);
}

function main_img(){
	if(document.getElementById('main_img')==null){
		//alert('null');
	}
	else
	{
		$(function() {
			var rollingDiv = $("#main_img");
			rollingDiv.rolling("right", 686, 400);
			rollingDiv.addRollingItem("<img src='content/images/main1.jpg'/>");
			rollingDiv.addRollingItem("<img src='content/images/main2.jpg'/>");
			rollingDiv.startRolling(50, 9000, 13);
			});
	}
}

function countryimg(country){
	country = encodeURIComponent(country);
	$('#apply_countryimg').html('<img src=./content/images/country/flags/48/'+ country +'.png>');
}

function select_number_of_member_change(e){
	var n_o_m = $(e).val();
//	var n_o_data = "";
//	for(i=0;i<n_o_m;i++){
//		n_o_data += "<tr><td><font class=\"page_subtitle\">Member "+(i+1)+" RealName</font></td><td><input type=text id=realname"+(i+1)+" style=\"width:225px;\"></td>";
//	}
//	$('#table_member_info').html(n_o_data);
	for(i=0;i<10;i++){
		if(n_o_m > i){
			$("#tr_realname"+(i+1)).show();
		}else{
			$("#tr_realname"+(i+1)).hide();
		}
	}

};
