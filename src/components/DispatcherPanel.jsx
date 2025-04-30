import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'

const DispatcherPanel = () => {
  const [ambulances, setAmbulances] = useState([]);

  const fetchAmbulances = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/ambulances');
      const data = await response.json();
      setAmbulances(data);
    } catch (error) {
      console.error('Error fetching ambulances:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setAmbulances(prev =>
      prev.map(ambulance =>
        ambulance.id === id ? { ...ambulance, status: newStatus } : ambulance
      )
    );

    const toastId = toast.loading('Updating status...');
  

    try {
      const response = await fetch(`http://localhost:3001/api/ambulances/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (response.ok) {
        toast.success(`Status updated to "${newStatus}"`, { id: toastId });
      } else {
        toast.error('Failed to update status', { id: toastId });
      }
    } catch (error) {
      console.error('Error updating ambulance status:', error);
      toast.error('Error updating status', { id: toastId });
    }
  };

  useEffect(() => {
    fetchAmbulances();
    const interval = setInterval(fetchAmbulances, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dispatcher Control Panel</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-4 py-2 text-left">Ambulance</th>
              <th className="border-b px-4 py-2 text-left">Status</th>
              <th className="border-b px-4 py-2 text-left">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {ambulances.map((ambulance) => (
              <tr key={ambulance.id} className="hover:bg-gray-50">
                <td className="border-b px-4 py-2">{ambulance.id}</td>
                <td className="border-b px-4 py-2">{ambulance.status}</td>
                <td className="border-b px-4 py-2">
                  <select className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                          value={ambulance.status}
                          onChange={(e) => handleStatusChange(ambulance.id, e.target.value)}
                  >
                    <option value="Clear">Clear</option>
                    <option value="En Route">En Route</option>
                    <option value="On Scene">On Scene</option>
                    <option value="Transporting">Transporting</option>
                    <option value="Destination">Destination</option>
                    <option value="Out of Service">Out of Service</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DispatcherPanel;
