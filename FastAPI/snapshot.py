from  pprint import pprint
from datetime import datetime, timedelta
import threading
import typing
import time
from firebase import db
from google.cloud.firestore_v1.base_document import DocumentSnapshot
callback_done = threading.Event()
# Create a callback on_snapshot function to capture changes

def format_event(start_timestamp, end_timestamp, event_name):
    # Преобразование timestamp в объект datetime
    start_time = datetime.fromtimestamp(start_timestamp)
    end_time = datetime.fromtimestamp(end_timestamp)

    # Форматирование времени в формат HH:MM
    start_str = start_time.strftime("%H:%M")
    end_str = end_time.strftime("%H:%M")
    
    # Возвращение сформированной строки
    return f"{start_str}-{end_str} {event_name}"


def on_snapshot(doc_snapshot, changes, read_time):
    data_list = doc_snapshot[0].to_dict()["messages"]
    
    for item in data_list:
        index = data_list.index(item)
        if index == len(data_list)-1:
            text_item = item['date']
            print(format_event(item['date'],text_item,item['text']))
        else:
            text_item = data_list[index+1]
            print(format_event(item['date'],text_item['date'],item['text']))
    
    callback_done.set()




doc_ref = db.collection("chats").document("pmtfaRmxBGfknV7hzyH6")

# Watch the document
doc_watch = doc_ref.on_snapshot(on_snapshot)


try:
    while True:
        time.sleep(1)  # Ждем 1 секунду перед следующей итерацией
except KeyboardInterrupt:
    print("Программа остановлена пользователем")
    doc_watch.unsubscribe()

