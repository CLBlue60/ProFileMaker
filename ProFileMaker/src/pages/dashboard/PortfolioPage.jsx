import { useState } from 'react';
import { Link } from 'react-router-dom';

const mockProjects = [
  {
    id: '1',
    title: 'E-commerce Website',
    description: 'A full-featured online store with payment integration',
    tags: ['React', 'Node.js', 'MongoDB'],
    imageUrl: 'https://placehold.co/600x400?text=E-commerce'
  },
  {
    id: '2',
    title: 'Portfolio Template',
    description: 'Responsive portfolio template for creatives',
    tags: ['HTML/CSS', 'JavaScript'],
    imageUrl: 'https://placehold.co/600x400?text=Portfolio'
  }
];

export default function PortfolioPage() {
  const [projects] = useState(mockProjects);

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
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="text-sm text-primary hover:underline">Edit</button>
                  <button className="text-sm text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
