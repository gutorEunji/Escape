<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style type="text/css">
	#wrapper{
		width: 800px;
		height: 800px;
	}
	#left{
		width: 60%;
		float: left;
	}
	#right{
		width: 40%;
		float: left;
	}
	#userTable{
		width: 300px;
		height: 300px;
		text-align: center;
		margin: 0 auto;
	}
	#title{
		text-align: center;
	}
	#chatting{
		margin-left: 100px;
	}
	#text{
		width: 230px;
	}
	#mapExplanation{
		width: 200px;
	}
	#mapSelection{
		width: 200px;
		height: 200px;
	}
	#startBtn{
		width: 200px;
		height: 150px;
	}
</style>
<script type="text/javascript" src="resources/websocket/sockjs.js"></script>
<script type="text/javascript" src="resources/websocket/jquery-3.2.1.min.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		$("#textSend").click(function() {
			sendMessage();
		});//textSend
	});//ready

	var roomNum = '${roomNum}';
	var nickname = '${nickname}';

	var sock = new SockJS('<c:url value="/echo"/>');
	sock.onmessage = onMessage;
	sock.onopen = function() {
		sock.send(roomNum + "|roomNum|" + nickname + "|nickname|");
	}//onopen
	sock.onclose = onClose;

	function sendMessage() {
		sock.send(roomNum + "*" + $("#text").val());
	}//sendMessage

	function onMessage(evt) {
		var data = evt.data;
		$("#chattingScreen").append(data + "<br/>");
	}//onMessage

	function onClose(evt) {
		$("#chattingScreen").append("연결 끊김");
	}//onClose
</script>
</head>
<body>
	<div id="wrapper">
	
		<div id="left">
			<div id="title">
				<p>제목</p>
			</div>
			<div id="users">
				<table id="userTable" border="1">
					<tr>
						<td >
							User
						</td>
						<td>
							User
						</td>
					</tr>
					<tr>
						<td>
							User
						</td>
						<td>
							User
						</td>
					</tr>
				</table>
			</div>
			<br />
			<div id="chatting">
				<p id="chattingScreen"></p>
				<br />
				<input type="text" id="text" class="chatting">
				<input type="button" id="textSend" value="send" class="chatting">
			</div>
		</div>
		<div id="right">
			<input type="button" id="mapSelection" value="Map">
			<br />
			<textarea rows="10" cols="30" id="mapExplanation" readonly="readonly"></textarea>
			<br />
			<input type="button" id="startBtn" value="START">
		</div>
		
	</div>
</body>
</html>