"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserDetailContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Play, CheckCircle, Users, Clock, Star } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [showVideo, setShowVideo] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  };

  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Interviews",
      description: "Conduct intelligent interviews with our advanced AI recruiter"
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "Time Efficient",
      description: "Save hours of manual screening with automated interview process"
    },
    {
      icon: <Star className="h-8 w-8 text-purple-600" />,
      title: "Detailed Feedback",
      description: "Get comprehensive feedback and ratings for every candidate"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image 
                src="/logo1.png" 
                alt="SmartHire AI" 
                width={150} 
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex items-center gap-4">
              {loading ? (
                <div className="animate-pulse bg-gray-200 h-10 w-24 rounded-md"></div>
              ) : user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <Button onClick={() => router.push("/dashboard")}>
                    Dashboard
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={() => router.push("/auth")}>
                    Sign In
                  </Button>
                  <Button onClick={handleGetStarted}>
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              AI-Driven Interviews,
              <span className="text-blue-600 block">Hassle-Free Hiring</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your recruitment process with intelligent AI interviews. 
              Screen candidates efficiently, get detailed feedback, and make better hiring decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="px-8 py-4 text-lg"
              >
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowVideo(true)}
                className="px-8 py-4 text-lg"
              >
                <Play className="mr-2 h-5 w-5" /> Watch Demo
              </Button>
            </div>

            {/* Demo Video Section */}
            <div className="relative max-w-4xl mx-auto">
              {showVideo ? (
                <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="500"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your actual demo video
                    title="SmartHire AI Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px]"
                  ></iframe>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowVideo(false)}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <div 
                  className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden shadow-2xl cursor-pointer group"
                  onClick={() => setShowVideo(true)}
                >
                  <div className="aspect-video flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="bg-white/20 rounded-full p-6 mb-4 group-hover:bg-white/30 transition-colors">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">See SmartHire AI in Action</h3>
                      <p className="text-blue-100">Watch how our AI conducts professional interviews</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SmartHire AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your hiring process with cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies already using SmartHire AI
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
          >
            Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image 
              src="/logo1.png" 
              alt="SmartHire AI" 
              width={150} 
              height={50}
              className="h-10 w-auto mx-auto mb-4 filter brightness-0 invert"
            />
            <p className="text-gray-400">
              © 2025 SmartHire AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}