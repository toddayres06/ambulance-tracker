import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/employee-management">
          <button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 shadow transition duration-300">
            Manage Employees
          </button>
        </Link>

        <Link to="/weekly-schedules">
          <button className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 shadow transition duration-300">
            Weekly Schedules
          </button>
        </Link>

        <Link to="/map-overview">
          <button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 shadow transition duration-300">
            View Ambulance Locations
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
