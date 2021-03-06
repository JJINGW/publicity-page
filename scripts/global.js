/*
* @Author: wangjing
* @Date:   2018-03-12 16:04:49
* @Last Modified by:   wangjing
* @Last Modified time: 2018-03-13 14:09:42
*/
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	} else {
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement){
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function addClass(element,value){
	if (!element.className){
		element.className = value;
	} else {
		element.className += " " + value;
	}
}

function highlightPage() {
	if (!document.getElementsByTagName)  return false;
	if (!document.getElementById)  return false;
	var headers = document.getElementsByTagName("header");
	if (headers.length == 0)  return false;
	var navs = headers[0].getElementsByTagName("nav");
	if (navs.length == 0)  return false;
	var links = navs[0].getElementsByTagName("a");
	for (var i=0; i<links.length; i++) {
		var linkurl= links[i].getAttribute("href");
		if (window.location.href.indexOf(linkurl) != -1){
			links[i].className = "here";	
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);			
		}
	}
}

function moveElement(elementID,final_x,final_y,interval) {
	if (!document.getElementById)  return false;
	if (!document.getElementById(elementID))  return false;
	var elem = document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left = "0px";
	}
	if (!elem.style.top) {
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y){
		return true;
	}
	if (xpos < final_x){
		var dist = Math.ceil((final_x - xpos)/10);
		xpos += dist;
	}
	if (xpos > final_x){
		var dist = Math.ceil((xpos - final_x)/10);
		xpos -= dist;
	}
	if (ypos < final_y){
		var dist = Math.ceil((final_y - ypos)/10);
		ypos += dist;
	}
	if (ypos > final_y){
		var dist = Math.ceil((ypos - final_y)/10);
		ypos -= dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat, interval);
}


function prepareSlideshow() {
	if (!document.getElementsByTagName)  return false;
	if (!document.getElementById)  return false;
	if (!document.getElementById("intro"))   return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id", "slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("id", "preview");
	preview.setAttribute("src", "images/slideshow.gif");
	preview.setAttribute("alt", "a glimpse of what awaits you");
	slideshow.appendChild(preview);
	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt", "");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	insertAfter(slideshow,intro);
	var links = document.getElementsByTagName("a");
	var destination;
	for (var i=0; i<links.length; i++) {
		links[i].onmouseover = function() {
			destination = this.getAttribute("href");
			if (destination.indexOf("index.html") != -1) {
				moveElement("preview",0,0,5);
			}
			if (destination.indexOf("about.html") != -1) {
				moveElement("preview",-150,0,5);
			}
			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview",-300,0,5);
			}
			if (destination.indexOf("live.html") != -1) {
				moveElement("preview",-450,0,5);
			}
			if (destination.indexOf("contact.html") != -1) {
				moveElement("preview",-600,0,5);
			}
		}
	}
}

function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i=0; i<sections.length; i++) {
		if (sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = "block";
		}
	}
}


function prepareInternalnav() {
	if (!document.getElementsByTagName)  return false;
	if (!document.getElementById)  return false;
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0)  return false;
	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0)  return false;
	var links = navs[0].getElementsByTagName("a");
	for (var i=0; i<links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if (!document.getElementById(sectionId))  continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		}
	}
}

function preparePlaceholder() {
	if (!document.getElementById)  return false;
	if (!document.getElementById("imagegallery"))  return false;
	if (!document.createElement)  return false;
	if (!document.createTextNode)  return false;
	var imggallery = document.getElementById("imagegallery");
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "images/placeholder.gif");
	placeholder.setAttribute("alt", "my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var destext = document.createTextNode("Choose a picture");
	description.appendChild(destext);
	insertAfter(description,imggallery);
	insertAfter(placeholder,description);
}

function showPic(whichpic) {
	if (!document.getElementById("placeholder"))  return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
	if (whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");
	} else {
		var text = " ";
	}
	if (!document.getElementById("description"))  return false;
	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = text;
	}
	return false;
}

function prepareGallery() {
	if (!document.getElementById)  return false;
	if (!document.getElementsByTagName)  return false;
	if (!document.getElementById("imagegallery"))  return false;
	var gallery = document.getElementById("imagegallery");
	var links =  gallery.getElementsByTagName("a");
	for (var i=0; i<links.length; i++) {
		links[i].onclick = function() {
			return showPic(this);
		}
	}
}


