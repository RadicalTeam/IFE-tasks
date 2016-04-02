var aqiData={};
var city=document.getElementById('aqi-city-input');
var quality=document.getElementById('aqi-value-input');
var btn=document.getElementById('add-btn');
var table=document.getElementById('aqi-table');
String.prototype.trim=function(){
		return this.replace(/(^\s*)|(\s*$)/g,'');
	}
function addAqiData(){
	var newcity=city.value.trim();
	var newquality=quality.value.trim();
	if(!/^[\u4e00-\u9fa5_a-zA-Z]+$/.test(newcity)){
		alert("请输入正确的城市名称！");
		city.value="";
		city.focus();
		return false;
	}
	if(!/^[0-9]{1,}$/.test(newquality)){
		alert("请输入正确的空气指数！");
		quality.value="";
		quality.focus();
		return false;
	}
	aqiData[newcity]=newquality;
}
function renderAqilist(){
	if(!(isEmptyJson(aqiData))&&(city.value!="")&&(quality.value!=""))
	{
		var newtr=document.createElement('tr');
		var newtd1=document.createElement('td');
		var newtd2=document.createElement('td');
		var newtd3=document.createElement('td');
		var newbtn=document.createElement('button');
		newtd1.innerHTML=city.value;
		newtd2.innerHTML=quality.value;
		newbtn.innerHTML="删除";
		newbtn.className="btn1";
		addDelBtnHander(newbtn);
		newtd3.appendChild(newbtn);
		newtr.appendChild(newtd1);
		newtr.appendChild(newtd2);
		newtr.appendChild(newtd3);
		table.appendChild(newtr);
	}	
}
function isEmptyJson(json){
    	var obj;
    	for(obj in json){
    		return false;
    	}
    	return true;
    }
 function addBtnHander(){
    	addAqiData();
    	renderAqilist();
    }
function delBtnHander(){
	var deltr=this.parentNode.parentNode;
	var shuxing=deltr.firstChild.innerHTML;
	for(index in aqiData)
	{
		if(index===shuxing){
				delete aqiData[shuxing];
				break;}
	}

		table.removeChild(deltr);
}
function addDelBtnHander(newbtn){
	if(window,addEventListener)
		newbtn.addEventListener('click',delBtnHander,false);
	else
		newbtn.attachEvent('onclick',delBtnHander);
}
function init(){
	if(window,addEventListener)
		btn.addEventListener('click',function(){addBtnHander();},false);
	else
		btn.attachEvent('onclick',function(){addBtnHander();});		
}
init();