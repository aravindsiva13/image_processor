import React, { useState } from 'react';
import { Eye, EyeOff, Target } from 'lucide-react';
import { apiService } from 'D:/yolo_web_app/yolo_web_app/src/services/ApiService.js';
import axios from 'axios';
const LoginPage = ({onLoginSuccess}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Add your login logic here
      console.log('Login attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful login
      alert('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
    // Add social login logic here
  };
  const handleUserLogin =async ()=>{
    if(!formData.email || !formData.password){
        alert('Please enter both email and password.');
        return;
    }
    var data=new FormData();
    data.append('username',formData.email);
    data.append('password',formData.password);

   const res=await axios.post('http://127.0.0.1:5000/login',formData).then(response=>response.data
    ,onLoginSuccess()
   ).catch(error=>{
        console.error('Login error:',error);
        // alert('Login failed. Please try again.');
   });
    if(res.success){
        alert('Login successful!');
        onLoginSuccess();
    }else{
        alert('Login failed. Please try again.');
    }
    
  }
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large floating shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-blue-300/15 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-indigo-400/20 rounded-full blur-xl animate-float"></div>
        
        {/* Abstract geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-lg rotate-45 animate-float-rotate"></div>
        <div className="absolute top-3/4 right-1/4 w-12 h-12 bg-gradient-to-r from-indigo-400/30 to-blue-400/30 rounded-lg rotate-12 animate-float-rotate-reverse"></div>
        
        {/* Chain-like decorative elements */}
        <div className="absolute top-1/2 left-8 flex flex-col gap-2">
          <div className="w-8 h-4 bg-blue-300/20 rounded-full transform rotate-45"></div>
          <div className="w-8 h-4 bg-blue-300/20 rounded-full transform -rotate-45"></div>
          <div className="w-8 h-4 bg-blue-300/20 rounded-full transform rotate-45"></div>
        </div>
        
        <div className="absolute bottom-1/3 right-8 flex flex-col gap-2">
          <div className="w-6 h-3 bg-cyan-300/20 rounded-full transform rotate-30"></div>
          <div className="w-6 h-3 bg-cyan-300/20 rounded-full transform -rotate-30"></div>
          <div className="w-6 h-3 bg-cyan-300/20 rounded-full transform rotate-30"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Glass Card */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Card Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Logo Section */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-sm text-white/80 font-medium">YOLO Vision Studio</h2>
              </div>

              {/* Login Title */}
              <h1 className="text-3xl font-bold text-white mb-8 text-center">Login</h1>

              {/* Login Form */}
              <form  className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="username@gmail.com"
                    className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full px-4 py-3 pr-12 bg-white/90 border border-white/30 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(true)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  onClick={()=>handleUserLogin()}
                  disabled={isLoading}
                  className="w-full bg-gray-800/80 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 backdrop-blur-sm border border-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>

                {/* Or Continue With */}
                <div className="text-center">
                  <p className="text-sm text-white/70 mb-4">or continue with</p>
                  
                  {/* Social Login Buttons */}
                  <div className="flex gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('google')}
                      className="flex items-center justify-center w-12 h-12 bg-white/90 hover:bg-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('github')}
                      className="flex items-center justify-center w-12 h-12 bg-white/90 hover:bg-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5" fill="#24292e" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('facebook')}
                      className="flex items-center justify-center w-12 h-12 bg-white/90 hover:bg-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Register Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-white/70">
                    Don't have an account yet?{' '}
                    <button
                      type="button"
                      className="text-white font-medium hover:underline transition-all"
                    >
                      Register for free
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes float-rotate {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-10px) rotate(90deg); }
        }
        
        @keyframes float-rotate-reverse {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-8px) rotate(-12deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-rotate {
          animation: float-rotate 5s ease-in-out infinite;
        }
        
        .animate-float-rotate-reverse {
          animation: float-rotate-reverse 7s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;