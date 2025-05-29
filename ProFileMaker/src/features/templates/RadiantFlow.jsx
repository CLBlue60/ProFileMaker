import { useEffect } from 'react';
import './styles/radiant-flow.css';

export default function RadiantFlow({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--rf-primary', profile.colors?.[0] || '#FFB4A2');
    document.documentElement.style.setProperty('--rf-secondary', profile.colors?.[1] || '#6D6875');
    document.documentElement.style.setProperty('--rf-accent', profile.colors?.[2] || '#FFF1E6');
  }, [profile.colors]);

  return (
    <div className="rf-template">
      <header className="rf-header">
        <h1>{profile.name}</h1>
        <p className="rf-subtitle">{profile.headline}</p>
      </header>

      <main className="rf-main">
        <section className="rf-about">
          <h2>About</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="rf-skills">
          <h2>Skills</h2>
          <ul className="rf-skill-list">
            {profile.skills?.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
