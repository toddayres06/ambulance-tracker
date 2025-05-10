import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { ROLES } from "./constants/roles";

export default function Layout() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [];

  if (!user) {
    navItems.push({ path: "/login", label: "Login" });
  } else {
    switch (user.role) {
      case ROLES.ADMIN:
        navItems.push({ path: "/admin", label: "Admin Home" });
        navItems.push({ path: "/admin-shift-types", label: "Shift Types" });
        break;
      case ROLES.DISPATCHER:
        navItems.push({ path: "/dispatcher", label: "Dispatcher Home" });
        break;
      case ROLES.EMT:
        navItems.push({ path: "/emt", label: "EMT Home" });
        break;
      default:
        navItems.push({ path: "/unauthorized", label: "Unknown Role" });
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800">
      {/* Sidebar */}
      <nav className="bg-blue-800 text-white p-4 md:w-64 w-full flex flex-col md:min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-wide">🚑 Tracker</h1>
          {user?.role && (
            <div className="text-xs mt-1 text-blue-200 italic">
              {user.role}
            </div>
          )}
        </div>

        <ul className="space-y-2 flex-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-3 py-2 rounded-md transition-all duration-150 ${
                  location.pathname === item.path
                    ? "bg-blue-700 font-medium"
                    : "hover:bg-blue-700"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {user && (
          <button
            onClick={logout}
            className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm transition"
          >
            Logout
          </button>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
