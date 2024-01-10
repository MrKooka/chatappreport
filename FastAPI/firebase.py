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


