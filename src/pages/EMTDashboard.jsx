import { Link } from "react-router-dom";

const EMTDashboard = () => {
  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-blue-900">EMT Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/emt/weekly-schedule">
          <button className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 px-6 shadow-lg transition duration-300">
            View My Weekly Schedule
          </button>
        </Link>

        {/* Placeholder for future feature */}
        <button
          disabled
          className="w-full rounded-2xl bg-gray-200 text-gray-500 font-semibold py-5 px-6 shadow-inner cursor-not-allowed"
        >
          More Features Coming Soon
        </button>
      </div>
    </div>
  );
};

export default EMTDashboard;
