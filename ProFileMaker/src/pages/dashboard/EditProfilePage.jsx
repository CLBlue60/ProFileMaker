import React, { useState } from "react";
import { useAuth } from "../../hooks/UseAuth";
import UserAvatar from "../../components/UserAvatar";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    bio: user?.bio || '',
    location: user?.location || '',
    avatarUrl: user?.avatarUrl || ''
  });
  const [uploading, setUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarChange = async ({ file, url }) => {
    const db = getFirestore();
    const storage = getStorage();

    try {
      setUploading(true);
      if (file) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        await setDoc(doc(db, "profiles", user.uid), { avatarUrl: downloadURL }, { merge: true });
        setFormData((prev) => ({ ...prev, avatarUrl: downloadURL }));
      } else if (url) {
        await setDoc(doc(db, "profiles", user.uid), { avatarUrl: url }, { merge: true });
        setFormData((prev) => ({ ...prev, avatarUrl: url }));
      }
    } catch (error) {
      alert("Failed to upload avatar: " + error.message);
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <form
        onSubmit={async (e) => {
          await handleSubmit(e);
          navigate('/dashboard');
        }}
        className="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="mb-4">
            <label htmlFor="displayName" className="block font-medium mb-1">
              Display Name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              className="w-full p-2 border rounded"
              value={formData.displayName}
              onChange={e => setFormData({ ...formData, displayName: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block font-medium mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="w-full p-2 border rounded"
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              rows="3"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block font-medium mb-1">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="w-full p-2 border rounded"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1">Avatar</label>
            <UserAvatar
              avatarUrl={formData.avatarUrl}
              onChange={handleAvatarChange}
            />
            {uploading && <div>Uploading...</div>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
