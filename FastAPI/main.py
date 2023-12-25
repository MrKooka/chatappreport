from pydoc import doc
from fastapi import FastAPI
from firebase import on_snapshot, db
from google.cloud.firestore_v1.document import DocumentReference
app = FastAPI()

doc_ref:DocumentReference = db.collection("chats").document("pmtfaRmxBGfknV7hzyH6")

@app.get("/")
async def root():
    doc = doc_ref.get()
    if doc.exists:
        print(f"Document data: {doc.to_dict()}")
    else:
        print("No such document!")
    
    return {"chats": doc.to_dict()}



