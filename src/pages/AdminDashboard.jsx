import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-blue-900">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/contacts">
          <button className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 px-6 shadow-lg transition duration-300">
            Manage Employees
          </button>
        </Link>

        <Link to="/admin/shift-templates">
          <button className="w-full rounded-2xl bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-5 px-6 shadow-lg transition duration-300">
            Manage Shift Templates
          </button>
        </Link>

        <Link to="/admin/weekly-schedules">
          <button className="w-full rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold py-5 px-6 shadow-lg transition duration-300">
            Assign Weekly Schedules
          </button>
        </Link>

        <Link to="/admin/map-overview">
          <button className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-5 px-6 shadow-lg transition duration-300">
            Ambulance Locations
          </button>
        </Link>

        <Link to="/admin/units">
          <button className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-5 px-6 shadow-lg transition duration-300">
            Units
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
