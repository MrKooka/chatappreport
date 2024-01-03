import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import {formatDate} from "../utils/timer"


const Messages = () => {
  const { report, getReport } = useContext(ChatContext);
  const dateForRender = formatDate(report.date)
  useEffect(() => {
    console.log("report.events____",report.events);
    if (Array.isArray(report.events) && report.events.length === 0) {
      getReport();
    }
  }, [report, getReport]);
  console.log("report after useEffect",report );
  // console.log("Внутри Messages",messages);

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "repots", "24-12-2023"), (doc) => {
  //     doc.exists() && setMessages(doc.data().events);
  //     // doc.exists() && setMessages(doc.data().messages);
  //   });
  //   const unSub = data.messages
  //   return () => {
  //     unSub();
  //   };
  // },[]);


  return (
    <div className="messages">
      <h2 style={{ marginBottom: '20px' }} > {dateForRender} Shift {report.shift} Report events </h2>
      {report.events && report.events.map((event) => (
        <Message key={event.id} message={event} />
      ))}
    </div>
  );
};

export default Messages;
