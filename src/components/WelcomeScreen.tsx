"use client";

import { useEffect, useState, useRef } from "react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [countdown, setCountdown] = useState(10);
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onCompleteRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []); 

  return (
    <main className="h-screen w-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center">
      <div className="text-center text-white mx-auto px-8">
        <h1 className="text-8xl font-bold text-red-600 mb-8">
          113
        </h1>
        <p className="text-2xl text-red-300 mb-4">
          Accès en cours...
        </p>
        <div className="text-4xl font-mono text-red-400">
          {countdown}
        </div>
      </div>
    </main>
  );
}
