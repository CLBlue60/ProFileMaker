import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewProjectPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    imageUrl: '',
    imageFile: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useFileUpload, setUseFileUpload] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('tags', formData.tags);

      if (useFileUpload && formData.imageFile) {
        formDataToSend.append('image', formData.imageFile);
      } else {
        formDataToSend.append('imageUrl', formData.imageUrl);
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      navigate('/dashboard/portfolio');
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error creating the project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({...formData, imageFile: e.target.files[0]});
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add New Project</h1>
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
                required={!formData.imageUrl}
              />
            ) : (
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full p-3 border rounded-lg"
                placeholder="https://example.com/image.jpg"
                required={!formData.imageFile}
              />
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? 'Adding Project...' : 'Add Project'}
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
