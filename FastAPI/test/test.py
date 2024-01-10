import firebase_admin
from firebase_admin import credentials
import json
from google.cloud import firestore
from report import ReportTemplate
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import uuid
import time

# Use a service account.
cred = credentials.Certificate('../chat-6bdb4-firebase-adminsdk-ps30q-1cd663e65d.json')

app = firebase_admin.initialize_app(cred)
# cred = credentials.Certificate('../chat-6bdb4-firebase-adminsdk-ps30q-1cd663e65d.json')
# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'https://chat-6bdb4-default-rtdb.firebaseio.com'

# })

db = firestore.client()
doc_ref = db.collection("repots").document("24-12-2023")


# realtime database 
# ref = db.reference('actions_types')
# snapshot = ref.get()
# print(snapshot)




# Пример использования:
# Предположим, что 1638338400 - это Unix timestamp для 06:00, и каждое событие занимает 5 минут.


# Формируем строку для каждого события, увеличивая timestamp на 5 минут для каждого нового события
current_timestamp =  time.time()
report_template = {   
    "shift": 0,
    "Break": 0,
    "organizational_downtime": 0,
    "o_pre_drive_tests": 0,
    "ERRORS": [],
    "test_car_id": "",
    "system_downtime": 0,
    "current_location": 0,
    "o_powercycles_duration": 0,
    "delimiter": "______________________",
    "events": [{}],
    "date": current_timestamp,
    "Recording_time": 0,
    "o_pre_drive_test_duration": 0,
    "o_powercycles": 0,
    "working_hours": 0,
    "zam_sets": [],
    "standby_downtime": 0,
    "route_id": "",
    "closed":False,
    "userOwner":"fimX3QPC2WZsfrgLN7qWaZsCyI92"
}

if __name__ == "__main__":
    # doc = doc_ref.get()
    # if doc.exists:
    #     print(f"Document data: {doc.to_dict()}")
    # else:
    #     print("No such document!")
    with open("testdata.json", 'r') as f:
        db.collection("repots").document(uuid.uuid4().__str__()).set(report_template)
