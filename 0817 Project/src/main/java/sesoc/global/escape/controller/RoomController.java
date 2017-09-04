package sesoc.global.escape.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import sesoc.global.escape.repository.UserRepository;
import sesoc.global.escape.vo.SocketData;
import sesoc.global.escape.vo.Users;
import sesoc.global.escape.vo.WebsocketVO;
import sesoc.global.escape.webSocket.WebSocketHandler;

@Controller
public class RoomController {
	
	@Autowired
	UserRepository repo;

	@RequestMapping(value = "waitingRoom", method = RequestMethod.GET)
	public String waitingRoom(String num, Users loginUser, Model model) {
		System.out.println(loginUser);
		Users selectedUser = repo.selectId(loginUser);

		model.addAttribute("user", selectedUser);
		model.addAttribute("roomNum", num);
		return "room/waitingRoom";
	}// waitingRoom

	@ResponseBody
	@RequestMapping(value = "renew", method = RequestMethod.GET)
	public List<SocketData> renew(String userId, String userPw) {

		List<WebsocketVO> result = (ArrayList<WebsocketVO>) WebSocketHandler.sessionList;
		List<SocketData> userList = new ArrayList<>();

		for (WebsocketVO rList : result) {
			userList.add(new SocketData(rList.getRoomNum(), rList.getLoginUser(), rList.getWebSocketId()));
		} // for
		return userList;

	}// waitingRoom
	
	@RequestMapping(value = "makingRoomPopUp", method = RequestMethod.GET)
	public String makingRoom() {
		return "room/makingRoomPopUp";
	}
}
