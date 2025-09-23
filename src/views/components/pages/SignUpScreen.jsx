import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, Target, User } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

const SignupScreen = ({ onSignupSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          y: particle.y <= -10 ? 110 : particle.y - particle.speed * 0.1,
          x: particle.x + Math.sin(particle.y * 0.01) * 0.1
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} signup clicked`);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log('Google signup successful:', credentialResponse);
      alert('Google signup successful!');
      onSignupSuccess();
    },
    onError: () => {
      console.log('Google Signup Failed');
      alert('Google signup failed. Please try again.');
    }
  });

  const handleUserSignup = async () => {
    // Validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting signup...');
      
      const res = await axios.post('http://localhost:5000/signup', {
        email: formData.email,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response:', res.data);

      if (res.status === 200 && res.data.status === 'success') {
        alert('Account created successfully!');
        onSignupSuccess();
      } else {
        alert(res.data.message || 'Signup failed. Please try again.');
      }

    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.error || 'Signup failed';
        
        if (status === 400) {
          alert('Invalid input. Please check your information.');
        } else if (status === 409) {
          alert('An account with this email already exists.');
        } else {
          alert(`Signup failed: ${message}`);
        }
      } else {
        alert('Unable to connect to server. Please check if the server is running.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: '0 0 6px currentColor'
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <SignupCard 
          formData={formData}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleUserSignup={handleUserSignup}
          handleSocialLogin={handleSocialLogin}
          setShowPassword={setShowPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          onSignupSuccess={onSignupSuccess}
          onSwitchToLogin={onSwitchToLogin}
          googleLogin={googleLogin}
        />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

// Signup Card Component
const SignupCard = ({ 
  formData, 
  showPassword, 
  showConfirmPassword,
  isLoading, 
  handleInputChange, 
  handleUserSignup, 
  handleSocialLogin,
  setShowPassword,
  setShowConfirmPassword,
  onSignupSuccess,
  onSwitchToLogin,
  googleLogin
}) => {
  return (
    <div className="w-full max-w-md">
      {/* Logo/Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mb-4 shadow-lg shadow-cyan-500/25">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          YOLO Vision Studio
        </h1>
        <p className="text-gray-400">Join the neural interface</p>
      </div>

      {/* Signup Card */}
      <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Email Field */}
          <div className="relative group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300 hover:border-gray-500"
                placeholder="Enter your email"
                required
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 via-cyan-400/0 to-cyan-400/0 group-focus-within:from-cyan-400/20 group-focus-within:via-purple-400/20 group-focus-within:to-pink-400/20 transition-all duration-500 -z-10"></div>
            </div>
          </div>

          {/* Password Field */}
          <div className="relative group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300 hover:border-gray-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 via-cyan-400/0 to-cyan-400/0 group-focus-within:from-cyan-400/20 group-focus-within:via-purple-400/20 group-focus-within:to-pink-400/20 transition-all duration-500 -z-10"></div>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="relative group">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300 hover:border-gray-500"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 via-cyan-400/0 to-cyan-400/0 group-focus-within:from-cyan-400/20 group-focus-within:via-purple-400/20 group-focus-within:to-pink-400/20 transition-all duration-500 -z-10"></div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center text-sm">
            <label className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                required
              />
              <div className="relative">
                <div className="w-4 h-4 bg-gray-700 border border-gray-600 rounded"></div>
                <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="ml-2">I agree to the <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms & Conditions</a></span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleUserSignup}
            disabled={isLoading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <div className="relative z-10 flex items-center justify-center">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900/40 text-gray-400">or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => googleLogin()}
            className="flex items-center justify-center px-4 py-3 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:border-cyan-400/50 hover:text-white transition-all duration-300 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button 
            onClick={() => handleSocialLogin('github')}
            className="flex items-center justify-center px-4 py-3 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:border-cyan-400/50 hover:text-white transition-all duration-300 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.986C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
            GitHub
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-medium"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupScreen;