import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ProjectDetails from './pages/ProjectDetails';

// Admin layout and components
import Header from './components/foradmin/Header';
import AppSidebar from './components/foradmin/AppSidebar';
import AdminDashboard from './components/foradmin/outlet/Dashboard';
import UserManagement from './components/foradmin/outlet/UserManagement';
import ProjectManagement from './components/foradmin/outlet/ProjectManagement';
import ContactMessages from './components/foradmin/outlet/ContactMessages';
import ServiceManagement from './components/foradmin/outlet/ServiceManagement';
import QueryManagement from './components/foradmin/outlet/QueryManagement';
//admin layout
import RequireAdmin from './components/foradmin/RequireAdmin';
// Public pages
import Dashboard from './pages/Dashboard';
import Login from "./pages/Login";
import MoreAbout from './pages/MoreAbout';
import AdminPage from './pages/AdminPage';
import DataBase from './components/foradmin/DataBase';
const Layout = () => {
  return (
    // <AdminLayout/>
    <div className="flex h-screen w-full bg-gray-50">
      <AppSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/adminpage" element={<AdminPage/>} />
        <Route path="/about" element={<MoreAbout/>} />
        <Route path="/database" element={<DataBase/>} />
        <Route path="/project/:title" element={<ProjectDetails />} />
       <Route path="/project/:title" element={<ProjectDetails />} />

        {/* Admin layout & nested routes */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <Layout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="queries" element={<QueryManagement />} />
          <Route path="contacts" element={<ContactMessages />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="services" element={<ServiceManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
