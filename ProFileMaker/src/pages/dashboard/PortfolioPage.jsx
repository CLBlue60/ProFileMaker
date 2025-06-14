import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, storage } from '../../firebase/firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, 'projects');
        const snapshot = await getDocs(projectsRef);
        const projectsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId, imageUrl) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteDoc(doc(db, 'projects', projectId));
      
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }

      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Portfolio</h1>
        <Link
          to="/dashboard/portfolio/new"
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
        >
          Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't added any projects yet</p>
          <Link
            to="/dashboard/portfolio/new"
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
          >
            Create Your First Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div key={project.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <img
                src={project.imageUrl || 'https://placehold.co/600x400?text=Project'}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/dashboard/portfolio/edit/${project.id}`)}
                    className="text-sm text-primary hover:underline"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id, project.imageUrl)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}