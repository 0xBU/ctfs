function o0OO0ooooO0(OO0O00000O0){alert(OO0O00000O0);}function o0ooO000o0O(OOO0OoOOooo){confirm(OOO0OoOOooo);}var server_status = 'open';
var host = document.URL.substr(document.URL.indexOf("//")+2);
host = host.substr(0,host.indexOf("/"))
refresh_tm = 500;
loading_bar = 0;

var logout = function(){
    location.href='game.php?m=logout';
}

var menu = function(val){
    if(val=="shop")
    {
        top_menu.innerHTML="<div style='border:1pt solid black;padding:10pt;'>SHOP<br><table border=0 style=width:100pt;border:0pt;><tr><td><img src=images/mon1.gif></td><td>hi</td></tr></table><table border=1 cellpadding=10 align=center style=border:0pt;width:300pt;><tr><td>\\ 80</td><td>Health recovery</td><td><input type=button value='Buy' onclick=value0f('b=1')></td></tr></table></div>";
        top_menu.innerHTML+="<div style='border:1pt solid black;background:silver;text-align:center'><input type=button style='width:100%' value='Close' onclick=top_menu.innerHTML=''></div><br>";
    }

    if(val=="rank")
    {
        $.post("?mode=rank",function(result){top_menu.innerHTML="<div style='border:1pt solid black;padding:10pt;'><center>RANK</center><br>"+result+"</table></div><div style='border:1pt solid black;background:silver;text-align:center'><input type=button style='width:100%' value='Close' onclick=top_menu.innerHTML=''></div><br>";});
    }

    if(val=="skill")
    {
        $.post("?mode=skill",function(result){top_menu.innerHTML="<div style='border:1pt solid black;padding:10pt;'><center>SKILL</center><br>"+result+"</table></div><div style='border:1pt solid black;background:silver;text-align:center'><input type=button style='width:100%' value='Close' onclick=top_menu.innerHTML=''></div><br>";});
    }


    if(val=="del")
    {
        if(o0ooO000o0O('really?')){
            location.href='?mode=remove';
        }
    }

}

var refresh_status = function(){
    $.post("?ping=1",null);
    value0f("s");
}

var map_info = function(val){
    var index = 0;
    for(var i=0;i<=100;i++){
        if(block[i]==val) {index=i+1; break; }
    }
    index++;
    if(val.innerHTML!="" && loading_bar==0){
            loading_bar = 1;
            value0f('i='+index);
    }
}

var status_draw = function(val){
    val = val.split(',');
    if(val[4]<=0) location.href='game.php';
    result="<div style='text-align:center;float:left;width:100pt;height:50pt;border:1pt solid black;'>"+'&lt;'+val[0]+'&gt;<br> Lv. '+val[1]+'<br> Gold. '+val[2]+"</div><div style='float:left;width:100pt;border:1pt solid black;'><div style='border-bottom:1pt solid black;font-size:10pt;text-align:center'>HP</div><div style='text-align:center;font-size:10pt;background:red;width:"+val[3]+";height:10pt;'>"+val[4]+"</div></div><div style='float:left;width:100pt;border:1pt solid black;'><div style='border-bottom:1pt solid black;font-size:10pt;text-align:center'>Exp</div><div style='text-align:center;font-size:10pt;background:yellow;width:"+val[5]+";height:10pt;'>"+val[6]+"</div></div></div><div style='float:left;width:100pt;border:1pt solid black;'><div style='border-bottom:1pt solid black;font-size:10pt;text-align:center'>Action point</div><div style='text-align:center;font-size:10pt;background:silver;width:"+val[7]+";height:10pt;'>"+val[8]+"</div></div></div><br>"
    return result;
}

var learn = function(val){
    $.post('?mode=skill&no='+val,null);
    menu('skill');
}

var map_draw = function(val){
    var var2 = "";
    var mon_name = "";
    var mon_lv = "";
    var mon_hp = "";
    var mon_hp_per = 0;
    var map_ = "<table border=0 align=center cellpadding=10 cellspacing=0><tr>";

    for(var i=1;i<100;i++){
        j=i-1;
        val2 = val[i].split(":");
        mon_name = val2[0];
        mon_lv = val2[1];
        mon_hp = val2[2];
        mon_mhp = val2[3];
        mon_hp_per = mon_hp / mon_mhp * 100;

        if(mon_name){
            if(mon_name.indexOf("mon")!=-1) map_+="<td id=block onclick=map_info(this)><a style=font-size:5pt;>Lv "+mon_lv+"</a><br><img src='images/"+mon_name+".gif' width=30 height=30><br><div style='border:1pt solid black';width:50pt><div style=height:10pt;width:"+mon_hp_per+"%;background:red;font-size:5pt;>"+mon_hp+"</div></div></td>";
            else map_+="<td id=block onclick=map_info(this)><img src='images/star.gif' width=30 height=30></td>";
        }
        else map_+="<td id=block onclick=map_info(this)></td>";
        if(i%10==0) map_+="</tr><tr>";
    }
    return map_;
}

pageZOffset = new WebSocket("ws://"+host+":65500");

pageZOffset.onerror = function(){
    world_map.innerHTML='<br><br><h1>server error</h1>';
    value0f = function(val){}
    server_status='close';
}

pageZOffset.onopen = function(){
    server_status='open';
}

pageZOffset.onclose = function(){
    world_map.innerHTML='<center><br><br><h2><img src=images/mon1.gif><br>connection closed by remote host<br><br><a href=game.php>Refresh</a></h2></center>';
    value0f = function(val){}
    server_status='close';
}

pageZOffset.onmessage = function(msg){
    data = base64.decode(msg.data);
    flag = data.substr(0,1);
    if(flag == "@"){
        if(data.split("\n")[0]=="@o"){o0OO0ooooO0('ok');}
        if(data.split("\n")[0]=="@s"){  player_status.innerHTML=status_draw(data.split("\n")[1]);}
        if(data.split("\n")[0]=="@l"){world_map.innerHTML=data.split("\n")[1];}
    }
    if(msg_save.innerHTML!=data && flag!="@"){
        data_ = data.split("\n");
        world_map.innerHTML=map_draw(data_);
    }
    msg_save=data;
}

var value0f = function(val){
    pageZOffset.send(val);
}

var map_refresh = function(){
    if(refresh_tm>0){
        refresh_tm--;
        per = refresh_tm/500 * 100;
        per = 100-per;
        if(loading_bar==1) loading.innerHTML="<br><div style='border:1pt solid black;width:100%;'><div style='background:black;height:5pt;width:"+per+"%;'></div></div>";
    }
    else{
    value0f('m');
    loading_bar = 0;
    loading.innerHTML='';
    refresh_tm=500;
    }
}

if(server_status=='open'){
    setInterval("map_refresh();",1);
    setInterval("refresh_status();",400);
}
