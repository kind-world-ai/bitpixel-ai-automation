import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

// AI Agent/Tech themed images
// Custom images: save to /public/ai-agent-primary.png and /public/ai-agent-reveal.png
// Fallback to online images if custom ones aren't found
const PRIMARY_IMAGE = '/ai-agent-primary.png';
const REVEAL_IMAGE = '/ai-agent-reveal.png';
const LOGO_IMAGE = '/logo.png';

// Fallback images (used if custom images fail to load)
const FALLBACK_PRIMARY = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop&q=80';
const FALLBACK_REVEAL = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&h=1080&fit=crop&q=80';

// Brand colors
const NAVY_BLUE = '#001F3F';
const PURPLE = '#7C3AED';

interface BlobTrail {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

const InteractiveHomePage: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [blobPos, setBlobPos] = useState({ x: 0, y: 0 });
  const [blobTrails, setBlobTrails] = useState<BlobTrail[]>([]);
  const [invertedElements, setInvertedElements] = useState<Set<string>>(new Set());
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(true);
  const [primaryImg, setPrimaryImg] = useState(PRIMARY_IMAGE);
  const [revealImg, setRevealImg] = useState(REVEAL_IMAGE);

  const trailIdRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const lastTrailTimeRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const companyNameRef = useRef<HTMLDivElement>(null);
  const portfolioLinkRef = useRef<HTMLAnchorElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);

  // Smooth blob following with lag
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setBlobPos(prev => ({
        x: lerp(prev.x, mousePos.x, 0.1),
        y: lerp(prev.y, mousePos.y, 0.1)
      }));

      // Update parallax
      const parallaxFactor = 0.02;
      setParallaxOffset({
        x: -(mousePos.x - window.innerWidth / 2) * parallaxFactor,
        y: -(mousePos.y - window.innerHeight / 2) * parallaxFactor
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos]);

  // Mouse move handler with trail creation
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newMousePos = { x: e.clientX, y: e.clientY };
    setMousePos(newMousePos);

    // Calculate mouse speed
    const dx = newMousePos.x - lastMousePosRef.current.x;
    const dy = newMousePos.y - lastMousePosRef.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    // Create trail based on speed (throttled)
    const now = Date.now();
    if (now - lastTrailTimeRef.current > 30 && speed > 2) {
      const trailSize = Math.min(120 + speed * 2, 200);
      const newTrail: BlobTrail = {
        id: trailIdRef.current++,
        x: newMousePos.x,
        y: newMousePos.y,
        opacity: Math.min(speed / 50, 0.6),
        size: trailSize
      };

      setBlobTrails(prev => [...prev.slice(-8), newTrail]);
      lastTrailTimeRef.current = now;
    }

    lastMousePosRef.current = newMousePos;

    // Check if blob is over text elements
    checkBlobIntersection(newMousePos);
  }, []);

  // Check if blob intersects with text elements
  const checkBlobIntersection = (pos: { x: number; y: number }) => {
    const blobRadius = 150;
    const newInvertedElements = new Set<string>();

    const checkElement = (element: HTMLElement | null, id: string) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(pos.x - elementCenterX, 2) + Math.pow(pos.y - elementCenterY, 2)
      );

      if (distance < blobRadius + Math.max(rect.width, rect.height) / 2) {
        newInvertedElements.add(id);
      }
    };

    checkElement(companyNameRef.current, 'company-name');
    checkElement(portfolioLinkRef.current, 'portfolio-link');
    checkElement(socialIconsRef.current, 'social-icons');

    setInvertedElements(newInvertedElements);
  };

  // Fade out trails
  useEffect(() => {
    const interval = setInterval(() => {
      setBlobTrails(prev =>
        prev
          .map(trail => ({ ...trail, opacity: trail.opacity * 0.9 }))
          .filter(trail => trail.opacity > 0.05)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Hide hint after mouse movement or timeout
  useEffect(() => {
    const timeout = setTimeout(() => setShowHint(false), 4000);
    const handleFirstMove = () => setShowHint(false);

    window.addEventListener('mousemove', handleFirstMove, { once: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleFirstMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-none" style={{ backgroundColor: NAVY_BLUE }}>
      {/* Primary Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${primaryImg})`,
          transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
          transition: 'transform 0.1s ease-out',
          filter: 'brightness(0.85)' // Slightly darken for better text contrast
        }}
      >
        {/* Hidden image for error detection */}
        <img
          src={PRIMARY_IMAGE}
          alt=""
          style={{ display: 'none' }}
          onError={() => setPrimaryImg(FALLBACK_PRIMARY)}
        />
      </div>

      {/* Subtle gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, ${NAVY_BLUE}20 100%)`
        }}
      />

      {/* Animated Wave Lines Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        style={{
          transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)`
        }}
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={NAVY_BLUE} stopOpacity="0.4" />
            <stop offset="50%" stopColor={PURPLE} stopOpacity="0.5" />
            <stop offset="100%" stopColor={NAVY_BLUE} stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M 0 ${200 + i * 150} Q ${500 + mousePos.x * 0.05} ${150 + i * 150 + mousePos.y * 0.03}, ${1000} ${200 + i * 150} T ${2000} ${200 + i * 150}`}
            fill="none"
            stroke="url(#wave-gradient)"
            strokeWidth="2"
            opacity={0.6 - i * 0.1}
          >
            <animate
              attributeName="d"
              dur={`${15 + i * 2}s`}
              repeatCount="indefinite"
              values={`
                M 0 ${200 + i * 150} Q ${500} ${150 + i * 150}, ${1000} ${200 + i * 150} T ${2000} ${200 + i * 150};
                M 0 ${200 + i * 150} Q ${500} ${250 + i * 150}, ${1000} ${200 + i * 150} T ${2000} ${200 + i * 150};
                M 0 ${200 + i * 150} Q ${500} ${150 + i * 150}, ${1000} ${200 + i * 150} T ${2000} ${200 + i * 150}
              `}
            />
          </path>
        ))}
      </svg>

      {/* Blob Reveal Mask */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>

            <mask id="blob-mask">
              <rect width="100%" height="100%" fill="black" />

              {/* Main blob */}
              <circle
                cx={blobPos.x}
                cy={blobPos.y}
                r="150"
                fill="white"
                filter="url(#goo)"
              />

              {/* Trail blobs */}
              {blobTrails.map(trail => (
                <circle
                  key={trail.id}
                  cx={trail.x}
                  cy={trail.y}
                  r={trail.size}
                  fill="white"
                  opacity={trail.opacity}
                  filter="url(#goo)"
                />
              ))}
            </mask>
          </defs>
        </svg>

        {/* Reveal Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${revealImg})`,
            maskImage: 'url(#blob-mask)',
            WebkitMaskImage: 'url(#blob-mask)',
            transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
            transition: 'transform 0.1s ease-out',
            filter: 'brightness(1.1) saturate(1.2)' // Enhance reveal image
          }}
        >
          {/* Hidden image for error detection */}
          <img
            src={REVEAL_IMAGE}
            alt=""
            style={{ display: 'none' }}
            onError={() => setRevealImg(FALLBACK_REVEAL)}
          />
        </div>

        {/* SVG mask overlay for browser compatibility */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <image
            href={revealImg}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#blob-mask)"
          />
        </svg>
      </div>

      {/* Company Logo & Name - Top Left */}
      <div
        ref={companyNameRef}
        className="absolute top-8 left-8 z-20 transition-all duration-300"
        style={{
          transform: `translate(${parallaxOffset.x * 1.5}px, ${parallaxOffset.y * 1.5}px)`,
        }}
      >
        {/* Logo */}
        <img
          src={LOGO_IMAGE}
          alt="BitPixel Coders"
          className="w-48 md:w-64 mb-4 transition-all duration-300"
          style={{
            filter: invertedElements.has('company-name')
              ? `drop-shadow(0 0 20px ${PURPLE}) drop-shadow(0 0 40px ${PURPLE}80) brightness(1.2)`
              : 'brightness(1)',
          }}
        />
        {/* Tagline */}
        <div
          className="text-lg md:text-xl font-light tracking-wide"
          style={{
            color: invertedElements.has('company-name') ? 'white' : NAVY_BLUE,
            fontFamily: "'Poppins', sans-serif",
            textShadow: invertedElements.has('company-name')
              ? `0 0 20px ${PURPLE}, 0 0 40px ${PURPLE}80`
              : 'none'
          }}
        >
          AI Automation Experts
        </div>
      </div>

      {/* Portfolio Link - Top Right */}
      <a
        ref={portfolioLinkRef}
        href="/services"
        className="absolute top-12 right-12 z-20 text-2xl font-light transition-all duration-300 hover:opacity-70"
        style={{
          color: invertedElements.has('portfolio-link') ? 'white' : NAVY_BLUE,
          fontFamily: "'Poppins', sans-serif",
          transform: `translate(${parallaxOffset.x * 1.5}px, ${parallaxOffset.y * 1.5}px)`,
          textShadow: invertedElements.has('portfolio-link')
            ? `0 0 20px ${PURPLE}, 0 0 40px ${PURPLE}80`
            : 'none'
        }}
      >
        Portfolio
      </a>

      {/* Social Media Icons - Bottom Right */}
      <div
        ref={socialIconsRef}
        className="absolute bottom-12 right-12 z-20 flex gap-6"
        style={{
          transform: `translate(${parallaxOffset.x * 1.5}px, ${parallaxOffset.y * 1.5}px)`
        }}
      >
        {[
          { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
          { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter/X' },
          { Icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
          { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-110"
            aria-label={label}
            style={{
              color: invertedElements.has('social-icons') ? 'white' : NAVY_BLUE,
              filter: invertedElements.has('social-icons')
                ? `drop-shadow(0 0 10px ${PURPLE}) drop-shadow(0 0 20px ${PURPLE}80)`
                : 'none'
            }}
          >
            <Icon size={28} fill="currentColor" strokeWidth={0} />
          </a>
        ))}
      </div>

      {/* Interactive Hint - Center */}
      {showHint && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-center pointer-events-none"
          style={{
            animation: 'fadeIn 1s ease-in-out, fadeOut 1s ease-in-out 3s forwards'
          }}
        >
          <div
            className="text-xl md:text-2xl font-light tracking-wider mb-4"
            style={{
              color: 'white',
              fontFamily: "'Poppins', sans-serif",
              textShadow: `0 0 30px ${PURPLE}, 0 0 60px ${PURPLE}80, 0 2px 10px rgba(0,0,0,0.5)`
            }}
          >
            Move your cursor to explore
          </div>
          <div
            className="w-16 h-16 mx-auto rounded-full border-2 animate-pulse"
            style={{
              borderColor: PURPLE,
              boxShadow: `0 0 30px ${PURPLE}, 0 0 60px ${PURPLE}80`
            }}
          />
        </div>
      )}

      {/* Custom Cursor - Main Blob */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: blobPos.x,
          top: blobPos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="w-8 h-8 rounded-full border-2"
          style={{
            borderColor: PURPLE,
            boxShadow: `0 0 20px ${PURPLE}, 0 0 40px ${PURPLE}80`
          }}
        />
      </div>

      {/* Load Playfair Display font and animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -40%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default InteractiveHomePage;
