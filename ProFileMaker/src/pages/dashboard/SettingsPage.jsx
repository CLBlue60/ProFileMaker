import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/UseAuth';
import { updateUserProfile, deleteUserData } from '../../firebase/firestoreHelpers';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, deleteUser } from 'firebase/auth';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateUserProfile(user.uid, {
        displayName: formData.displayName
      });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        formData.currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, formData.newPassword);
      setSuccess('Password updated successfully!');
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    if (!window.confirm('Permanently delete your account and all data?')) return;
    if (!formData.currentPassword) {
      setError('Enter your password to confirm deletion');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Reauthenticate
      const credential = EmailAuthProvider.credential(
        user.email,
        formData.currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Delete user data
      await deleteUserData(user.uid);

      // Delete auth account
      await deleteUser(user);

      // Logout and redirect
      await logout();
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation */}
        <div className="w-full md:w-48 space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left p-2 rounded ${activeTab === 'profile' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`w-full text-left p-2 rounded ${activeTab === 'password' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          >
            Password
          </button>
          <button
            onClick={() => setActiveTab('danger')}
            className={`w-full text-left p-2 rounded ${activeTab === 'danger' ? 'bg-red-100' : 'hover:bg-gray-100'}`}
          >
            Delete Account
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <h2 className="text-xl font-semibold">Profile</h2>
              <div>
                <label className="block mb-1">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <h2 className="text-xl font-semibold">Change Password</h2>
              <div>
                <label className="block mb-1">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}

          {/* Delete Account Tab */}
          {activeTab === 'danger' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Delete Account</h2>
              <div className="border border-red-200 rounded p-4">
                <h3 className="font-medium">Delete Account</h3>
                <p className="text-sm text-gray-600 mb-3">This will permanently delete all your data.</p>
                <div className="mb-3">
                  <label className="block mb-1">Enter Password to Confirm</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  onClick={handleAccountDeletion}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete Account'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
