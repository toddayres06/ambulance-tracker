import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import EditShiftModal from '../components/EditShiftModal';

const ShiftAssignments = () => {
  const { token, user } = useAuth();
  console.log("Token in ShiftAssignments:", token);  // <-- Logging the token for debugging

  const [shifts, setShifts] = useState([]);
  const [shiftTypes, setShiftTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingShift, setEditingShift] = useState(null);
  const [newAssign, setNewAssign] = useState({ userId: '', shiftTypeId: '', date: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Authorization header
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch assignments, types, and users
  useEffect(() => {
    if (!token) return;  // If no token, don't fetch data

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching data with token:', token);  // Log token

        const [assignRes, typesRes, usersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/shift-assignments`, { headers }),  // Updated API URL
          axios.get(`${import.meta.env.VITE_API_URL}/shift-types`, { headers }),         // Updated API URL
          axios.get(`${import.meta.env.VITE_API_URL}/users`, { headers }),               // Updated API URL
        ]);

        // Log the responses to verify the data being returned
        console.log('Shift assignments:', assignRes.data);  // Log the response data for shifts
        console.log('Shift types:', typesRes.data);         // Log the response data for shift types
        console.log('Users:', usersRes.data);               // Log the response data for users

        setShifts(assignRes.data);
        setShiftTypes(typesRes.data);
        // Filter out admin users
        setUsers(usersRes.data.filter(u => u.role !== 'admin'));
      } catch (err) {
        console.error(err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]); // Run fetchData whenever the token changes

  // Create new assignment
  const handleCreate = async (e) => {
    e.preventDefault();

    // Convert the date to ISO string if it's valid
    const formattedDate = newAssign.date ? new Date(newAssign.date).toISOString() : null;
    const assignmentData = { ...newAssign, date: formattedDate };

    try {
      console.log('Attempting to create assignment with data:', assignmentData); // Debugging log
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/shift-assignments`, assignmentData, { headers }); // Updated API URL
      setShifts(prev => [...prev, res.data]);
      setNewAssign({ userId: '', shiftTypeId: '', date: '' });
    } catch (err) {
      console.error(err);
      setError('Assignment failed');
    }
  };

  // Update assignment
  const handleSave = async (updated) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/shift-assignments/${updated.id}`,
        updated,
        { headers }
      );  // Updated API URL
      setShifts(prev => prev.map(s => s.id === updated.id ? res.data : s));
      setEditingShift(null);
    } catch (err) {
      console.error(err);
      setError('Update failed');
    }
  };

  // Delete assignment
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this assignment?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/shift-assignments/${id}`, { headers }); // Updated API URL
      setShifts(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
      setError('Delete failed');
    }
  };

  if (loading) return <div className="p-6 text-center">Loading schedules...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Assign Weekly Schedules</h1>

      {/* New assignment form */}
      <form onSubmit={handleCreate} className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <select
          required
          value={newAssign.userId}
          onChange={e => setNewAssign({ ...newAssign, userId: parseInt(e.target.value) })}
          className="border rounded p-2"
        >
          <option value="">Select Employee</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.name} — {u.role.charAt(0).toUpperCase() + u.role.slice(1)} @ {u.station}
            </option>
          ))}
        </select>

        <select
          required
          value={newAssign.shiftTypeId}
          onChange={e => setNewAssign({ ...newAssign, shiftTypeId: parseInt(e.target.value) })}
          className="border rounded p-2"
        >
          <option value="">Select Shift</option>
          {shiftTypes.map(t => (
            <option key={t.id} value={t.id}>
              {t.name} ({t.startTime}–{t.endTime})
            </option>
          ))}
        </select>

        <input
          type="date"
          required
          value={newAssign.date}
          onChange={e => setNewAssign({ ...newAssign, date: e.target.value })}
          className="border rounded p-2"
        />

        <button
          type="submit"
          className="bg-green-500 text-white rounded px-4 py-2 disabled:opacity-50"
          disabled={!newAssign.userId || !newAssign.shiftTypeId || !newAssign.date}
        >
          Assign
        </button>
      </form>

      {/* Assignment list */}
      <div className="space-y-4">
        {shifts.map(shift => (
          <div key={shift.id} className="flex justify-between items-center border p-4 rounded">
            <div>
              <div>
                <strong>{shift.user?.name || 'Unknown User'}</strong> {/* Use optional chaining */}
              </div>
              <div>
                {shift.shiftType?.name || 'Unknown Shift'}
              </div>
              <div>{new Date(shift.date).toLocaleDateString()}</div>
            </div>
            <div className="space-x-3">
              <button onClick={() => setEditingShift(shift)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(shift.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingShift && (
        <EditShiftModal
          shift={editingShift}
          onClose={() => setEditingShift(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ShiftAssignments;
