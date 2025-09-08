import React from 'react';
import { PulsingBorder } from '@paper-design/shaders-react';

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <PulsingBorder
        colors={['#4c1d95', '#7c3aed', '#eab308']}
        speed={0.5}
        intensity={0.4}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.3,
        }}
      />
    </div>
  );
};

export default HeroBackground;