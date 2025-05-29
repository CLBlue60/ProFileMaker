import { useEffect } from 'react';
import './styles/fresh-perspective.css';

export default function FreshPerspective({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--fp-primary', profile.colors?.[0] || '#7AE582');
    document.documentElement.style.setProperty('--fp-secondary', profile.colors?.[1] || '#2B2D42');
    document.documentElement.style.setProperty('--fp-accent', profile.colors?.[2] || '#EDF2F4');
  }, [profile.colors]);

  return (
    <div className="fp-template">
      <header className="fp-header">
        <h1>{profile.name}</h1>
        <p className="fp-headline">{profile.headline}</p>
      </header>

      <main className="fp-main">
        <section className="fp-bio">
          <h2>About</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="fp-skills">
          <h2>Skills</h2>
          <div className="fp-skills-tags">
            {profile.skills?.map((skill, i) => (
              <span key={i} className="fp-skill-tag">{skill}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
