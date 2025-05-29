import { useEffect } from 'react';
import './styles/nonprofit-impact.css';

export default function NonprofitImpact({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--ni-primary', profile.colors?.[0] || '#FFE156');
    document.documentElement.style.setProperty('--ni-secondary', profile.colors?.[1] || '#6A0572');
    document.documentElement.style.setProperty('--ni-accent', profile.colors?.[2] || '#F5F5F5');
  }, [profile.colors]);

  return (
    <div className="ni-template">
      <header className="ni-header">
        <h1>{profile.name}</h1>
        <p className="ni-tagline">{profile.headline}</p>
      </header>

      <main className="ni-main">
        <section className="ni-about">
          <h2>About</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="ni-skills">
          <h2>Focus Areas</h2>
          <div className="ni-skill-list">
            {profile.skills?.map((skill, i) => (
              <span key={i} className="ni-skill">{skill}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
