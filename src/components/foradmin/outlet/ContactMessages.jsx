import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  CheckCircle,
  Clock,
  Filter,
  SearchIcon,
} from "lucide-react";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useData } from "../../../pages/DataContext";

export default function ContactMessages() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { messages, setQueries } = useData();

  const services = [
    "Renovation",
    "Remodeling",
    "Commercial",
    "Flooring",
    "New Construction",
    "Electrical",
  ];

  const filteredQueries = messages.filter((query) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && query.status) ||
      (activeTab === "solved" && !query.status);

    const matchesService =
      selectedService === "all" || query.service === selectedService;

    const matchesSearch = query.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesTab && matchesService && matchesSearch;
  });

  const handleMarkAsSolved = async (status, messageId) => {
    try {
      const userDocRef = doc(db, "messages", messageId);
      if (status === "solved") {
        await updateDoc(userDocRef, { status: false, solvedTime: new Date() });
        alert("Query marked as solved!");
      } else {
        await updateDoc(userDocRef, { status: true });
        alert("Query marked as Unsolved!");
      }

      setQueries((prev) =>
        prev.map((q) => (q.id === messageId ? { ...q, status: false } : q))
      );
    } catch (error) {
      console.error("Error updating query:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Contact Massage</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<MessageSquare />}
          label="Total Messages"
          value={messages.length}
        />
        <StatCard
          icon={<Clock />}
          label="Pending Messages"
          value={messages.filter((q) => q.status === true).length}
        />
        <StatCard
          icon={<CheckCircle />}
          label="Solved Messages"
          value={messages.filter((q) => q.status === false).length}
        />
      </div>

      <div className="flex justify-between items-center border-b pb-2">
        <div className="flex gap-2">
          <TabButton
            label="All Queries"
            value="all"
            active={activeTab}
            setActive={setActiveTab}
          />
          <TabButton
            label="Pending"
            value="pending"
            active={activeTab}
            setActive={setActiveTab}
          />
          <TabButton
            label="Solved"
            value="solved"
            active={activeTab}
            setActive={setActiveTab}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} />
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="all">All Services</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative max-w-sm mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 py-4">
        {filteredQueries.map((query, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow-sm border-l-4 border-blue-500 p-4 text-[12px] w-full"
          >
            {/* Timestamp top right */}
            <div className="absolute top-3 right-4 text-[10px] text-gray-400">
              <div>
                {new Date(query.timestamp?.seconds * 1000).toLocaleString()}
              </div>{" "}
              {query.solvedTime &&
                new Date(query.solvedTime.seconds * 1000).toLocaleString()}
            </div>

            {/* Name, Email, Phone outside message box */}
            <div className=" mb-2">
              <div>
                <span className="font-semibold">Name:</span> {query.name}
              </div>
              <div>
                <span className="font-semibold">Phone:</span> {query.phone}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {query.email}
              </div>
            </div>

            <div className="absolute top-17 left-6 bg-white border-0 font-semibold capitalize mb-1">
              {query.subject}
            </div>
            {/* Message box with Subject inline at top */}
            <div className=" bg-gray-50 border p-2 rounded h-32 overflow-y-scroll no-scrollbar text-xs text-gray-800 space-y-1">
              <div>
                {query.message.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Button or Solved Text at bottom-right */}
            <div className="absolute right-3 bottom-3 z-[5]">
              {query.status ? (
                <button
                  onClick={() => handleMarkAsSolved("solved", query.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded shadow"
                >
                  Mark as Solved
                </button>
              ) : (
                <button
                  onClick={() => handleMarkAsSolved("unsolved", query.id)}
                  className="bg-green-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded shadow"
                >
                  Resolved
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change }) {
  return (
    <div className="flex justify-between items-center bg-white border rounded-xl shadow-sm p-4 w-full max-w-sm">
      {/* Left: Text and stats */}
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change && (
          <div className="text-xs text-green-600 font-medium mt-1">
            +{change}%↑
          </div>
        )}
      </div>

      {/* Right: Icon */}
      <div className="bg-gray-100 p-3 rounded-full text-blue-700">{icon}</div>
    </div>
  );
}

function TabButton({ label, value, active, setActive }) {
  const isActive = active === value;
  return (
    <button
      onClick={() => setActive(value)}
      className={`px-3 py-1 rounded text-sm font-medium ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );
}
