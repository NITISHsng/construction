import React, { useEffect,useState } from "react";
import {
  Users,
  UserPlus,
  Clock,
  ActivitySquare,
  Search as SearchIcon,
} from "lucide-react";
import { useData } from "../../../pages/DataContext";

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("all-users");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const { users } = useData();

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

 // Count active users
  const activeUsersCount = users.filter((u) => isUserActive(u.lastLogin)).length;
  useEffect(() => {
    console.log("Active users today:", activeUsersCount);
  }, [users]);


  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (key) => {
    if (key !== sortKey) return null;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  const sortedData = users.filter((u) =>
      Object.values(u).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (typeof valA === "object" && valA?.seconds) {
        return sortOrder === "asc"
          ? valA.seconds - valB.seconds
          : valB.seconds - valA.seconds;
      }

      return sortOrder === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-800">User Management</h1>
        <p className="text-gray-500">View and manage all registered users.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users />} label="Total Users" value={users.length} />
        <StatCard icon={<UserPlus />} label="New Users (Last 30 Days)" value={4} />
        <StatCard icon={<Clock />} label="Active Today" value={activeUsersCount} />
      </div>

      <div>
        <div className="flex border-b">
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
                        onClick={
                          column.sortable
                            ? () => handleSort(column.accessorKey)
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-1">
                          {column.header}
                          {column.sortable && getSortIcon(column.accessorKey)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="h-24 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <SearchIcon className="w-5 h-5 opacity-50" />
                          No results found.
                        </div>
                      </td>
                    </tr>
                  ) : (
                    sortedData.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-gray-50 transition-colors"
                      >
                        {columns.map((column) => (
                          <td key={column.accessorKey} className="px-4 py-3">
                            {column.render
                              ? column.render(item[column.accessorKey], item)
                              : typeof item[column.accessorKey] === "object" &&
                                item[column.accessorKey]?.seconds
                              ? new Date(
                                  item[column.accessorKey].seconds * 1000
                                ).toLocaleString()
                              : String(
                                  item[column.accessorKey] ?? "Not available"
                                )}
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

        {activeTab === "activity-logs" && (
          <div className="mt-6 border rounded-lg p-4 bg-white shadow-sm overflow-x-auto">
            <div className="flex items-center mb-4">
              <ActivitySquare className="mr-2 h-5 w-5 text-blue-800" />
              <h2 className="text-lg font-semibold">User Activity Logs</h2>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">User</th>
                  <th className="p-2">Action</th>
                  <th className="p-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {userActivities.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="p-2">{a.name}</td>
                    <td className="p-2">{a.action}</td>
                    <td className="p-2">{a.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change }) {
  return (
    <div className="flex justify-between items-center bg-white border rounded-xl shadow-sm p-4 w-full max-w-2xs">
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
      <div className="bg-gray-100 p-3 rounded-full text-blue-700">
        {icon}
      </div>
    </div>
  );
}

function TabButton({ label, value, activeTab, setActiveTab }) {
  const isActive = value === activeTab;
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
        isActive
          ? "border-blue-600 text-blue-700"
          : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-400"
      }`}
    >
      {label}
    </button>
  );
}
