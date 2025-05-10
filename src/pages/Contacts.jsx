import { useEffect, useState } from 'react';
import axios from 'axios';
import ContactList from '../components/ContactList'
import CreateContact from '../components/CreateContact'

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    axios.get('/api/contacts')
      .then((res) => setContacts(res.data))
      .catch((err) => console.error('Failed to fetch contacts', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Contacts</h1>
      <ContactList contacts={contacts} />
        <button
          onClick={() => setShowCreate(true)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >+ Add Contact
        </button>
        <CreateContact
          isOpen={showCreate}
          onClose={() => setShowCreate(false)}
          onCreate={(newContact) => {
          axios.post('/api/contacts', newContact)
            .then(res => setContacts(prev => [...prev, res.data]))
            .catch(err => console.error('Create failed', err));
          }}
        />
    </div>
  );
};

export default Contacts;


