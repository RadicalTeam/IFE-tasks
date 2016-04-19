	function trim(string){
		return string.replace(/(^\s*)|(\s$)/ig,'');
	}
	//获得数组
	function hookArray(inputText){
		if(inputText.value){
		var string1=trim(inputText.value);
		var stringArray=string1.split(/[,_ 、<>\n\r\t]+/);
		return stringArray;
		}
		return "";
	}

	//左侧入
	function leftIn(inputText,wrap){
		var num=hookArray(inputText);
		if(!num) alert("您还没有输入值!");
		else{ 
			var index=0;
			while(index<num.length&&index<10){
				var childs=wrap.childNodes;
				for(i in childs){
					if(trim(num[index])==childs[i].innerText)
					{	index++;
						if(index==num.length) return;
					}
				}
				if(childs.length==10)
					wrap.removeChild(childs[0]);
						var newspan=document.createElement('span');
						newspan.innerHTML=num[index];
						newspan.onmouseover=mouseon;
						newspan.onmouseout=mouseout;
						newspan.onclick=deleteChild;
						wrap.appendChild(newspan);
						inputText.value="";
						index++;		
		}
	}
	}
	
	function changeColor(divwrap,search){
		var key=trim(search.value);
		var pattern=eval("/"+key+"/ig");
		var childs=divwrap.childNodes;
		var yet=new Array();
		for(var index=0;index<childs.length;index++){
			yet=childs[index].innerHTML.match(pattern);
			if(yet){
				childs[index].className="green";
				yet.pop();
					}
				else
					childs[index].className="";
				}
				
		}
		var greened=new Array();

		function mouseon(){
			this.innerHTML="删除"+this.innerHTML;
		}
		function mouseout(){
			this.innerHTML=this.innerHTML.slice(2);
		}
		function deleteChild(){
			var parent=this.parentNode;
			parent.removeChild(this);
		}

		function keydown(e){
			var keynum
			if(window.event) // IE
				{
				keynum = e.keyCode
				}
			else if(e.which) // Netscape/Firefox/Opera
				{
				keynum = e.which
				}
			if(keynum==13)
				leftIn(tag,tagWrap);
					}