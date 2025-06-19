import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../hooks/UseAuth';

export default function NewProjectPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    description: '',
    about: '',
    experience: '',
    tags: '',
    contact: '',
    imageUrl: '',
    imageFile: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'projects'), {
        title: formData.title || "",
        role: formData.role || "",
        description: formData.description || "",
        about: formData.about || "",
        experience: formData.experience
          ? formData.experience.split('\n').map(line => {
              const [title, company, period] = line.split('|').map(s => s.trim());
              return { title: title || "", company: company || "", period: period || "" };
            })
          : [],
        tags: formData.tags
          ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
          : [],
        contact: formData.contact
          ? formData.contact.split('\n').map(line => line.trim()).filter(Boolean)
          : [],
        imageUrl: formData.imageUrl || "",
        createdAt: new Date(),
        userId: user.uid || ""
      });
      navigate('/dashboard/portfolio');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            className="w-full p-3 border rounded-lg"
            placeholder="e.g. Senior Product Designer"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Short Description</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border rounded-lg"
            rows="2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">About</label>
          <textarea
            value={formData.about}
            onChange={e => setFormData({ ...formData, about: e.target.value })}
            className="w-full p-3 border rounded-lg"
            rows="3"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Experience (one per line, format: Title | Company | Period)</label>
          <textarea
            value={formData.experience}
            onChange={e => setFormData({ ...formData, experience: e.target.value })}
            className="w-full p-3 border rounded-lg"
            rows="3"
            placeholder={`Lead Product Designer | TechStart Inc. | 2020-Present\nUI/UX Designer | Adobe | 2017-2020`}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Skills/Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={e => setFormData({ ...formData, tags: e.target.value })}
            className="w-full p-3 border rounded-lg"
            placeholder="React, Node.js, Design"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Contact (one per line)</label>
          <textarea
            value={formData.contact}
            onChange={e => setFormData({ ...formData, contact: e.target.value })}
            className="w-full p-3 border rounded-lg"
            rows="2"
            placeholder={`email@example.com\nlinkedin.com/in/yourprofile`}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full p-3 border rounded-lg"
            placeholder="https://example.com/image.jpg"
            required={!formData.imageFile}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Or Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 rounded-md bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}
