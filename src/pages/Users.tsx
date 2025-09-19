import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { User, Mail, Save, Edit2 } from 'lucide-react';

const Users = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  return (
    <div>
    <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#393053] to-[#635985] font-sans relative overflow-hidden">
      {/* Abstract SVG or blob background */}
      <svg className="absolute top-0 left-0 w-full h-96 opacity-40 pointer-events-none" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="blobGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A3FFD6" />
            <stop offset="100%" stopColor="#5B8FB9" />
          </linearGradient>
        </defs>
        <path fill="url(#blobGradient)" fillOpacity="0.5" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
      </svg>
      <div className="container mx-auto px-4 py-12 max-w-2xl relative z-10">
        {/* Avatar with gradient blob */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, type: 'spring' }}
          className="flex flex-col items-center mb-10"
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#A3FFD6] via-[#5B8FB9] to-[#FFD6EC] blur-2xl opacity-70"></div>
            <div className="relative rounded-full border-4 border-[#A3FFD6] shadow-xl bg-white/10 backdrop-blur-lg">
              <User className="h-24 w-24 text-[#A3FFD6]" />
            </div>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-[#A3FFD6] tracking-tight drop-shadow-lg">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-lg text-[#FFD6EC]/80 mt-1">{user?.email}</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Card className="shadow-2xl bg-gradient-to-br from-[#393053]/80 via-[#635985]/80 to-[#18122B]/80 backdrop-blur-2xl border-none rounded-2xl mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2 text-[#A3FFD6]">
                    <User className="h-5 w-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription className="text-[#FFD6EC]/70">
                    Update your personal details and contact information.
                  </CardDescription>
                </div>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="transition-all border-[#A3FFD6] border text-[#A3FFD6] hover:bg-[#A3FFD6]/10 hover:scale-105"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[#FFD6EC]/80">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="transition-all bg-[#A3FFD6]/10 border-none focus:ring-2 focus:ring-[#A3FFD6] text-[#A3FFD6] placeholder:text-[#FFD6EC]/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[#FFD6EC]/80">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!isEditing}
                      className="transition-all bg-[#A3FFD6]/10 border-none focus:ring-2 focus:ring-[#A3FFD6] text-[#A3FFD6] placeholder:text-[#FFD6EC]/60"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#FFD6EC]/80">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3FFD6]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10 transition-all bg-[#A3FFD6]/10 border-none focus:ring-2 focus:ring-[#A3FFD6] text-[#A3FFD6] placeholder:text-[#FFD6EC]/60"
                    />
                  </div>
                </div>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex space-x-3"
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="transition-all bg-gradient-to-r from-[#A3FFD6] to-[#FFD6EC] text-[#18122B] font-bold shadow-lg hover:scale-105"
                    >
                      {isLoading ? (
                        <LoadingSpinner size="sm" text="Saving..." />
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="transition-all border-[#FFD6EC] border text-[#FFD6EC] hover:bg-[#FFD6EC]/10 hover:scale-105"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Information */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-br from-[#393053]/80 via-[#635985]/80 to-[#18122B]/80 backdrop-blur-2xl border-none rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#FFD6EC]">Account Information</CardTitle>
              <CardDescription className="text-[#A3FFD6]/70">
                View your account details and membership information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-[#A3FFD6]/30">
                  <span className="text-sm font-medium text-[#FFD6EC]/80">Account ID</span>
                  <span className="text-sm text-[#A3FFD6]/70 font-mono">
                    {user?.id}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#A3FFD6]/30">
                  <span className="text-sm font-medium text-[#FFD6EC]/80">Member Since</span>
                  <span className="text-sm text-[#A3FFD6]/70">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-[#FFD6EC]/80">Account Status</span>
                  <span className="text-sm font-bold text-[#A3FFD6]">
                    Active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default Users;