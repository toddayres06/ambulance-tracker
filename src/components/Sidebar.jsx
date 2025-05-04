// components/Sidebar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // You may already have a hook like this

export default function Sidebar() {
  const { user } = useAuth(); // Let's assume this gives you { role: 'ADMIN' | 'DISPATCHER' | 'EMT' }

  const commonLinks = [
    { to: "/", label: "Dashboard" }
  ];

  const roleLinks = {
    ADMIN: [
      { to: "/admin-dashboard", label: "Admin Dashboard" },
      { to: "/units", label: "Units" },
      { to: "/map-overview", label: "Map Overview" },
      { to: "/manage-employees", label: "Manage Employees" }
    ],
    DISPATCHER: [
      { to: "/dispatcher-dashboard", label: "Dispatcher Dashboard" },
      { to: "/units", label: "Units" },
      { to: "/map-overview", label: "Map Overview" }
    ],
    EMT: [
      { to: "/emt-dashboard", label: "EMT Dashboard" },
      { to: "/track", label: "Track" }
    ]
  };

  const linksToRender = [...commonLinks, ...(roleLinks[user?.role] || [])];

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-col gap-2 min-w-[200px] h-screen">
      {linksToRender.map(({ to, label }) => (
        <Link key={to} to={to} className="hover:underline">{label}</Link>
      ))}
    </nav>
  );
}
