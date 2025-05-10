import React, { useState, useEffect } from 'react'

export default function EditShiftModal({ shift, onClose, onSave }) {
  const [name, setName] = useState(shift.name || '')  // Allow editing of the schedule name
  const [startTime, setStartTime] = useState(shift.startTime || '')
  const [endTime, setEndTime] = useState(shift.endTime || '')

  // When the user saves, we don't need to worry about IDs, they are handled by the backend
  const handleSave = () => {
    onSave({
      ...shift,         // Keep all existing data
      name,             // Only change the name
      startTime,        // Only change start time
      endTime,          // Only change end time
      // User ID and Shift Type ID remain unchanged, so no need to send them back
    })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit Shift</h2>

        {/* Schedule Name */}
        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />

        {/* Start Time */}
        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />

        {/* End Time */}
        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />

        <div className="flex justify-end space-x-3">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
