import React from 'react';
import { ParticleGridScene } from '../components/particle-grid/ParticleGridScene';

const ParticleGridExperience: React.FC = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      <ParticleGridScene />
    </div>
  );
};

export default ParticleGridExperience;
