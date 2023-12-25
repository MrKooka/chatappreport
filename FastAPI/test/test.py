import firebase_admin
from firebase_admin import credentials
import json
from google.cloud import firestore
from report import ReportTemplate
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

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



if __name__ == "__main__":
    doc = doc_ref.get()
    if doc.exists:
        print(f"Document data: {doc.to_dict()}")
    else:
        print("No such document!")