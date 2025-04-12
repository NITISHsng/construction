import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [queries, setQueries] = useState([]);
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState([]);
  const [project, setProject] = useState([]);
  const [users, setUsers] = useState([]);

  // ✅ Fetch queries
  useEffect(() => {
    const fetchQueries = async () => {
      const snapshot = await getDocs(collection(db, "queries"));
      const fetchedQuery = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQueries(fetchedQuery);
    };
    fetchQueries();
  }, []);

  // ✅ Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const snapshot = await getDocs(collection(db, "messages"));
      const fetchedMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(fetchedMessages);
    };
    fetchMessages();
  }, []);

  // ✅ Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  // ✅ Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const snapshot = await getDocs(collection(db, "comments"));
      const fetchedComments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(fetchedComments);
    };
    fetchComments();
  }, []);

  // ✅ Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      const fetchedProjects = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProject(fetchedProjects);
    };
    fetchProjects();
  }, []);

  return (
    <DataContext.Provider
      value={{
        queries, setQueries,
        messages, setMessages,
        comments, setComments,
        project, setProject,
        users, setUsers
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
