function $(id){
		return document.getElementById(id);
	}
	var parent=$('parent');
	var btn4=$('btn4');
	var guangSearch=$('guangSearch');
	var addText=$('addText');
	var addElement=$('addElement');
	var deleteElement=$('deleteElement');
	var stack=new Array();
//为相应的按钮添加点击事件
	guangSearch.onclick=function(){
		stack=[];
		searchElement(guangOrder,parent);
	}
	btn4.onclick=function(){
		stack=[];
		guangOrder(parent);
		bianli();
	}
	deleteElement.onclick=deleteE;
	addElement.onclick=addE;
	//为每个节点添加点击事件
	function addClick(){
		stack=[];
		guangOrder(parent);
		for(i in stack){
			stack[i].addEventListener('click',selected,false);
		}
	}
	addClick();//初始化为每个元素添加选择事件
	var handleElement=null;
	function selected(){
		if(handleElement)
		handleElement.style.backgroundColor="rgb(255,255,255)";
		event.stopPropagation();//阻止事件冒泡
		this.style.backgroundColor="rgb(12,123,23)";
		handleElement=this;
			}
	function deleteE(){
		parentE=handleElement.parentNode;
		parentE.removeChild(handleElement);
	}

	function addE(){
		if(handleElement){
			var newdiv=document.createElement('div');
			newdiv.innerText=addText.value;
			handleElement.appendChild(newdiv);
			addClick();
		
			
		}
		else
			alert("请在上图中点击将要添加节点的位置")
	}

//遍历可视化
	function bianli(){
		var i=0;
		 var timer=setInterval(function(){
		 	if(i==stack.length){
				clearInterval(timer);
				stack[i-1].style.backgroundColor="rgb(255,255,255)";	
				return;
			}
		 	if(i>0)
		 		stack[i-1].style.backgroundColor="rgb(255,255,255)";	
		 	      	stack[i].style.backgroundColor="rgb(255,0,0)";
			i++;
		},1000);
	}
	
	//广度遍历
	function guangOrder(node){
		var que=[node];
		while(que.length!=0){
			node=que.shift();
			stack.push(node);
			var nodes=getChilds(node);
		for(index in nodes){
		if(nodes[index])
			que.push(nodes[index]);
		}
		}
	}
	//获取子元素，使获取的都为元素节点
	function getChilds(obj){
		var childs=obj.childNodes;
		var realChilds=new Array();
		for (index in childs){
			if(childs[index].nodeType==1&&childs[index].nodeName=='DIV')
				realChilds.push(childs[index]);
		}
		return realChilds;
	}

	function searchElement(fun,obj){
		var num=searchText.value;
		fun(obj);
		var i=0;
		var timer=setInterval(function(){
			if(i==stack.length){
				clearInterval(timer);
				stack[i-1].style.backgroundColor="rgb(255,255,255)";
				alert("没有你要找的元素");	
				return;
			}
		 	if(i>0)
		 		stack[i-1].style.backgroundColor="rgb(255,255,255)";
		 		stack[i].style.backgroundColor="rgb(7,123,13)";
		 	if(getInnerText(stack[i])==num){
		 		clearInterval(timer);
		 		handleElement=stack[i];
		 	}
			i++;
		},500)
	}
	//获取第一层子元素的第一个元素中的内容
	function getInnerText(node){
		var text=node.innerText;
		var content=text.split("\n");
		return content[0];
	}