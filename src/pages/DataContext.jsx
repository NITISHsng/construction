import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const DataContext = createContext();
const projects = [
  {
    category: "residential",
    title: "Modern Family Home",
    place: "Fulbari, Siliguri, India",
    ownerName: "John Anderson",
    fullDescription:
      "A beautiful and spacious modern home located in Fulbari. Designed with smart living features, energy-efficient utilities, and aesthetic interiors perfect for families seeking comfort and class.",
    imageDetails: {
      front:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80",
      right:
        "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=800&q=80",
    },
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "commercial",
    title: "Orion Business Park",
    place: "Sevoke Road, Siliguri, India",
    ownerName: "Skyline Corp",
    fullDescription:
      "A modern commercial complex in the heart of Sevoke Road with state-of-the-art facilities, green building design, ample parking, and connectivity to all city hubs.",
    imageDetails: {
      front:
        "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=800&q=80",
      right:
        "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
    },
    image:
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "residential",
    title: "Luxury Apartment Renovation",
    place: "Matigara, Siliguri, India",
    ownerName: "Sarah Thompson",
    fullDescription:
      "High-end renovation of a luxury apartment in Matigara. Features include smart home integration, imported marble finishes, and ambient lighting to reflect elegance.",
    imageDetails: {
      front:
        "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80",
      right:
        "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
    },
    image:
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "commercial",
    title: "City Mall Complex",
    place: "Hill Cart Road, Siliguri, India",
    ownerName: "RetailHub Inc.",
    fullDescription:
      "A multi-level shopping center on Hill Cart Road featuring branded outlets, food courts, and entertainment zones with elegant architecture and greenery.",
    imageDetails: {
      front:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80",
      right:
        "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=800&q=80",
    },
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "commercial",
    title: "Tech Innovation Center",
    place: "Uttarayon Township, Siliguri, India",
    ownerName: "InnovateSpace LLP",
    fullDescription:
      "A tech startup co-working space in Uttarayon with collaborative zones, green balconies, cafes, and event spaces for young entrepreneurs and IT companies.",
    imageDetails: {
      front:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80",
      right:
        "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=800&q=80",
    },
    image:
      "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "residential",
    title: "Green Valley Villas",
    place: "Dagapur, Siliguri, India",
    ownerName: "GreenLife Developers",
    fullDescription:
      "A luxurious villa community offering eco-friendly homes with private gardens, solar panels, and community amenities surrounded by scenic hills in Dagapur.",
    imageDetails: {
      front:
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80",

      right:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    },
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
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
      const fetchedQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQueries(fetchedQuery);
    };
    fetchQueries();
  }, []);

  // ✅ Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const snapshot = await getDocs(collection(db, "messages"));
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    };
    fetchMessages();
  }, []);

  // ✅ Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  // ✅ Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const snapshot = await getDocs(collection(db, "comments"));
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    };
    fetchComments();
  }, []);

  // ✅ Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      const fetchedProjects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProject(fetchedProjects);
    };
    fetchProjects();
  }, []);

  return (
    <DataContext.Provider
      value={{
        queries,
        setQueries,
        messages,
        setMessages,
        comments,
        setComments,
        project,
        setProject,
        users,
        setUsers,
        projects,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
