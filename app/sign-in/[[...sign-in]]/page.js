// app/sign-in/page.js

"use client";

import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Add animation after component mounts
    setLoaded(true);
  }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full overflow-hidden bg-black">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-full h-full">
          {Array(20)
            .fill()
            .map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-cyan-500"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                  animation: `float ${
                    Math.random() * 10 + 10
                  }s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
        </div>
      </div>

      {/* Glowing circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Container for sign-in box */}
      <div
        className={`relative z-10 w-full max-w-md transition-all duration-1000 transform ${
          loaded ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div className="p-8 rounded-xl bg-gray-900/80 backdrop-blur-md border border-gray-800 shadow-2xl">
          {/* Title section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-cyan-300/60 mt-2">
              Sign in to continue your journey
            </p>
          </div>

          {/* Custom flame button */}
          <div className="relative flex justify-center mb-6">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 opacity-70 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

              {/* Animated flames container */}
              <div className="absolute -bottom-3 left-0 right-0 flex justify-center">
                {Array(7)
                  .fill()
                  .map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-6 h-12 bg-cyan-400"
                      style={{
                        left: `${i * 15 + 10}%`,
                        filter: "blur(8px)",
                        borderRadius: "50% 50% 20% 20%",
                        opacity: 0.8,
                        animation: `flicker ${
                          Math.random() * 2 + 1
                        }s ease-in-out ${i * 0.1}s infinite alternate`,
                        transform: "scaleY(0.6)",
                      }}
                    ></div>
                  ))}
              </div>

              {/* Sign In button */}
              <button
                className="relative inline-flex items-center justify-center w-full px-8 py-3 text-lg font-medium text-white transition-all duration-200 bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                onClick={() => {}}
              >
                Sign In with Clerk
              </button>
            </div>
          </div>

          {/* Clerk SignIn component */}
          <div className="mt-4">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton:
                    "bg-gray-800 hover:bg-gray-700 border-gray-700 text-white",
                  socialButtonsBlockButtonText: "text-white font-normal",
                  dividerLine: "bg-gray-700",
                  dividerText: "text-gray-400",
                  formFieldLabel: "text-cyan-300",
                  formFieldInput:
                    "bg-gray-800 border-gray-700 text-white focus:border-cyan-500",
                  formButtonPrimary: "hidden", // We're using our custom button above
                  footerActionText: "text-gray-400",
                  footerActionLink: "text-cyan-400 hover:text-cyan-300",
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }

        @keyframes flicker {
          0%,
          18%,
          22%,
          25%,
          53%,
          57%,
          100% {
            height: 12px;
            opacity: 0.8;
          }
          20%,
          24%,
          55% {
            height: 16px;
            opacity: 0.9;
          }
          40%,
          42%,
          60%,
          80% {
            height: 8px;
            opacity: 0.6;
          }
        }

        @keyframes blob {
          0% {
            transform: scale(1) translate(0px, 0px);
          }
          33% {
            transform: scale(1.1) translate(30px, -50px);
          }
          66% {
            transform: scale(0.9) translate(-20px, 20px);
          }
          100% {
            transform: scale(1) translate(0px, 0px);
          }
        }

        .animate-blob {
          animation: blob 10s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
