import React from 'react';

const VideoHeroSection: React.FC = () => {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#21346e' }}
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_044704_dd33cb15-c23f-4cfc-aa09-a0465d4dcb54.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 lg:pt-48">
        {/* Main Headline */}
        <h1
          className="text-white font-bold uppercase text-6xl sm:text-7xl md:text-8xl lg:text-[100px]"
          style={{
            fontFamily: "'Rubik', sans-serif",
            lineHeight: '0.98',
            letterSpacing: '-2px',
          }}
        >
          <div style={{ letterSpacing: '-4px' }}>NEW ERA</div>
          <div style={{ letterSpacing: '-4px' }}>OF DESIGN</div>
          <div style={{ letterSpacing: '-4px' }}>STARTS NOW</div>
        </h1>

        {/* Custom CTA Button */}
        <div className="mt-12 md:mt-16">
          <button
            className="relative group"
            style={{ width: '184px', height: '65px' }}
            aria-label="Get Started"
          >
            {/* SVG Button Background */}
            <svg
              className="absolute inset-0 w-full h-full transition-transform duration-200 group-hover:scale-105 group-active:scale-95"
              viewBox="0 0 184 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 8C0 3.58172 3.58172 0 8 0H176C180.418 0 184 3.58172 184 8V57C184 61.4183 180.418 65 176 65H8C3.58172 65 0 61.4183 0 57V8Z"
                fill="white"
              />
            </svg>

            {/* Button Text */}
            <span
              className="relative z-10 font-bold uppercase"
              style={{
                fontFamily: "'Rubik', sans-serif",
                fontSize: '20px',
                color: '#161a20',
              }}
            >
              GET STARTED
            </span>
          </button>
        </div>
      </div>

      {/* Load Rubik Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  );
};

export default VideoHeroSection;
