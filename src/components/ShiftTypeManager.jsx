import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import EditShiftModal from './EditShiftModal';

const ShiftTypeManager = () => {
  const { token } = useAuth(); // Get token from context
  const [shiftTypes, setShiftTypes] = useState([]);
  const [form, setForm] = useState({
    name: '',
    startTime: '',
    endTime: '',
  });
  const [editingShift, setEditingShift] = useState(null);

  // Authorization header with Bearer token
  const headers = {
    Authorization: `Bearer ${token}`, // Add Authorization header here
  };

  useEffect(() => {
    fetchShiftTypes();
  }, [token]);

  // Fetching shift types with full URL for production
  const fetchShiftTypes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/shift-types`, { headers });  // Updated with headers
      setShiftTypes(res.data);
    } catch (error) {
      console.error('Error fetching shift types:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/shift-types`, form, { headers });  // Added headers
      setForm({ name: '', startTime: '', endTime: '' });
      fetchShiftTypes();  // Refresh shift types after adding a new one
    } catch (error) {
      console.error('Error creating shift type:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/shift-types/${id}`, { headers });  // Added headers
      fetchShiftTypes();  // Refresh shift types after deletion
    } catch (error) {
      console.error('Error deleting shift type:', error);
    }
  };

  // Handler to update an existing shift
  const handleUpdateShiftType = async (updatedShift) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/shift-types/${updatedShift.id}`, updatedShift, { headers });  // Added headers
      setEditingShift(null);  // Reset the editing state
      fetchShiftTypes();  // Refresh shift types after update
    } catch (error) {
      console.error('Error updating shift type:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Shift Types</h2>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Shift Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border px-2 py-1"
        />
        <input
          type="time"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          className="border px-2 py-1"
        />
        <input
          type="time"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          className="border px-2 py-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          Add Shift
        </button>
      </form>

      <ul>
        {shiftTypes.map((shift) => (
          <li key={shift.id} className="mb-2 flex justify-between items-center">
            <span>
              {shift.name} ({shift.startTime} - {shift.endTime})
            </span>
            <div>
              <button
                onClick={() => setEditingShift(shift)}
                className="text-blue-600 hover:underline mr-3"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(shift.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingShift && (
        <EditShiftModal
          shift={editingShift}
          onClose={() => setEditingShift(null)}
          onSave={handleUpdateShiftType}
        />
      )}
    </div>
  );
};

export default ShiftTypeManager;
