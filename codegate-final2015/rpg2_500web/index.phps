 <?php
session_start();
include "conn.php";
if($_SESSION['id']) exit("<meta http-equiv=refresh content=0;url=game.php>");
?>
<html>
<head>
<title>RPG 2</title>
<style>
body { background:black; text-align:center;margin:0 auto;padding-top:20%; color:green; font-size:10pt; }
input[type=text],input[type=password] { width:100pt;background:black;border:0;border-bottom:1pt solid white;margin:5pt;color:white;}
input[type=text]:hover,input[type=password]:hover{border:1pt solid white;}
input[type=submit] { background:silver; width:100pt; }
</style>
</head>
<body>
<?php
if(isset($_POST['cmd'])){
    include "auth.php";
    if(isset($_POST['id']) && isset($_POST['pw'])){
        $usr_id=addslashes($_POST['id']);
        $usr_pw=md5($_POST['pw']);
        if(strlen($usr_id)==0) exit("<meta http-equiv=refresh content=0;>");

        if(eregi("[^0-9a-z]",$usr_id)) exit("access denied");

        if($_POST['cmd']=="Login"){
            sleep(1);
            $q=@mysql_fetch_array(mysql_query("select id from user where id='".$usr_id."' and pw='".$usr_pw."'"));
            if($q['id']){
                $_SESSION['id']=$q['id'];
                exit("<meta http-equiv=refresh content=0;url=game.php>");
            }
        }

        if($_POST['cmd']=="Register"){
            if(eregi("admin",$usr_id)) exit("access denied");
            $q=@mysql_fetch_array(mysql_query("select id,pw from user where id='".$usr_id."' or ip='".$_SERVER['REMOTE_ADDR']."'"));
            if(!$q['id']){
                mysql_query("insert into user(id,ip,lv,exp,hp,att,mhp,gold,turn,tm,pw) values('".$usr_id."','".$_SERVER['REMOTE_ADDR']."',1,0,10,2,10,100,10,0,'".$usr_pw."')");
                echo("Done");
                exit();
            }
            else{ echo("$_SERVER[REMOTE_ADDR]<br><br>userid : $q[id]<br><br>password : $q[pw]"); exit(); }
        }
    }
}
?>
<img id=logo onclick=this.width++ src=images/star.gif>
<form method=post action=index.php>
<input type=text name=id><input type=password name=pw><br>
<input type=submit name=cmd value='Login'>
<input type=submit name=cmd value='Register'>
</form>
<script>
setInterval("logo.src='images/mon'+(1+Math.floor(Math.random()*6))+'.gif'",500);
</script>
</body>
<!-- index.phps  auth.phps -->
</html>
