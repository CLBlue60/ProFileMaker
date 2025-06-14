import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
}
