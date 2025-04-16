
import React from "react";

const Ford360Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="font-heading font-bold text-white">
        <span className="text-ford-blue">FORD</span>
        <span className="text-white">360</span>
      </div>
    </div>
  );
};

export default Ford360Logo;
