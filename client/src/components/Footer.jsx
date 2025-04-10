import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Club Info */}
          <div>
            <h3 className="text-xl font-bold mb-3">Titans Football Club</h3>
            <p className="text-sm">
              Our club is dedicated to providing a top-tier football experience, inspiring players to reach their full potential on and off the field.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm hover:text-gray-400">Home</a></li>
              <li><a href="/about" className="text-sm hover:text-gray-400">About</a></li>
              <li><a href="/players" className="text-sm hover:text-gray-400">Our Team</a></li>
              <li><a href="/activities" className="text-sm hover:text-gray-400">Activity</a></li>
              <li><a href="/tournaments" className="text-sm hover:text-gray-400">Tournaments</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-3">Contact</h3>
            <p className="text-sm">Email: <a href="mailto:info@tamperetitans.com" className="hover:text-gray-400">info@footballclub.com</a></p>
            <p className="text-sm">Phone: (+358) 417236446</p>
            <p className="text-sm">Hervanta, Tampere, Finland</p>
          </div>
        </div>

        {/* Sponsor Section */}
        <div className="mt-10 text-center">
          <h3 className="text-xl font-bold mb-3">Associated With</h3>
          <div className="flex justify-center gap-1">
            <a href="https://sponsor1.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/src/assets/sponsor-1.png"
                alt="Sponsor 1"
                className="w-32 h-12 object-contain hover:opacity-80 transition"
              />
            </a>
            <a href="https://sponsor2.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/src/assets/sponsor-2.png"
                alt="Sponsor 2"
                className="w-32 h-12 object-contain hover:opacity-80 transition"
              />
            </a>
            <a href="https://sponsor3.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/src/assets/sponsor-3.png"
                alt="Sponsor 3"
                className="w-32 h-12 object-contain hover:opacity-80 transition"
              />
            </a>
          </div>
        </div>


        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm">&copy; 2025 <a href="https://www.linkedin.com/in/aidul23/" target="_blank" rel="noopener noreferrer">Md Aidul Islam</a>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
