import React, { useState } from 'react';
import { useData } from '../../../pages/DataContext';
import { db } from '../../../firebase/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { addDoc, collection, updateDoc } from 'firebase/firestore';
export default function ConstructionProjectManagement() {
  const { project, setProject } = useData();

  const [addProjectSection, setAddProjectSection] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [formData, setFormData] = useState({
    owner: '',
    type: '',
    name: '',
    status: '',
    manager: '',
    startDate: '',
    endDate: '',
  });


  const projectHandel = async (projectId) => {
    try {
      const projectDocRef = doc(db, "projects", projectId);
      await deleteDoc(projectDocRef); 
      alert("Project deleted successfully.");
      setProject((prev) => prev.filter((p) => p.projectId !== projectId));

    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddProject = async () => {
    if (!formData.name || !formData.owner || !formData.type || !formData.status) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const newProject = {
      ...formData,
      createdAt: new Date().toISOString(),
    };
  
    try {
      const docRef = await addDoc(collection(db, 'projects'), newProject);
  
      // 👇 Add the generated ID into the document after it's created
      await updateDoc(doc(db, 'projects', docRef.id), {
        projectId: docRef.id,
      });
  
      setProject((prev) => [...prev, { id: docRef.id, ...newProject, projectId: docRef.id }]);
  
      setFormData({
        projectId: '',
        owner: '',
        type: '',
        name: '',
        status: '',
        manager: '',
        startDate: '',
        endDate: '',
        timestamp: new Date(),
      });
  
      setAddProjectSection(false);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };
  

  const filteredProjects =
    selectedStatus === 'All'
      ? project
      : project.filter((p) => p.status === selectedStatus);


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-3xl font-bold mb-6  text-blue-800">Project Management</h3>

      {addProjectSection ? (
        <div className="mb-10 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
              placeholder="Project Owner Name"
              className="border border-gray-300 p-3 rounded-md w-full"
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md w-full"
            >
              <option value="">Select Project Type</option>
              <option value="Renovation">Renovation</option>
              <option value="Remodeling">Remodeling</option>
              <option value="Commercial">Commercial</option>
              <option value="Flooring">Flooring</option>
              <option value="New Construction">New Construction</option>
              <option value="Electrical">Electrical</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Building / House Name"
              className="border border-gray-300 p-3 rounded-md w-full"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md w-full"
            >
              <option value="">Select Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              name="manager"
              value={formData.manager}
              onChange={handleInputChange}
              placeholder="Project Manager"
              className="border border-gray-300 p-3 rounded-md w-full"
            />
            <input
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              type="date"
              className="border border-gray-300 p-3 rounded-md w-full"
            />
            <input
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              type="date"
              className="border border-gray-300 p-3 rounded-md w-full"
            />
          </div>
          <button
            onClick={handleAddProject}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
          >
            Add Project
          </button>
          <button
            onClick={() => setAddProjectSection(false)}
            className="m-4 bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAddProjectSection(true)}
          className="m-4 ml-0 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        >
          Add New Project
        </button>
      )}

      <div className="mb-6 flex gap-4 flex-wrap">
        {['All', 'Planning', 'In Progress', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-xl shadow ${
              selectedStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700'
            } hover:bg-blue-100`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl p-4 pb-0 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p><span className="font-medium">Type:</span> {project.type}</p>
            <p><span className="font-medium">Owner:</span> {project.owner}</p>
            <p><span className="font-medium">Status:</span> {project.status}</p>
            <p><span className="font-medium">Manager:</span> {project.manager}</p>
            <p><span className="font-medium">Start Date:</span> {project.startDate}</p>
            <p><span className="font-medium">End Date:</span> {project.endDate}</p>
           <div className='flex justify-end'>
           <button
            onClick={()=>projectHandel(project.projectId)}
            className="m-4 mt-0 bg-red-600 text-white px-6 py-1 rounded-xl hover:bg-red-700"
          >
            Delete
          </button>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
}
