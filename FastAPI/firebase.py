import time
from google.cloud import firestore
import typing
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1.document import DocumentReference
from google.cloud.firestore_v1.base_document import DocumentSnapshot
import threading
cred = credentials.Certificate("./chat-6bdb4-firebase-adminsdk-ps30q-1cd663e65d.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


users_ref:DocumentReference = db.collection("users")
docs:typing.Generator[DocumentSnapshot, None, None] = users_ref.stream()
callback_done = threading.Event()

# Create a callback on_snapshot function to capture changes
def on_snapshot(doc_snapshot:typing.Generator[DocumentSnapshot, None, None], changes, read_time):
    messages = doc_snapshot
    callback_done.set()

# doc_ref = db.collection("chats").document("qkqgaqzroOaSVEljehAceEniKpp1fimX3QPC2WZsfrgLN7qWaZsCyI92")
# Watch the document
# doc_watch = doc_ref.on_snapshot(on_snapshot)

# try:
#     while True:
#         time.sleep(1)  # Ждем 1 секунду перед следующей итерацией
# except KeyboardInterrupt:
#     print("Программа остановлена пользователем")
#     doc_watch.unsubscribe()

