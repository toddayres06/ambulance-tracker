import { Link } from "react-router-dom";

const DispatcherDashboard = () => {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dispatcher Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/dispatcher/map-overview">
          <button className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-5 px-6 shadow-lg transition duration-300">
            Ambulance Locations
          </button>
        </Link>

        <Link to="/dispatcher/units">
          <button className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-5 px-6 shadow-lg transition duration-300">
            Units
          </button>
        </Link>

        <Link to="/dispatcher/control-panel">
          <button className="w-full rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold py-5 px-6 shadow-lg transition duration-300">
            Control Panel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DispatcherDashboard;
