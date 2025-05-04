import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Layout() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/units", label: "Units" },
    { path: "/map-overview", label: "Map" },
    { path: "/login", label: "Login" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <nav className="bg-gray-800 text-white p-4 md:w-60 w-full flex flex-col md:min-h-screen">
        <h1 className="text-xl font-bold mb-6">🚑 Tracker</h1>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                  location.pathname === item.path ? "bg-gray-700" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
