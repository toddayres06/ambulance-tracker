// src/components/ContactList.jsx
const roleColors = {
    EMT: 'bg-blue-100 text-blue-800',
    DISPATCHER: 'bg-yellow-100 text-yellow-800',
    ADMIN: 'bg-purple-100 text-purple-800',
  };
  
  const ContactList = ({ contacts }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Station</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Shift</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="py-3 px-4">{c.name}</td>
                <td className="py-3 px-4">{c.email}</td>
                <td className="py-3 px-4">{c.station}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[c.role] || 'bg-gray-100 text-gray-800'}`}>
                    {c.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {c.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {c.shiftStart ? new Date(c.shiftStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'} to{' '}
                  {c.shiftEnd ? new Date(c.shiftEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ContactList;
  