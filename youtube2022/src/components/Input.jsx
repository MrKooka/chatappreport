import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, database } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDatabase, ref, onValue, } from "firebase/database";




const Input = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [databaseEvents, setDatabaseEvents] = useState({});
  const [inputText, setInputText] = useState("")
  const [event, setEvent] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { report, getReport } = useContext(ChatContext);
  const now = new Date()
  const date = ~~(now.getTime()/1000)
  
  const handleSend = async () => {
    if (report && report.events && report.events.length > 0) {
      // Клонируем массив событий
      const updatedEvents = [...report.events];

      // Получаем последнее событие
      const lastEventIndex = updatedEvents.length - 1;
      const lastEvent = updatedEvents[lastEventIndex];

      // Добавляем новое время окончания события
      const endEventTime = date; // Или другое время, которое вы хотите добавить
      const updatedLastEvent = { ...lastEvent, end_event_time: endEventTime};

      // Заменяем последнее событие в массиве
      updatedEvents[lastEventIndex] = updatedLastEvent;

      // Теперь updatedEvents содержит измененный последний элемент

      try {
        // Получаем ссылку на документ report в Firestore
        const reportDocRef = doc(db, "repots", "fb5ac7ea-1c76-48ab-87d7-c9ce5efe721f");

        // Обновляем документ в Firestore, заменяя массив events
        await updateDoc(reportDocRef, {
          events: updatedEvents,
        });

        console.log("Событие успешно обновлено в report!");
      } catch (error) {
        console.error("Ошибка при обновлении события в report:", error);
      }
    }
    const newEvent = {
      id: uuid(),             // уникальный идентификатор для нового события
      text: event.event,        // текст события
      senderId:  currentUser.uid, // ID текущего пользователя
      start_event_time: date,             // текущее время в формате timestamp
      type: event.type || 'Unknown', // тип события, если он не определён, используем 'Unknown'

    };
  
    try {
      // Получаем ссылку на документ report в Firestore
      const reportDocRef = doc(db, "repots", "fb5ac7ea-1c76-48ab-87d7-c9ce5efe721f");
  
      // Обновляем документ, добавляя новое событие в массив events
      await updateDoc(reportDocRef, {
        events: arrayUnion(newEvent),
      });
  
      console.log("Событие успешно добавлено в report!");
    } catch (error) {
      console.error("Ошибка при добавлении события в report:", error);
    }
    
    // Очищаем поля ввода
    setEvent({});
    setInputText("");
    
  };

    const handleSearch = (searchTerm) => {
      let results = [];
      Object.keys(databaseEvents).forEach(key => {
        databaseEvents[key].forEach(item => {
          if (item.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push({"event":item,"type":key});
          }
        });
      });
      console.log("results: ",results);
      setSearchResults(results);
    };

    const handleChange = (e) => {
      handleSearch(e.target.value);
      setInputText(e.target.value)
     
      
    };

 
    const handleResultClick = (result) => {
      console.log("searchResults:", searchResults);
      setSearchResults([]); // Очистить результаты поиска после выбора
      setInputText(result.event)
      setEvent(result)


    };

    const handleReport = () => {
      // const reportDocRef = doc(db, "repots", "24-12-2023");

        
    }
  useEffect(() => {    
    const starCountRef = ref(database, "actions_types");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setDatabaseEvents(data);
      // updateStarCount(postElement, data);
    });
  }, []);


  return (
    <div className="input">
       <input
        type="text"
        placeholder="Type something..."
        onChange={handleChange}
        value={inputText}
      />
    {inputText && (
      <div className="search-results">
        {searchResults.map((result, index) => (
          <div onClick={() => {handleResultClick(result)}} key={index} className="search-result">
            {result.event}
          </div>
        ))}
      </div>
    )}

      <div className="send">
        <button onClick={handleSend}>Send</button>
      </div>
      <div className="report">
        <button onClick={()=>{console.log('dsd')}}>Report</button>
      </div>
    </div>
  );
};

export default Input;

