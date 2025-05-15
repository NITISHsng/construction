import React, { useState } from "react";
import { toast } from "react-toastify";
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

export default function QueryManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { queries, setQueries } = useData();

  // Cursor popup state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [queryId, setQueryId] = useState(null);

  const services = [
    "Renovation",
    "Remodeling",
    "Commercial",
    "Flooring",
    "New Construction",
    "Electrical",
  ];

  const filteredQueries = queries.filter((query) => {
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

  const handleMarkAsSolved = async (queryId) => {
    try {
      const userDocRef = doc(db, "queries", queryId);
      await updateDoc(userDocRef, { status: false });
      toast.success("Query marked as solved!");

      setQueries((prev) =>
        prev.map((q) => (q.id === queryId ? { ...q, status: false } : q))
      );
    } catch (error) {
      console.error("Error updating query:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleButtonClick = (e) => {
    const newPos = { x: e.clientX, y: e.clientY };
    const buttonText = e.target.innerText;

    setMessage(buttonText);
    setPosition(newPos);
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 5000);
  };

  return (
    <div className="p-6 space-y-6 relative  bg-gray-100">
      {/* Popup */}
      {showPopup && (
  <div
    className="absolute bg-black text-white text-sm px-3 py-2 rounded shadow-lg whitespace-pre-wrap max-w-xs break-words z-50"
    style={{
      top: position.y-20,
      left: position.x-40,
      transform: "translate(-50%, -120%)",
    }}
  >
    {message}
    {/* <br />
    <span className="text-gray-300 text-xs">ID: {queryId}</span> */}
  </div>
)}


      <h1 className="text-3xl font-bold text-blue-800">Query Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<MessageSquare />}
          label="Total Queries"
          value={queries.length}
        />
        <StatCard
          icon={<Clock />}
          label="Pending Queries"
          value={queries.filter((q) => q.status === true).length}
        />
        <StatCard
          icon={<CheckCircle />}
          label="Solved Queries"
          value={queries.filter((q) => q.status === false).length}
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

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredQueries.map((query, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{query.name}</td>
                <td className="px-4 py-3">{query.phoneNumber}</td>
                <td className="px-4 py-3">{query.email}</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {query.service}
                  </span>
                </td>
                <td
  onMouseEnter={(e) => {
    const pos = { x: e.clientX, y: e.clientY };
    setPosition(pos);
    setMessage(query.message);
    setQueryId(query.id);
    setShowPopup(true);
  }}
  onMouseLeave={() => setShowPopup(false)}
  className="px-4 py-3 text-gray-700 cursor-default hover:underline max-w-[30px] whitespace-nowrap overflow-hidden text-ellipsis"
>
  {query.message}
</td>



                <td className="px-4 py-3 text-gray-500 text-sm">
                  {new Date(query.timestamp?.seconds * 1000).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {query.status ? (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Pending
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Solved
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {query.status ? (
                    <button
                      onClick={() => handleMarkAsSolved(query.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded"
                    >
                      Mark as Solved
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">Solved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change }) {
  return (
    <div className="flex justify-between items-center bg-white border rounded-xl shadow-sm p-4 w-full max-w-sm">
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change && (
          <div className="text-xs text-green-600 font-medium mt-1">
            +{change}%↑
          </div>
        )}
      </div>
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
