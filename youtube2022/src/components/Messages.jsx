import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const { report, getReport } = useContext(ChatContext);
  useEffect(() => {
    if (!report.events) {
      // Если events еще не получены, вызываем getReport
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
      {/* Проверяем, что report.events существует и является массивом перед отображением */}
      {report.events && report.events.map((event) => (
        <Message key={event.id} message={event} />
      ))}
    </div>
  );
};

export default Messages;
