// File: src/pages/ShiftAssignments.jsx

import React, { useState, useEffect } from 'react'
import EditShiftModal from '../components/EditShiftModal'

export default function ShiftAssignments() {
  const [shifts, setShifts] = useState([])
  const [editingShift, setEditingShift] = useState(null)

  // Example fetch - customize as needed
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/shift-assignments');
        const data = await res.json();
        console.log('Fetched shift data:', data);
        setShifts(data);
      } catch (err) {
        console.error('Error fetching shifts:', err);
      }
    };
  
    fetchShifts()
  }, [])

  const handleSave = async (updatedShift) => {
    await fetch(`/api/shift-assignments/${updatedShift.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        date: updatedShift.date,
        userId: updatedShift.userId,
        shiftTypeId: updatedShift.shiftTypeId,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    // Update local state
    setShifts((prev) =>
      prev.map((s) => (s.id === updatedShift.id ? updatedShift : s))
    )
    setEditingShift(null)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shift Assignments</h1>


      <pre>{JSON.stringify(shifts, null, 2)}</pre>
      {shifts.map((shift) => (
        <div key={shift.id} className="p-4 border rounded mb-3">
          <div className="mb-2">
            <strong>Date:</strong> {new Date(shift.date).toLocaleString()}
          </div>
          <button
            onClick={() => setEditingShift(shift)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
        </div>
      ))}

      {editingShift && (
        <EditShiftModal
          shift={editingShift}
          onClose={() => setEditingShift(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
