import { useEffect } from 'react';
import './styles/academic-scholar.css';

export default function AcademicScholar({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--as-primary', profile.colors?.[0] || '#3E92CC');
    document.documentElement.style.setProperty('--as-secondary', profile.colors?.[1] || '#F9F9F9');
    document.documentElement.style.setProperty('--as-accent', profile.colors?.[2] || '#1B1B1E');
  }, [profile.colors]);

  return (
    <div className="as-template">
      <header className="as-header">
        <h1>{profile.name}</h1>
        <p className="as-headline">{profile.headline}</p>
      </header>

      <main className="as-main">
        <section className="as-about">
          <h2>Biography</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="as-skills">
          <h2>Research Areas</h2>
          <ul className="as-skill-list">
            {profile.skills?.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
