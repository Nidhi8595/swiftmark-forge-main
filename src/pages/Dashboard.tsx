import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { bookmarkAPI } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Bookmark, User, Plus, ArrowRight, Calendar, ExternalLink } from 'lucide-react';

interface BookmarkItem {
  id: string;
  title: string;
  link: string;
  description?: string;
  createdAt: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentBookmarks();
  }, []);

  const fetchRecentBookmarks = async () => {
    try {
      const response = await bookmarkAPI.getAll();
      // Get the 5 most recent bookmarks
      const recentBookmarks = response.data.slice(0, 5);
      setBookmarks(recentBookmarks);
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Manage Profile',
      description: 'Update your personal information and settings',
      icon: User,
      link: '/users',
      color: 'bg-blue-700'
    },
    {
      title: 'View All Bookmarks',
      description: 'Browse and manage your complete bookmark collection',
      icon: Bookmark,
      link: '/bookmarks',
      color: 'bg-green-500'
    },
    {
      title: 'Add New Bookmark',
      description: 'Save a new website to your collection to visit anytime you need',
      icon: Plus,
      link: '/bookmarks?add=true',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-300">
      <div className="container px-10 py-8 pb-40">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl pt-3 font-bold mb-2">
                Welcome back, {user?.firstName || user?.email?.split('@')[0] || 'User'}! 👋
              </h1>
              <p className="text-accent-foreground">
                Here's what's happening with your bookmarks today.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/bookmarks">
                <Button className="group transition-smooth rounded-xl hover:bg-blue-900">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Bookmark
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl scale-y-110 font-semibold pt-3 ml-3 mb-5">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to={action.link}>
                    <Card className="cursor-pointer hover:shadow-2xl shadow-xl hover:bg-blue-900 hover:text-white  transition-smooth group rounded-2xl">
                      <CardContent className="p-8 ">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg mr-2 ${action.color} bg-opacity-70`}>
                            <Icon className={`h-6 w-6 ${action.color.replace('bg-', 'text-')}`} />
                          </div>
                          <div className="flex-1 ">
                            <h3 className="font-semibold mb-1 group-hover:text-white transition-smooth">
                              {action.title}
                            </h3>
                            <p className="text-sm text-muted-foreground group-hover:text-white transition-smooth">
                              {action.description}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Bookmarks */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between pt-6 mb-6">
            <h2 className="text-xl ml-3 font-semibold scale-y-110">Recent Bookmarks</h2>
            <Link to="/bookmarks">
              <Button variant="outline" size="sm" className="transition-smooth hover:bg-blue-900 hover:text-white mr-5">
                View All
              </Button>
            </Link>
          </div>

          {loading ? (
            <Card>
              <CardContent className="p-6">
                <LoadingSpinner text="Loading recent bookmarks..." />
              </CardContent>
            </Card>
          ) : bookmarks.length > 0 ? (
            <div className="space-y-3">
              {bookmarks.map((bookmark, index) => (
                <motion.div
                  key={bookmark.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="rounded-xl shadow-xl text-white hover:shadow-2xl transition-smooth group bg-blue-900 hover:bg-white">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <Bookmark className=" h-8 w-8 text-blue-500 flex-shrink-0 fill-white group-hover:fill-none group-hover:text-primary" />
                            <div className="min-w-0">
                              <h3 className="font-medium truncate group-hover:text-primary transition-smooth">
                                {bookmark.title}
                              </h3>
                              {bookmark.description && (
                                <p className="text-sm text-white/70 group-hover:text-muted-foreground truncate  mt-1">
                                  {bookmark.description}
                                </p>
                              )}
                              <div className="flex items-center space-x-4 mt-2 text-xs text-white group-hover:text-muted-foreground">
                                <div className="flex items-center space-x-2 ">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(bookmark.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <a
                            href={bookmark.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-blue-300 rounded-md transition-smooth group-hover:text-muted-foreground"
                          >
                            <ExternalLink className="h-6 w-6" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start building your collection by adding your first bookmark.
                </p>
                <Link to="/bookmarks">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Bookmark
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;