import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

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
  });
  const [imageFile, setImageFile] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const projectRef = doc(db, 'projects', id);
      let imageUrl = formData.imageUrl;

      if (imageFile) {
        if (formData.imageUrl) {
          try {
            const oldImageRef = ref(storage, formData.imageUrl);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.log('No old image to delete or error deleting:', error);
          }
        }
        const storageRef = ref(storage, `projects/${id}/${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await updateDoc(projectRef, {
        title: formData.title,
        role: formData.role,
        description: formData.description,
        about: formData.about,
        experience: formData.experience
          ? formData.experience.split('\n').map(line => {
              const [title, company, period] = line.split('|').map(s => s.trim());
              return { title, company, period };
            })
          : [],
        tags: formData.tags.split(',').map(tag => tag.trim()),
        contact: formData.contact
          ? formData.contact.split('\n').map(line => line.trim())
          : [],
        imageUrl,
        updatedAt: new Date(),
      });

      navigate('/dashboard/portfolio');
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error updating the project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading project data...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Project Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-3 border rounded-lg"
              placeholder="e.g. Senior Product Designer"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Short Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border rounded-lg"
              rows="2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">About</label>
            <textarea
              value={formData.about}
              onChange={e => setFormData({ ...formData, about: e.target.value })}
              className="w-full p-3 border rounded-lg"
              rows="3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Experience (one per line, format: Title | Company | Period)</label>
            <textarea
              value={formData.experience}
              onChange={e => setFormData({ ...formData, experience: e.target.value })}
              className="w-full p-3 border rounded-lg"
              rows="3"
              placeholder={`Lead Product Designer | TechStart Inc. | 2020-Present\nUI/UX Designer | Adobe | 2017-2020`}
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Skills/Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              className="w-full p-3 border rounded-lg"
              placeholder="React, Node.js, Design"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Contact (one per line)</label>
            <textarea
              value={formData.contact}
              onChange={e => setFormData({ ...formData, contact: e.target.value })}
              className="w-full p-3 border rounded-lg"
              rows="2"
              placeholder={`email@example.com\nlinkedin.com/in/yourprofile`}
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full p-3 border rounded-lg"
              placeholder="https://example.com/image.jpg"
              required={!imageFile}
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
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? 'Updating Project...' : 'Update Project'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/portfolio')}
              className="px-6 py-3 border rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}