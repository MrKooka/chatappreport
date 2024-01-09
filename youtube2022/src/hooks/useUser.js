import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import {db} from "../firebase"


const useUser = (docId) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "users", docId);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    setDocument(docSnapshot.data());
                } else {
                    throw new Error("Document does not exist");
                }
            } catch (err) {
                setError(err.message);
            }
        };

        if (docId) {
            fetchData();
        }
    }, [docId]); // Эффект будет повторно выполняться при изменении docId

    return [document, error];
};

export default useUser;
