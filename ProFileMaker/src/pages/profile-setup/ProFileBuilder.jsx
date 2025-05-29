import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { saveUserProfile } from '../../firebase/firestoreHelpers';

export default function ProfileBuilder() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    headline: '',
    bio: '',
    skills: [],
    newSkill: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveUserProfile(user.uid, profile);
    alert('Profile saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Build Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6 text-black">
        <div>
          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Headline</label>
          <input
            type="text"
            value={profile.headline}
            onChange={(e) => setProfile({...profile, headline: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="e.g. Senior React Developer"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
            className="w-full p-2 border rounded min-h-[150px]"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Skills</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={profile.newSkill}
              onChange={(e) => setProfile({...profile, newSkill: e.target.value})}
              className="flex-1 p-2 border rounded"
              placeholder="Add a skill"
            />
            <button
              type="button"
              onClick={() => {
                if (profile.newSkill) {
                  setProfile({
                    ...profile,
                    skills: [...profile.skills, profile.newSkill],
                    newSkill: ''
                  });
                }
              }}
              className="bg-primary text-white px-4 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                {skill}
                <button
                  type="button"
                  onClick={() => {
                    const newSkills = [...profile.skills];
                    newSkills.splice(index, 1);
                    setProfile({...profile, skills: newSkills});
                  }}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-accent text-white px-6 py-2 rounded hover:bg-accent/90 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
