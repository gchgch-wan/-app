import { useAdminStore } from '../../stores/useAdminStore';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const isLoggedIn = useAdminStore((s) => s.isLoggedIn && s.checkSession());

  if (!isLoggedIn) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
