import { useState, useEffect } from 'react';
import axios from 'axios';

import EditShiftModal from './EditShiftModal';

const ShiftTypeManager = () => {
  const [shiftTypes, setShiftTypes] = useState([]);
  const [form, setForm] = useState({
    name: '',
    startTime: '',
    endTime: '',
  });
  const [editingShift, setEditingShift] = useState(null);

  useEffect(() => {
    fetchShiftTypes();
  }, []);

  // Fetching shift types with full URL for production
  const fetchShiftTypes = async () => {
    try {
      // Use the full URL from the environment variable for production
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/shift-types`);

      // Update the state with the fetched shift types
      setShiftTypes(res.data);
    } catch (error) {
      // Handle errors gracefully
      console.error('Error fetching shift types:', error);
      // Optionally, display a user-friendly message here
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Posting to the Render API for shift types
      await axios.post(`${import.meta.env.VITE_API_URL}/shift-types`, form);
      setForm({ name: '', startTime: '', endTime: '' });
      fetchShiftTypes();  // Refresh shift types after adding a new one
    } catch (error) {
      console.error('Error creating shift type:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Sending a DELETE request to remove the shift type
      await axios.delete(`${import.meta.env.VITE_API_URL}/shift-types/${id}`);
      fetchShiftTypes();  // Refresh shift types after deletion
    } catch (error) {
      console.error('Error deleting shift type:', error);
    }
  };

  // ✅ This is what was missing — handler to update an existing shift
  const handleUpdateShiftType = async (updatedShift) => {
    try {
      // Sending PUT request to update the shift type
      await axios.put(`${import.meta.env.VITE_API_URL}/shift-types/${updatedShift.id}`, updatedShift);
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
              {/* ✅ Add the missing Edit button here */}
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

      {/* ✅ This shows the Edit modal */}
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
