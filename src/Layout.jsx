import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/units" className="hover:underline">Units</Link>
        <Link to="login" className="hover:underline">Login</Link>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
