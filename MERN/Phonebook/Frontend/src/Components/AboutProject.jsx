import React from 'react';

const AboutProject = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>📱 Phonebook Web App</h1>
        <p>A simple full-stack phonebook project built by <strong>Abhishek D</strong>.</p>
      </section>

      <section className="about-section">
        <h2>🛠 How It Works</h2>
        <p>
          This app lets users register, log in, and manage their personal phonebook contacts. Data is securely stored on the backend, and user sessions are maintained using local storage to keep you logged in even after refreshing.
        </p>
      </section>

      <section className="about-section">
        <h2>💻 Technologies Used</h2>
        <ul>
          <li>React.js (Frontend)</li>
          <li>Node.js & Express (Backend)</li>
          <li>MongoDB (Database)</li>
          <li>Axios (API Requests)</li>
          <li>React Router (Routing & Navigation)</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>👨‍💻 About the Creator</h2>
        <p>
          This project was created by <strong>Abhishek D</strong>. I’m passionate about building practical full-stack applications and improving user experiences.
        </p>
      </section>

      <section className="about-section">
        <h2>📬 Contact & Support</h2>
        <p>
          Have questions or issues? Feel free to reach out or open an issue on GitHub: <br />
          <div className='git'>
          <a href="https://github.com/abhishekd358/" target="_blank" rel="noopener noreferrer">
            github.com/abhisehk358
          </a>
          </div>
        </p>
      </section>
    </div>
  );
};

export default AboutProject;
