import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import Button from '@mui/material/Button';
const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="chatIcons">
        
          <Link to="/report"><Button variant="contained">Report</Button></Link>
          <Link to="/report_head_data"><Button variant="contained">Head Report</Button></Link>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
