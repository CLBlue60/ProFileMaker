import { useAuth } from '../../hooks/UseAuth';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Link
          to="/dashboard/profile/edit"
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
        >
          Edit Profile
        </Link>
      </div>

      <div className="bg-white dark:bg-base-dark rounded-xl shadow-md p-6 border border-accent/20">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 dark:bg-accent/10 flex items-center justify-center">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-3xl">👤</span>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{user?.displayName || 'No name set'}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Bio</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {user?.bio || 'No bio added yet'}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Location</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {user?.location || 'Not specified'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
