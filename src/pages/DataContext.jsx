import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const DataContext = createContext();
const projects = [
  {
    category: "residential",
    title: "Modern Family Home",
    place: "New York, USA",
    ownerName: "John Anderson",
    fullDescription: "Orion Heights is a modern 25-story commercial building located in the heart of the city. Designed with innovation and sustainability in mind, it offers premium office spaces, advanced security, high-speed elevators, and energy-efficient systems. The building features a spacious lobby, rooftop lounge, fitness center, conference halls, and ample parking. With LEED Gold certification and eco-friendly infrastructure, Orion Heights is a landmark of smart design and business excellence, providing easy access to metro, highways, and major hubs.",
    imageDetails: {
      front: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "commercial",
    title: "Office Tower Complex",
    place: "San Francisco, USA",
    ownerName: "Skyline Corp",
    fullDescription: "A 15-story smart office tower equipped with green technology, open workspaces, and advanced security. Located in the heart of the business district.",
    imageDetails: {
      front: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "residential",
    title: "Luxury Apartment Renovation",
    place: "Los Angeles, USA",
    ownerName: "Sarah Thompson",
    fullDescription: "High-end renovation of a city apartment, featuring Italian marble flooring, smart lighting, and a minimalist design theme with premium finishes.",
    imageDetails: {
      front: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "commercial",
    title: "Retail Shopping Center",
    place: "Houston, USA",
    ownerName: "RetailHub Inc.",
    fullDescription: "A large shopping plaza with modern architecture, ample parking, and landscaped open areas, housing 12 retail units for national and local brands.",
    imageDetails: {
      front: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "commercial",
    title: "Tech Startup Hub",
    place: "Austin, USA",
    ownerName: "InnovateSpace LLC",
    fullDescription: "A co-working and collaboration hub for tech startups featuring open desks, private pods, conference rooms, and an in-house cafe with outdoor seating.",
    imageDetails: {
      front: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },

];


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
        users, setUsers,
        projects
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);