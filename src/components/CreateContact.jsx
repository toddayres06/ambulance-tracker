import { useState } from 'react';

const CreateContact = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'emt',
    station: '',
    active: true,
    shiftStart: null,
    shiftEnd: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData); // this will call the parent’s handler
    onClose(); // close the panel after creating
    setFormData({ name: '', email: '', password: '', role: 'EMT', station: '', active: true });
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Add New Contact</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border rounded p-2" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border rounded p-2" required />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Initial Password"
            className="w-full border rounded p-2"
            required
          />

          <input type="text" name="station" value={formData.station} onChange={handleChange} placeholder="Station" className="w-full border rounded p-2" required />
          <select name="role" value={formData.role} onChange={handleChange} className="w-full border rounded p-2">
            <option value="emt">EMT</option>
            <option value="dispatcher">Dispatcher</option>
            <option value="admin">Admin</option>
          </select>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} />
            <span>Active</span>
          </label>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
