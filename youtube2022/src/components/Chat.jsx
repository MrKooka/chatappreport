import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="chatIcons">
          <Link to="/report"><button className="report">Report</button></Link>
          <Link to="/report_head_data"><button className="report">Head data</button></Link>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
