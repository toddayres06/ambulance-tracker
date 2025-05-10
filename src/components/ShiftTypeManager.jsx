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

  const fetchShiftTypes = async () => {
    const res = await axios.get('/api/shift-types');
    setShiftTypes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/shift-types', form);
    setForm({ name: '', startTime: '', endTime: '' });
    fetchShiftTypes();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/shift-types/${id}`);
    fetchShiftTypes();
  };

  // ✅ This is what was missing — handler to update an existing shift
  const handleUpdateShiftType = async (updatedShift) => {
    await axios.put(`/api/shift-types/${updatedShift.id}`, updatedShift);
    setEditingShift(null);
    fetchShiftTypes();
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
