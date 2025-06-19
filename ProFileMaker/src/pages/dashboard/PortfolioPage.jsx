import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, storage } from '../../firebase/firebaseConfig';
import { collection, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import html2pdf from 'html2pdf.js';
import { useAuth } from '../../hooks/UseAuth';
import { TEMPLATE_METADATA } from '../../features/index';
import ProfilePreview from '../../components/ProfilePreview';

export default function PortfolioPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
  const pdfRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects for this user
        const projectsRef = collection(db, 'projects');
        const snapshot = await getDocs(projectsRef);
        const projectsData = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(project => project.userId === user?.uid);
        setProjects(projectsData);

        // Fetch selected template from user's profile
        if (user) {
          const profileRef = doc(db, 'profiles', user.uid);
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            const templateId = profileSnap.data().selectedTemplate;
            if (templateId && TEMPLATE_METADATA[templateId]) {
              setSelectedTemplate(TEMPLATE_METADATA[templateId]);
            }
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

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

  const handleDownloadPDF = () => {
    if (pdfRef.current) {
      html2pdf().from(pdfRef.current).save('portfolio.pdf');
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
        <div className="flex gap-2">
          <Link
            to="/dashboard/portfolio/new"
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
          >
            Add Project
          </Link>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-md bg-accent text-white hover:bg-accent/90 transition"
          >
            Download as PDF
          </button>
        </div>
      </div>

      <div ref={pdfRef}>
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
          <div>
            {projects.map(project => (
              <div key={project.id} className="mb-8 relative group">
                <ProfilePreview
                  template={selectedTemplate}
                  project={{
                    ...project,
                    avatarUrl: project.avatarUrl || user?.avatarUrl, // fallback to user avatar
                  }}
                  showBrowseTemplates={false}
                />
                {user && project.userId === user.uid && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => navigate(`/dashboard/portfolio/edit/${project.id}`)}
                      className="inline-flex items-center px-2 py-1 rounded bg-accent text-white text-xs font-medium shadow hover:bg-accent/90 transition focus:outline-none focus:ring-2 focus:ring-accent"
                      style={{
                        backgroundColor: 'rgb(var(--color-foreground))',
                        color: 'rgb(var(--color-background))',
                      }}
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2H7a2 2 0 01-2-2v-1a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id, project.imageUrl)}
                      className="inline-flex items-center px-2 py-1 rounded bg-red-600 text-white text-xs font-medium shadow hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                      style={{
                        backgroundColor: 'rgb(var(--color-foreground))',
                        color: 'rgb(var(--color-background))',
                      }}
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}