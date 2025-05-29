import { useEffect } from 'react';
import './styles/freelancer-focus.css';

export default function FreelancerFocus({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--ff-primary', profile.colors?.[0] || '#236B4E');
    document.documentElement.style.setProperty('--ff-secondary', profile.colors?.[1] || '#FFD700');
    document.documentElement.style.setProperty('--ff-accent', profile.colors?.[2] || '#C0C0C0');
  }, [profile.colors]);

  return (
    <div className="ff-template">
      <header className="ff-header">
        <h1>{profile.name}</h1>
        <p className="ff-headline">{profile.headline}</p>
      </header>

      <main className="ff-main">
        <section className="ff-about">
          <h2>About</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="ff-skills">
          <h2>Services</h2>
          <div className="ff-skill-cards">
            {profile.skills?.map((skill, i) => (
              <div key={i} className="ff-card">{skill}</div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
