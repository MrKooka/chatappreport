import React, { createContext,useState,useCallback } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // Убедитесь, что путь к Firebase правильный

export const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [report, setReport] = useState({}); // Изменено на объект

  const getReport = useCallback(() => {
    console.log("Внутри getReport ");
    const reportDocRef = doc(db, "repots", "24-12-2023");
    return onSnapshot(reportDocRef, (doc) => {
      if (doc.exists()) {
        setReport(doc.data()); // Присваиваем весь объект doc.data() в report
      }
    });
  }, []); // Пустой массив зависимостей указывает, что getReport не будет пересоздаваться

  const value = {
    report, // report теперь объект
    getReport,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};