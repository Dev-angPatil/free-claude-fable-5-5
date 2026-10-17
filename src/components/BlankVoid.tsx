import React, { useState, useEffect } from 'react';
import { NotificationToast } from './NotificationToast';

interface BlankVoidProps {
  onClaim: () => void;
}

export const BlankVoid: React.FC<BlankVoidProps> = ({ onClaim }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Start with a completely blank white page, then reveal notification toast from bottom right
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden select-none">
      {/* Blank white canvas — initially completely empty */}
      {showNotification && (
        <NotificationToast onClaim={onClaim} />
      )}
    </div>
  );
};
