import React from 'react';
import { NeuroNoise } from '@paper-design/shaders-react';

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <NeuroNoise
        colorFront="#ffffff"
        colorMid="#47a6ff"
        colorBack="#000000"
        brightness={0.05}
        contrast={0.3}
        speed={1}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default HeroBackground;