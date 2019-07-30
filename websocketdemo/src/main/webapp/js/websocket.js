var websocket = null;
var numo = [];
// 判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
	websocket = new WebSocket("ws://localhost:8080/websocketdemo/socket");
} else {
	alert('当前浏览器 Not support websocket')
}

// 连接发生错误的回调方法
websocket.onerror = function() {
	//setMessageInnerHTML("WebSocket连接发生错误");
};

// 连接成功建立的回调方法
websocket.onopen = function() {
	//etMessageInnerHTML("WebSocket连接成功");
	//queryall();
}

// 接收到消息的回调方法
websocket.onmessage = function(event) {
	var datastring = event.data.split("&");
	//alert(datastring[0]);
	if(datastring[0] == "queryall"){
		getqueryall(datastring[1]);
	}else if(datastring[0] == "getecharts"){
		getecharts(datastring[1])
	}else if(datastring[0] == "add"){
		getadd(datastring[1]);
	}else if(datastring[0] == "delete"){
		getdelete(datastring[1]);
	}else if(datastring[0] == "update"){
		getupdate(datastring[1]);
	}else if(datastring[0] == "querysignal"){
		//getquerysignal(datastring[1]);
	}
}

// 连接关闭的回调方法
websocket.onclose = function() {
	setMessageInnerHTML("WebSocket连接关闭");
}

// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
	closeWebSocket();
}
// 关闭WebSocket连接
function closeWebSocket() {
	websocket.close();
}
// 发送消息
function send(message) {
	websocket.send(message);
}

function getqueryall(datastring) {
	var data = eval("(" + datastring + ")");
	$("#tb  tr:not(:first)").html("");
	var s = '';
	for (var i = 0; i < data.length; i++) {
		s += "<tr><td>" + data[i].id + '</td><td>' + data[i].name + '</td><td>'
				+ data[i].age + "</td></tr>";
	}
	$('#tb').append(s);
}
function getecharts(datastring) {
	numo = [];
	var data = eval("(" + datastring + ")");
	for (var i = 0; i < data.length; i++) {
		//alert(data[i].num);
		numo.push(data[i].num); // 挨个取出数量并填入数量数组
	}
	//alert(getmethod());
	setTimeout(getmethod(), 400);
}

function getnumo() {
	return numo;
}
function getadd(datastring) {
	// setMessageInnerHTML(event.data);
	setTimeout("queryall();", 400);
	setTimeout("send('getecharts');", 400);
	var msg = datastring.split(":");
	if (msg[0] == "true") {
		var title = "增加信息，ID为：" + msg[1];
		layer.alert(title, {
			icon : 1
		});
	} else {
		var title = "增加信息，ID为：" + msg[0] + "<br/>注意：此条信息已经有 " + msg[1] + "条重复";
		layer.alert(title, {
			icon : 3
		});
	}
}
function getdelete(datastring) {
	layer.msg(datastring, {icon: 1});
	
	setTimeout("queryall();", 400);
	setTimeout("send('getecharts');", 400);
}
function getupdate(datastring) {
	layer.msg(datastring, {icon: 1});
	setTimeout("queryall();", 400);
	setTimeout("send('getecharts');", 400);
}
function getquerysignal(datastring) {
	
}

