window.onload=function(){
	var times=document.getElementsByName('gra-time');
	var selects=document.getElementById('city-select');
	var cityData={};//当前所选城市的数据
	  var charData={};//绘图所需要的处理后的数据
	var divwrap=document.getElementById("aqi-chart-wrap");
	
	  // 以下两个函数用于随机模拟生成测试数据
	function getDateStr(dat) {
		  var y = dat.getFullYear();
		  var m = dat.getMonth() + 1;
		  m = m < 10 ? '0' + m : m;
		  var d = dat.getDate();
		  d = d < 10 ? '0' + d : d;
		  return y + '-' + m + '-' + d;
	}

	function randomBuildData(seed) {
		  var returnData = {};
		  var dat = new Date("2016-01-01");
		  var datStr = '';
		  for (var i = 1; i < 92; i++) {
		    datStr = getDateStr(dat);
		    returnData[datStr] = Math.ceil(Math.random() * seed);
		    dat.setDate(dat.getDate() + 1);
		  }
		  return returnData;
	}
	//随机生成各大城市的空气质量数据
	var aqiSourceData = {
		  "北京": randomBuildData(500),
		  "上海": randomBuildData(300),
		  "广州": randomBuildData(200),
		  "深圳": randomBuildData(100),
		  "成都": randomBuildData(300),
		  "西安": randomBuildData(500),
		  "福州": randomBuildData(100),
		  "厦门": randomBuildData(100),
		  "沈阳": randomBuildData(500)
		};
	var pageState = {
		  nowSelectCity: "北京",
		  nowGraTime: "day"
	};
	//获取当前选中的城市，并根据选中的城市画出相应的统计图
	function selectCity(){
		cityData={};
		for (index in selects.options){
		    if(selects.options[index].selected){
		      pageState.nowSelectCity=selects.options[index].value;
		      cityData=aqiSourceData[pageState.nowSelectCity];
		      break;
		    }
		  }
		  initCharData();
		  map();
	}
	//为option变化绑定函数
	selects.onchange=selectCity;
	  //获取当前选中的时间粒度，并根据时间粒度来画出相应的统计图
	  function selectDivide(){
		   for (index in times){
		    if(times[index].checked){
		      pageState.nowGraTime=times[index].value;
		      break;
		    }
		  }
		  initCharData();
		  map();
	}
	//为radio绑定点击函数
	for (index in times){
		times[index].onclick=selectDivide;
	}	
	  //当所选粒度为“周”的时候执行下列函数
	  function initweekData(cityData){
	  	var Data={};
	  	var count1=1;
	  	var week1=1;
	  	var weeksum=0;
	  	for (name in cityData){  
	  	if(count1!=7){
	  		weeksum+=cityData[name];
	  		count1++;
	  	}
	  	else{
	  		Data["第"+week1+"周"]=parseInt((weeksum+cityData[name])/7);	
	  		weeksum=0;	
	  		count1=1;
	  		week1++;
	  	}
	  	}
	  	Data["第"+week1+"周"]=parseInt((weeksum)/count1);
	  	return Data;
	  	}
	   //当所选粒度为“月”的时候执行下列函数
	  function initmontData(cityData){
	  	var Data={};
	  	var count2=1;
	 	var month1=1;
	 	var monthsum=0;
	 	for(name in cityData){
	 		if(name=="2016-02-01"||name=="2016-03-01"||name=="2016-04-01"){
	 		Data[month1+"月"]=parseInt(monthsum/count2);
	 		monthsum=cityData[name];count2=0;
	 		month1++;	
	 		}
	 		else{
	 		monthsum+=cityData[name];
	 		count2++;	
	 		}
	 	}
	 	Data[month1+"月"]=parseInt(monthsum/count2);
	 	return Data;
	  }
	    //初始化charData
	  function initCharData(){
	  if(pageState.nowGraTime=="day")
	  	charData=cityData;
	  if(pageState.nowGraTime=="week")
	  	charData=initweekData(cityData);  
	 else if(pageState.nowGraTime=="month")
		charData=initmontData(cityData);
	}
	  //根据charData的值来实现图形的显示
	  function map(){	  
	  	divwrap.innerHTML="";
	  for( name in charData)
	  {
	  	var newp=document.createElement('p');
	  	if(pageState.nowGraTime=="day")
	  		newp.style.width="10px";
	  	else if(pageState.nowGraTime=="week")
	  		newp.style.width="80px";
	  	else if(pageState.nowGraTime=="month")
	  		newp.style.width="150px";
		newp.style.backgroundColor=getRandomColor();
	  	newp.style.height=charData[name]+"px";
	  	newp.title="日期"+"\:"+name+"\n"+"空气质量"+"\:"+charData[name];
	  	divwrap.appendChild(newp);
	  }
	}
	//生成随机颜色
function getRandomColor(){
  return '#'+Math.floor(Math.random()*16777215).toString(16); 
}
//进入页面先对页面进行默认的渲染
function init(){
	selectDivide();
	selectCity();
}
init();
}