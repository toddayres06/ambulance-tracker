// /components/DebugToken.jsx
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const DebugToken = () => {
  const [decoded, setDecoded] = useState(null);
  const [rawToken, setRawToken] = useState(null);

  const fakeAdminToken = {
    email: "admin@example.com",
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour from now
  };
  
  const fakeEMTToken = {
    email: "emt@example.com",
    role: "emt",
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const fakeDispatcherToken = {
    email: "dispatcher@example.com",
    role: "dispatcher",
    exp: Math.floor(Date.now() / 1000) + 60 *60
  }
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token retrieved from localStorage:', token); // <-- Add this log
    setRawToken(token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
      } catch (err) {
        setDecoded({ error: 'Invalid token' });
      }
    }
  }, []);

  return (
    <div style={{ padding: '1rem', background: '#f8f8f8', border: '1px solid #ccc' }}>
      <h2>🔍 Debug Token</h2>
      <p><strong>Raw Token:</strong></p>
      <pre style={{ wordBreak: 'break-word' }}>{rawToken || 'No token found'}</pre>
      <p><strong>Decoded Token:</strong></p>
      <pre>{decoded ? JSON.stringify(decoded, null, 2) : 'Not decoded'}</pre>

      <button
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
  onClick={() => {
    const encoded =
      btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })) +
      "." +
      btoa(JSON.stringify(fakeAdminToken)) +
      "." +
      "fake-signature";
    localStorage.setItem("token", encoded);
    window.location.reload();
  }}
>
  Set Admin Token
</button>

<button
  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mr-2"
  onClick={() => {
    const encoded =
      btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })) +
      "." +
      btoa(JSON.stringify(fakeDispatcherToken)) +
      "." +
      "fake-signature";
    localStorage.setItem("token", encoded);
    window.location.reload();
  }}
>
  Set Dispatcher Token
</button>

<button
  className="bg-green-600 mr-2  text-white px-4 py-2 rounded hover:bg-green-700"
  onClick={() => {
    const encoded =
      btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })) +
      "." +
      btoa(JSON.stringify(fakeEMTToken)) +
      "." +
      "fake-signature";
    localStorage.setItem("token", encoded);
    window.location.reload();
  }}
>
  Set EMT Token
</button>

<button 
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  onClick={() => {
  localStorage.removeItem("token");
  window.location.reload();
}}>Clear Token</button>



    </div>
  );
};

export default DebugToken;
