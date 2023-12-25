import React from "react";
import {hm} from "../utils/hetHoursMinuts"
const Message = ({ message }) => {
  const start_event_time = hm(message.start_date)
  let end_event_time;

    // Теперь присваиваем значение в зависимости от условия
  if (message.end_event_time) {
    end_event_time = hm(message.end_event_time);
  } else {
    end_event_time = "...";
  }
  
  return (
    <div className="messageContent">
    <p>{start_event_time}:{end_event_time} {message.text}</p>
    {/* Выводим остальные свойства сообщения если нужно */}
  </div>
  );
};

export default Message;
