// useReport.js
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";

const useReport = ({ userOwner, documentId }) => {
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let querySnapshot;
        if (documentId) {
          // Запросить конкретный документ по documentId
          const docRef = doc(db, "repots", documentId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setDocuments([docSnap.data()]);
          } else {
            setDocuments([]);
          }
        } else if (userOwner) {
          // Запросить все документы, принадлежащие userOwner
          const collectionRef = collection(db, "repots");
          console.log("Запрос к базе ");
          const q = query(collectionRef, where("userOwner", "==", userOwner));
          querySnapshot = await getDocs(q);
          setDocuments(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [userOwner, documentId]);

  return { documents, loading, error };
};

export default useReport;
