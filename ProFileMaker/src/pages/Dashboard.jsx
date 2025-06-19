import { Link } from 'react-router-dom';
import UserAvatar from '../components/UserAvatar';
import { useAuth } from '../hooks/UseAuth';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useState, useEffect } from 'react';
import { Skeleton } from '../components/ui/Skeleton';
import { Alert } from '../components/ui/Alert';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribeCallbacks = [];

    const setupProjectsListener = () => {
      const q = query(
        collection(db, 'projects'),
        where('userId', '==', user.uid)
      );
      
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const count = snapshot.size;
          setStats(prev => updateStat(prev, 'Projects', count));
        },
        (error) => {
          console.error('Projects listener error:', error);
          setStatsError('Failed to load project count');
        }
      );
      return unsubscribe;
    };

    const setupActivityListener = () => {
      const q = query(
        collection(db, 'activity'),
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const activities = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate()
          }));
          setActivity(activities);
          setLoadingActivity(false);
        },
        (error) => {
          console.error('Activity listener error:', error);
          setStatsError('Failed to load recent activity');
          setLoadingActivity(false);
        }
      );
      return unsubscribe;
    };

    const updateStat = (currentStats, name, value) => {
      const statIndex = currentStats.findIndex(s => s.name === name);
      if (statIndex === -1) return currentStats;
      
      const oldValue = parseInt(currentStats[statIndex].value) || 0;
      const change = value - oldValue;
      
      return [
        ...currentStats.slice(0, statIndex),
        {
          ...currentStats[statIndex],
          value: value.toLocaleString(),
          change: `${change >= 0 ? '+' : ''}${change}`,
          changeType: change >= 0 ? 'positive' : 'negative'
        },
        ...currentStats.slice(statIndex + 1)
      ];
    };

    try {
      setLoadingStats(true);
      setStatsError(null);
      setStats([
        { name: 'Profile Views', value: (profile?.views || 0).toLocaleString(), change: '+0', changeType: 'positive' },
        { name: 'Projects', value: '0', change: '+0', changeType: 'positive' },
      ]);

      unsubscribeCallbacks.push(setupProjectsListener());
      unsubscribeCallbacks.push(setupActivityListener());

      setLoadingStats(false);
    } catch (error) {
      console.error('Initialization error:', error);
      setStatsError('Failed to initialize dashboard');
      setLoadingStats(false);
    }

    return () => {
      unsubscribeCallbacks.forEach(unsubscribe => unsubscribe());
    };
  }, [user?.uid, profile?.views]);

  return (
    <div className="text-accent">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <UserAvatar user={user} avatarUrl={user?.avatarUrl} size="lg" readonly />
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

      {/* Stats Section */}
      {statsError && (
        <Alert variant="error" className="mb-4">
          {statsError}
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {loadingStats ? (
          <>
            <Skeleton className="h-24 rounded-lg" />
            <Skeleton className="h-24 rounded-lg" />
          </>
        ) : (
          stats.map((stat) => (
            <div key={stat.name} className="bg-white dark:bg-base-dark rounded-lg p-4 shadow-sm border border-accent/10">
              <h3 className="text-sm font-medium">{stat.name}</h3>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              <p className={`text-sm mt-1 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </p>
            </div>
          ))
        )}
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
          to="/dashboard/portfolio"
          className="bg-white dark:bg-base-dark p-4 rounded-lg border border-accent/10 hover:border-primary/30 transition flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span>📁</span>
          </div>
          <span>My Portfolio</span>
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
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-base-dark rounded-xl shadow-sm p-6 border border-accent/10">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        
        {loadingActivity ? (
          <div className="space-y-4">
            <Skeleton className="h-16 rounded-lg" />
            <Skeleton className="h-16 rounded-lg" />
          </div>
        ) : activity.length > 0 ? (
          <div className="space-y-4">
            {activity.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.type === 'project' ? 'bg-purple-100 dark:bg-purple-900/30' :
                  'bg-gray-100 dark:bg-gray-800'
                }`}>
                  {item.type === 'project' ? '🛠️' : '•'}
                </div>
                <div>
                  <p className="font-medium">{item.message}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.timestamp?.toLocaleString() || 'Recently'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
        )}
      </div>
    </div>
  );
}