function stripeTables() {
	if (!document.getElementsByTagName)  return false;
	if (!document.getElementsByTagName("table"))  return false;
	if (!document.getElementsByTagName("tr"))  return false;
  	var tables = document.getElementsByTagName("table");
	for (var i=0; i<tables.length; i++) {
		var rows = tables[i].getElementsByTagName("tr");
		var odd = true;
		for (var j=0; j<rows.length; j++) {
			if (odd == true) {
				addClass(rows[j],"odd");
				odd = false;			
			} else {
				odd = true;
			}
		}
	}
}

function highlightRows() {
	var rows = document.getElementsByTagName("tr");
	for (var i=0; i<rows.length; i++) {
		rows[i].oldClassName = rows[i].className;
		// var oldClassName = rows[i].getAttribute("class");
		rows[i].onmouseover = function() {
			addClass(this,"highlight");
		}
		rows[i].onmouseout = function() {
			this.className = this.oldClassName;
		}
	}
}

function displayAbbreviations() {
	var abbreviations = document.getElementsByTagName("abbr");
	if (abbreviations.length<1)  return false;
	var defs = [];
	for (var i=0; i<abbreviations.length; i++) {
		var definitions = abbreviations[i].getAttribute("title");
		if (definitions.length<1) continue;
		var keys = abbreviations[i].lastChild.nodeValue;
		defs[keys] = definitions;
	}
	var dlist = document.createElement("dl");
	for (keys in defs) {
		var definitions = defs[keys];
		var dkey = document.createElement("dt");
		var key_text = document.createTextNode(keys);
		dkey.appendChild(key_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definitions);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dkey);
		dlist.appendChild(ddesc);
	}
	if (dlist.childNodes.length<1)  return false;
	var headers = document.createElement("h3");
	var header_text = document.createTextNode("Abbreviations");
	headers.appendChild(header_text);
	var articles = document.getElementsByTagName("article");
	if (articles.length<1)  return false;
	articles[0].appendChild(headers);
	articles[0].appendChild(dlist);
}

function focusLabels() {
	if (!document.getElementsByTagName)  return false;
	var labels = document.getElementsByTagName("label");
	for (var i=0; i<labels.length; i++) {
		if (!labels[i].getAttribute("for"))  continue;
		labels[i].onclick = function() {
			var id = this.getAttribute("for");
			if (!document.getElementById(id))   return false;
			var elem = document.getElementById(id);
			elem.focus();
		}
	}
}

function resetFields(whichform) {
	if (Modernizr.input.placeholder)  return;
	for (var i=0; i<whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.type == "submit")  continue;
		var check = element.placeholder || element.getAttribute("placeholder");
		if (!check) continue;
		element.onfocus = function() {
			var text = this.placeholder || this.getAttribute("placeholder");
			if (this.value == text) {
				this.className = '';
				this.value = '';
			}
		}
		element.onblur = function() {
			if (this.value == '') {
				this.className = "placeholder";
				this.value = this.placeholder || this.getAttribute("placeholder")
			}
		}
		element.onblur();
	}
}


// function prepareForms() {
// 	for (var i=0; i<document.forms.length; i++) {
// 		var thisform = document.forms[i];
// 		resetFields(thisform);
// 	}
// }


function isFilled(field) {
	if (field.value.replace(' ','').length == 0)  return false;
	var placeholder = field.placeholder || field.getAttribute("placeholder");
	return (field.value != placeholder);
}

function isEmail(field) {
	return (field.value.indexOf("@") != -1  && field.value.indexOf(".") != -1);
}

function validateForm(whichform) {
	for (var i=0; i<whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.required == 'required') {
			if (!isFilled(element)) {
				alert("Please fill in the "+element.name+" field.");
				return false;
			}
		}
		if (element.type == 'email') {
			if (!isEmail(element))  {
				alert("The "+element.name+" field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}

function prepareForms() {
	for (var i=0; i<document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function() {
			return validateForm(this);
		}
	}
}



addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);
