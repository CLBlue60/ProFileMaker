import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
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
            title: data.title,
            description: data.description,
            tags: data.tags.join(', '),
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
        description: formData.description,
        tags: formData.tags.split(',').map(tag => tag.trim()),
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
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border rounded-lg"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="React, Node.js, Design"
            />
          </div>

          <div>
            <div className="flex items-center gap-4 mb-2">
              <label className="font-medium">Image</label>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={!useFileUpload}
                    onChange={() => setUseFileUpload(false)}
                  />
                  URL
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={useFileUpload}
                    onChange={() => setUseFileUpload(true)}
                  />
                  Upload File
                </label>
              </div>
            </div>

            {useFileUpload ? (
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-lg"
                accept="image/*"
              />
            ) : (
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full p-3 border rounded-lg"
                placeholder="https://example.com/image.jpg"
              />
            )}
            {formData.imageUrl && !useFileUpload && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Current Image:</p>
                <img 
                  src={formData.imageUrl} 
                  alt="Current project" 
                  className="mt-1 h-20 object-contain"
                />
              </div>
            )}
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