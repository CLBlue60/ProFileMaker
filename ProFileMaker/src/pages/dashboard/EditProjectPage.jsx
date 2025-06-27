import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectRef = doc(db, 'projects', id);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          const data = projectSnap.data();
          setFormData({
            title: data.title || '',
            role: data.role || '',
            description: data.description || '',
            about: data.about || '',
            experience: data.experience
              ? data.experience.map(exp => `${exp.title} | ${exp.company} | ${exp.period}`).join('\n')
              : '',
            tags: data.tags ? data.tags.join(', ') : '',
            contact: data.contact ? data.contact.join('\n') : '',
            imageUrl: data.imageUrl || '',
            imageFile: null
          });
        } else {
          throw new Error('Project not found');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        alert('Failed to load project data');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = formData.imageUrl || "";

      if (formData.imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `projects/${id}/${formData.imageFile.name}`);
        await uploadBytes(storageRef, formData.imageFile);
        finalImageUrl = await getDownloadURL(storageRef);
      }

      await updateDoc(doc(db, 'projects', id), {
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
        imageUrl: finalImageUrl
      });

      navigate('/dashboard/portfolio');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update project');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">Project Title</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="role">Role</label>
          <input
            id="role"
            type="text"
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            className="w-full p-3 border rounded-lg"
            placeholder="e.g. Senior Product Designer"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="description">Short Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border rounded-lg"
            rows="2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="about">About</label>
          <textarea
            id="about"
            value={formData.about}
            onChange={e => setFormData({ ...formData, about: e.target.value })}
            className="w-full p-3 border rounded-lg"
            rows="3"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="experience">Experience (one per line, format: Title | Company | Period)</label>
          <textarea
            id="experience"
            value={formData.experience}
            onChange={e => setFormData({ ...formData, experience: e.target.value })}
            className="w-full p-3 border rounded-lg"
            rows="3"
            placeholder={`Lead Product Designer | TechStart Inc. | 2020-Present\nUI/UX Designer | Adobe | 2017-2020`}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="tags">Skills/Tags (comma separated)</label>
          <input
            id="tags"
            type="text"
            value={formData.tags}
            onChange={e => setFormData({ ...formData, tags: e.target.value })}
            className="w-full p-3 border rounded-lg"
            placeholder="React, Node.js, Design"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="contact">Contact (one per line)</label>
          <textarea
            id="contact"
            value={formData.contact}
            onChange={e => setFormData({ ...formData, contact: e.target.value })}
            className="w-full p-3 border rounded-lg"
            rows="2"
            placeholder={`email@example.com\nlinkedin.com/in/yourprofile`}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full p-3 border rounded-lg"
            placeholder="https://example.com/image.jpg"
            required={!formData.imageFile}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="imageFile">Or Upload Image</label>
          <input
            id="imageFile"
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
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}