import { Link } from 'react-router-dom';
import UserAvatar from '../components/UserAvatar';
import { useAuth } from '../hooks/UseAuth';

export default function Dashboard() {
  const { user, profile } = useAuth();

  const stats = [
    { name: 'Profile Views', value: '1,234', change: '+12%', changeType: 'positive' },
    { name: 'Projects', value: '5', change: '+2', changeType: 'positive' },
    { name: 'Connections', value: '89', change: '+3', changeType: 'positive' },
  ];

  return (
    <div className="text-accent">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <UserAvatar user={user} size="lg" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {user?.displayName || 'User'}!
            </h1>
            <p className="opacity-90">
              {profile?.bio || 'Make your profile stand out!'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-base-dark rounded-lg p-4 shadow-sm border border-accent/10">
            <h3 className="text-sm font-medium">{stat.name}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            <p className="text-sm mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link
          to="/dashboard/profile/edit"
          className="bg-white dark:bg-base-dark p-4 rounded-lg border border-accent/10 hover:border-primary/30 transition flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span>👤</span>
          </div>
          <span>Edit Profile</span>
        </Link>

        <Link
          to="/dashboard/portfolio/new"
          className="bg-white dark:bg-base-dark p-4 rounded-lg border border-accent/10 hover:border-primary/30 transition flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span>➕</span>
          </div>
          <span>Add Project</span>
        </Link>

        <Link
          to="/dashboard/settings"
          className="bg-white dark:bg-base-dark p-4 rounded-lg border border-accent/10 hover:border-primary/30 transition flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span>⚙️</span>
          </div>
          <span>Settings</span>
        </Link>

        <Link
          to="/templates"
          className="bg-white dark:bg-base-dark p-4 rounded-lg border border-accent/10 hover:border-primary/30 transition flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span>🎨</span>
          </div>
          <span>Change Template</span>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-base-dark rounded-xl shadow-sm p-6 border border-accent/10">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              ✓
            </div>
            <div>
              <p className="font-medium">Profile updated</p>
              <p className="text-sm">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              ✉️
            </div>
            <div>
              <p className="font-medium">New connection request</p>
              <p className="text-sm">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
