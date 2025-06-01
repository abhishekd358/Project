import React from 'react'
const Home = () => {
  return (
    <>
  <header className="hero-banner">
    <h1>Securely Manage Your Contacts</h1>
    <p>Simple, fast, and secure phonebook you can access anytime.</p>
    <a href="register.html" className="cta-button">Get Started</a>
  </header>

  <section className="features-section">
    <h2>Why Choose Phonebook?</h2>
    <div className="feature-cards">
      <div className="feature-card">
        <h3>🔒 Security</h3>
        <p>Your contacts are encrypted and safely stored.</p>
      </div>
      <div className="feature-card">
        <h3>⚡ Speed</h3>
        <p>Fast and responsive interface across all devices.</p>
      </div>
      <div className="feature-card">
        <h3>📲 Accessibility</h3>
        <p>Access your contacts anytime, anywhere on any device.</p>
      </div>
      <div className="feature-card">
        <h3>🛠️ Easy Management</h3>
        <p>Add, edit, and organize contacts effortlessly.</p>
      </div>
    </div>
  </section>

  {/* Testimonal */}
  <section className="testimonials-section" id="testimonials">
    <h2>What Our Users Say</h2>
    <div className="testimonial-cards">
      <div className="testimonial-card">
        <p>"This app saved my life! I never lose a contact anymore."</p>
        <h4>- Aditi, Freelancer</h4>
      </div>
      <div className="testimonial-card">
        <p>"I love how secure and fast the Phonebook app is. Highly recommend!"</p>
        <h4>- Raj, Business Owner</h4>
      </div>
      <div className="testimonial-card">
        <p>"The best contact manager I've used. Simple and elegant."</p>
        <h4>- Priya, Designer</h4>
      </div>
    </div>
  </section>

</>
  )
}

export default Home