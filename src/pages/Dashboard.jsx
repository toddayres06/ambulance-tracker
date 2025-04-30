import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p>This is your main tracking overview.</p>
        <Link to="/dispatcher">
          <button className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 mt-4 shadow-md transition duration-300">Go to dispatcher</button>
        </Link>
      </div>
    );
  }
  
        