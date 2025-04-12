import React, { useState, useEffect } from "react";
import { Users, UserPlus, Clock, ActivitySquare, SearchIcon } from "lucide-react";
import { useData } from "../../../pages/DataContext";

const columns = [
  { accessorKey: "name", header: "Name", sortable: true },
  { accessorKey: "email", header: "Email", sortable: true },
  { accessorKey: "phoneNumber", header: "Mobile", sortable: true },
  { accessorKey: "createdAt", header: "Signup Date", sortable: true },
  { accessorKey: "lastLogin", header: "Last Login", sortable: true },
  {
    accessorKey: "status",
    header: "Status",
    sortable: true,
    render: (value, user) => {
      const isActive = isUserActive(user.lastLogin);
      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            isActive
              ? "bg-green-200 text-green-800"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
];


// Function to check if user is active based on last login
const isUserActive = (lastLogin) => {
  if (!lastLogin?.seconds) return false;

  const lastLoginDate = new Date(lastLogin.seconds * 1000);
  const now = new Date();
  const diffInMinutes = (now - lastLoginDate) / (1000 * 60);

  return diffInMinutes < 5; // Active within last 5 minutes
};

function TabButton({ label, value, activeTab, setActiveTab }) {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
        isActive
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-gray-500 hover:text-blue-600"
      }`}
    >
      {label}
    </button>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4">
      <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("all-users");
  const [searchTerm, setSearchTerm] = useState("");
  const { users } = useData();

  // Count active users
  const activeUsersCount = users.filter((u) => isUserActive(u.lastLogin)).length;
  useEffect(() => {
    console.log("Active users today:", activeUsersCount);
  }, [users]);

  // Filter and sort (simplified placeholder logic)
  const filteredData = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedData = filteredData; // Add actual sort logic if needed

  return (
    <div className="p-6 space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users />} title="Total Users" value={users.length} />
        <StatCard icon={<UserPlus />} title="New Users (Last 30 Days)" value={"comming soon"} />
        <StatCard icon={<Clock />} title="Active Today" value={activeUsersCount} />
      </div>

      {/* Tabs */}
      <div className="flex border-b mt-6">
        <TabButton label="All Users" value="all-users" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton label="Activity Logs" value="activity-logs" activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {activeTab === "all-users" && (
        <div className="bg-white p-4 rounded-xl shadow mt-6">
          <h3 className="text-lg font-semibold mb-4">All users</h3>

          <div className="relative max-w-sm mb-4">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-x-auto rounded-md border border-gray-200">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.accessorKey}
                      className={`px-4 py-3 border-b font-medium ${
                        column.sortable ? "cursor-pointer select-none" : ""
                      }`}
                      // Add sorting logic if needed
                    >
                      <div className="flex items-center gap-1">
                        {column.header}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="h-24 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-1">
                        <SearchIcon className="w-5 h-5 opacity-50" />
                        No results found.
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedData.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                      {columns.map((column) => (
                        <td key={column.accessorKey} className="px-4 py-3">
                          {column.render
                            ? column.render(item[column.accessorKey], item)
                            : typeof item[column.accessorKey] === "object" &&
                              item[column.accessorKey]?.seconds
                            ? new Date(item[column.accessorKey].seconds * 1000).toLocaleString()
                            : String(item[column.accessorKey] ?? "Number not set")}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
