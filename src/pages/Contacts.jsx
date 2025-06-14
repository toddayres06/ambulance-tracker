import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import ContactList from '../components/ContactList';
import CreateContact from '../components/CreateContact';

const Contacts = () => {
  const { token } = useAuth(); // Get the token from AuthContext
  const [contacts, setContacts] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`, // Add Authorization header here
  };

  useEffect(() => {
    if (!token) return;  // Don't fetch contacts if there's no token

    // Fetch contacts with authorization header
    axios.get(`${import.meta.env.VITE_API_URL}/api/contacts`, { headers })  // Updated URL
      .then((res) => {
        console.log('Contacts fetched:', res.data); // Log the response data after fetch
        setContacts(res.data);  // Set contacts from the fetched data
      })
      .catch((err) => console.error('Failed to fetch contacts', err));  // Log errors
  }, [token]); // Re-fetch contacts when the token changes

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Contacts</h1>
      <ContactList contacts={contacts} setContacts={setContacts} />
      <button
        onClick={() => setShowCreate(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Contact
      </button>
      <CreateContact
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={(newContact) => {
          // Send POST request to create a new contact with the authorization header
          axios.post(`${import.meta.env.VITE_API_URL}/api/contacts`, newContact, { headers })  // Updated URL
            .then(res => {
              console.log('🔍 New contact response:', res.data); // Log the new contact response
              setContacts(prev => [...prev, res.data.user]); // Add new contact to the list
            })
            .catch(err => console.error('Create failed', err));  // Log errors
        }}
      />
    </div>
  );
};

export default Contacts;
