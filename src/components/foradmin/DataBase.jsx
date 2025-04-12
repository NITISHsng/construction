import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const DataBase = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [queries, setQueries] = useState([]);
  const [comments, setComments] = useState([]);

  // Fetch all collections when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Messages
        const messagesSnapshot = await getDocs(collection(db, 'messages'));
        setMessages(messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Queries
        const queriesSnapshot = await getDocs(collection(db, 'queries'));
        setQueries(queriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Comments
        const commentsSnapshot = await getDocs(collection(db, 'comments'));
        setComments(commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Firebase Collections</h1>

      <section>
        <h2 className="font-semibold text-lg">Users ({users.length})</h2>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </section>

      <section>
        <h2 className="font-semibold text-lg">Messages ({messages.length})</h2>
        <pre>{JSON.stringify(messages, null, 2)}</pre>
      </section>

      <section>
        <h2 className="font-semibold text-lg">Queries ({queries.length})</h2>
        <pre>{JSON.stringify(queries, null, 2)}</pre>
      </section>

      <section>
        <h2 className="font-semibold text-lg">Comments ({comments.length})</h2>
        <pre>{JSON.stringify(comments, null, 2)}</pre>
      </section>
    </div>
  );
};

export default DataBase;
