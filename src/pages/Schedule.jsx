import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Schedule() {
  const { token, user } = useAuth();
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get('/shift-assignments', { headers })
      .then(res => {
        setShifts(res.data);
      })
      .catch(err => {
        console.error('Failed to load EMT schedule:', err);
        setError('Could not load your schedule.');
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p>Loading your schedule…</p>;
  if (error)   return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Weekly Schedule</h1>
      {shifts.length === 0 ? (
        <p>No shifts assigned yet.</p>
      ) : (
        <ul className="space-y-2">
          {shifts.map(s => (
            <li key={s.id} className="border p-4 rounded">
              <div><strong>Date:</strong> {new Date(s.date).toLocaleDateString()}</div>
              <div><strong>Shift:</strong> {s.shiftType.name}</div>
              <div><strong>Assigned by:</strong> {s.user.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
