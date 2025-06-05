import { useEffect, useState } from 'react';
import axios from 'axios';
import ContactList from '../components/ContactList'
import CreateContact from '../components/CreateContact'

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    axios.get('https://ambulance-tracker-7e8t.onrender.com/api/contacts')  // Now hits the Render backend
      .then((res) => setContacts(res.data))
      .catch((err) => console.error('Failed to fetch contacts', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Contacts</h1>
      <ContactList contacts={contacts} setContacts={setContacts} />
        <button
          onClick={() => setShowCreate(true)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >+ Add Contact
        </button>
        <CreateContact
          isOpen={showCreate}
          onClose={() => setShowCreate(false)}
          onCreate={(newContact) => {
          axios.post('https://ambulance-tracker-7e8t.onrender.com/api/contacts', newContact) // Updated POST request to Render backend
          .then(res => {
          console.log('🔍 New contact response:', res.data);
          setContacts(prev => [...prev, res.data.user]);
          })
            .catch(err => console.error('Create failed', err));
          }}
        />
    </div>
  );
};

export default Contacts;


