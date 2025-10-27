
import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-md mx-auto">
        <BackButton />
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-mks-dark text-center mb-6">Account Login</h1>
            <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-mks-dark">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="mt-1 block w-full px-3 py-2 bg-white text-mks-dark border border-mks-gray/50 rounded-md shadow-sm focus:outline-none focus:ring-mks-red focus:border-mks-red sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-mks-dark">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="mt-1 block w-full px-3 py-2 bg-white text-mks-dark border border-mks-gray/50 rounded-md shadow-sm focus:outline-none focus:ring-mks-red focus:border-mks-red sm:text-sm"
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-mks-red focus:ring-mks-red border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-mks-dark">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <Link to="#" className="font-medium text-mks-red hover:text-mks-red/80">
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div>
                    <Button type="submit" variant="primary" size="lg" className="w-full">
                        Sign In
                    </Button>
                </div>
            </form>
             <div className="mt-6 text-center text-sm text-mks-gray">
                <p>
                    Don't have an account?{' '}
                    <Link to="#" className="font-medium text-mks-red hover:text-mks-red/80">
                        Create one now
                    </Link>
                </p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
