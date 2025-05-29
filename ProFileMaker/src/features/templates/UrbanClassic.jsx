import { useEffect } from 'react';
import './styles/urban-classic.css';

export default function UrbanClassic({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--uc-primary', profile.colors?.[0] || '#22223B');
    document.documentElement.style.setProperty('--uc-secondary', profile.colors?.[1] || '#F2E9E4');
    document.documentElement.style.setProperty('--uc-accent', profile.colors?.[2] || '#4A4E69');
  }, [profile.colors]);

  return (
    <div className="uc-template">
      <header className="uc-header">
        <h1>{profile.name}</h1>
        <p className="uc-headline">{profile.headline}</p>
      </header>

      <main className="uc-main">
        <section className="uc-about">
          <h2>About</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="uc-skills">
          <h2>Skills</h2>
          <ul className="uc-skills-list">
            {profile.skills?.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
