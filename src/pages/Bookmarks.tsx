import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { bookmarkAPI } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from '@/hooks/use-toast';
import {
  Bookmark,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  Search,
  Calendar,
  Link as LinkIcon,
  Star,
  FolderOpen,
  Share2,
  Copy
} from 'lucide-react';

interface BookmarkItem {
  id: string;
  title: string;
  link: string;
  description?: string;
  createdAt: string;
  favorite?: boolean;
  tags?: string[];
}

const TAG_COLORS = [
  "bg-blue-200 text-blue-800",
  "bg-yellow-200 text-yellow-800",
  "bg-green-200 text-green-800",
  "bg-pink-200 text-pink-800",
  "bg-purple-200 text-purple-800",
  "bg-orange-200 text-orange-800",
];

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<BookmarkItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    description: '',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showTagFilter, setShowTagFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  useEffect(() => {
    let filtered = bookmarks;
    if (showFavorites) {
      filtered = filtered.filter(b => b.favorite);
    }
    if (showTagFilter) {
      filtered = filtered.filter(b => b.tags?.includes(showTagFilter));
    }
    filtered = filtered.filter(bookmark =>
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.link.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bookmark.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredBookmarks(filtered);
  }, [bookmarks, searchQuery, showFavorites, showTagFilter]);

  const fetchBookmarks = async () => {
    try {
      const response = await bookmarkAPI.getAll();
      setBookmarks(response.data.map((b: BookmarkItem) => ({
        ...b,
        favorite: b.favorite ?? false,
        tags: b.tags ?? [],
      })));
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
      toast({
        title: "Error",
        description: "Failed to load bookmarks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tagsArr = formData.tags
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];
      if (editingBookmark) {
        const response = await bookmarkAPI.update(editingBookmark.id, {
          ...formData,
          tags: tagsArr,
        });
        setBookmarks(prev => prev.map(b =>
          b.id === editingBookmark.id ? { ...response.data, favorite: b.favorite } : b
        ));
        setIsEditDialogOpen(false);
        toast({
          title: "Success",
          description: "Bookmark updated successfully.",
        });
      } else {
        const response = await bookmarkAPI.create({
          ...formData,
          tags: tagsArr,
        });
        setBookmarks(prev => [{ ...response.data, favorite: false }, ...prev]);
        setIsAddDialogOpen(false);
        toast({
          title: "Success",
          description: "Bookmark added successfully.",
        });
      }
      setFormData({ title: '', link: '', description: '', tags: '' });
      setEditingBookmark(null);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Operation failed';
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (bookmark: BookmarkItem) => {
    setEditingBookmark(bookmark);
    setFormData({
      title: bookmark.title,
      link: bookmark.link,
      description: bookmark.description || '',
      tags: (bookmark.tags || []).join(', '),
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bookmark?')) {
      return;
    }
    try {
      await bookmarkAPI.delete(id);
      setBookmarks(prev => prev.filter(b => b.id !== id));
      toast({
        title: "Success",
        description: "Bookmark deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete bookmark. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({ title: '', link: '', description: '', tags: '' });
    setEditingBookmark(null);
  };

  const handleFavorite = (id: string) => {
    setBookmarks(prev =>
      prev.map(b =>
        b.id === id ? { ...b, favorite: !b.favorite } : b
      )
    );
  };

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Bookmark link copied to clipboard.",
    });
  };

  const handleShare = (bookmark: BookmarkItem) => {
    if (navigator.share) {
      navigator.share({
        title: bookmark.title,
        url: bookmark.link,
        text: bookmark.description,
      });
    } else {
      handleCopy(bookmark.link);
    }
  };

  const allTags = Array.from(
    new Set(bookmarks.flatMap(b => b.tags || []))
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-teal-100">
      <div className=" mx-10 pb-40 px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-5">
              <motion.div
                initial={{ rotate: -8, scale: 0.95 }}
                animate={{ rotate: [0, -8, 8, 0], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative p-4 rounded-3xl bg-gradient-to-tr from-blue-200 via-teal-100 to-yellow-100 shadow-lg"
              >
                <span className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full opacity-70 animate-pulse" />
                <span className="absolute -bottom-2 -right-2 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-bounce" />
                <svg width="60" height="60" viewBox="0 0 56 56" fill="none" className="hover:scale-110 transition-transform duration-300">
                  <defs>
                    <linearGradient id="bookmarkBody" x1="12" y1="6" x2="44" y2="50" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3B82F6" />
                      <stop offset="1" stopColor="#06B6D4" />
                    </linearGradient>
                    <linearGradient id="bookmarkAccent" x1="16" y1="8" x2="40" y2="46" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FBBF24" />
                      <stop offset="1" stopColor="#FDE68A" />
                    </linearGradient>
                  </defs>
                  <rect x="12" y="6" width="32" height="44" rx="8" fill="url(#bookmarkBody)" />
                  <path d="M16 10C16 8.89543 16.8954 8 18 8H38C39.1046 8 40 8.89543 40 10V46L28 38L16 46V10Z" fill="url(#bookmarkAccent)" />
                  <ellipse cx="28" cy="20" rx="4" ry="2" fill="#FFF" />
                  <circle cx="24" cy="18" r="1" fill="#333" />
                  <circle cx="32" cy="18" r="1" fill="#333" />
                  <path d="M24 22 Q28 25 32 22" stroke="#333" strokeWidth="1.2" fill="none" />
                  <circle cx="44" cy="12" r="2" fill="#FBBF24" opacity="0.7" />
                </svg>
              </motion.div>
              <div>
                <h1 className="text-4xl font-extrabold mb-1 pb-2 bg-gradient-to-r from-blue-700 via-yellow-500 to-teal-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                  My Bookmarks
                </h1>
                <div className="flex items-center space-x-2 ml-1">
                  <span className="text-base font-medium text-black/70">
                    {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold animate-fade-in">
                    <Bookmark className="h-4 w-4 mr-1" /> Saved
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFavorites ? "default" : "outline"}
                className="transition-smooth"
                onClick={() => setShowFavorites(fav => !fav)}
              >
                <Star className={`mr-2 h-4 w-4 ${showFavorites ? "text-yellow-500" : "text-gray-400"}`} />
                {showFavorites ? "Show All" : "Favorites"}
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="transition-smooth" onClick={resetForm}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Bookmark
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Bookmark</DialogTitle>
                  </DialogHeader>
                  <BookmarkForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    isEditing={false}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 flex flex-wrap gap-2"
          >
            <span className="font-medium text-sm text-muted-foreground flex items-center">
              <FolderOpen className="h-4 w-4 mr-1" /> Tags:
            </span>
            <Button
              size="sm"
              variant={!showTagFilter ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setShowTagFilter(null)}
            >
              All
            </Button>
            {allTags.map((tag, i) => (
              <Button
                key={tag}
                size="sm"
                variant={showTagFilter === tag ? "default" : "outline"}
                className={`rounded-full ${TAG_COLORS[i % TAG_COLORS.length]}`}
                onClick={() => setShowTagFilter(tag)}
              >
                #{tag}
              </Button>
            ))}
          </motion.div>
        )}

        {/* Search */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search bookmarks, tags, descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 transition-smooth"
            />
          </div>
        </motion.div>

        {/* Bookmarks Grid */}
        {loading ? (
          <Card>
            <CardContent className="p-8">
              <LoadingSpinner text="Loading bookmarks..." />
            </CardContent>
          </Card>
        ) : filteredBookmarks.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid pt-4 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredBookmarks.map((bookmark, index) => (
                <motion.div
                  key={bookmark.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <Card className={`h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-100 via-white to-yellow-100 border-0 relative overflow-hidden group cursor-pointer`}>
                    <motion.div
                      className="absolute -top-6 -left-6 z-0"
                      animate={{ y: [0, 10, 0], rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    >
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="30" fill="#3B82F6" fillOpacity="0.12" />
                      </svg>
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-8 -right-8 z-0"
                      animate={{ x: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                    >
                      <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                        <rect x="0" y="0" width="70" height="70" rx="35" fill="#FBBF24" fillOpacity="0.10" />
                      </svg>
                    </motion.div>
                    <CardContent className="relative z-10 p-7">
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          initial={{ rotate: -10, scale: 1 }}
                          animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="bg-gradient-to-tr from-yellow-200 via-blue-200 to-white rounded-full p-2 shadow-lg"
                        >
                          <svg width="32" height="32" viewBox="0 0 56 56" fill="none">
                            <rect x="12" y="6" width="32" height="44" rx="6" fill="#3B82F6" />
                            <path d="M16 10C16 8.89543 16.8954 8 18 8H38C39.1046 8 40 8.89543 40 10V46L28 38L16 46V10Z" fill="#FBBF24" />
                            <ellipse cx="28" cy="20" rx="4" ry="2" fill="#FFF" />
                            <circle cx="24" cy="18" r="1" fill="#333" />
                            <circle cx="32" cy="18" r="1" fill="#333" />
                            <path d="M24 22 Q28 25 32 22" stroke="#333" strokeWidth="1.2" fill="none" />
                          </svg>
                        </motion.div>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFavorite(bookmark.id)}
                            className="h-8 w-8 p-0 hover:bg-yellow-100"
                            aria-label={bookmark.favorite ? "Unfavorite" : "Favorite"}
                          >
                            <Star className={`h-4 w-4 ${bookmark.favorite ? "text-yellow-500 fill-yellow-400" : "text-gray-400"}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(bookmark)}
                            className="h-8 w-8 p-0 hover:bg-blue-100"
                          >
                            <Edit2 className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(bookmark.id)}
                            className="h-8 w-8 p-0 hover:bg-yellow-100 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShare(bookmark)}
                            className="h-8 w-8 p-0 hover:bg-blue-50"
                          >
                            <Share2 className="h-4 w-4 text-blue-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(bookmark.link)}
                            className="h-8 w-8 p-0 hover:bg-blue-50"
                          >
                            <Copy className="h-4 w-4 text-blue-400" />
                          </Button>
                        </div>
                      </div>
                      <div className="mb-6 relative">
                        <h3 className="font-extrabold text-xl mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                          {bookmark.title}
                        </h3>
                        <motion.div
                          className="absolute left-0 -bottom-3 h-1 pt-2 rounded-full bg-gradient-to-r from-blue-400 via-yellow-300 to-blue-400"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.2, delay: 0.2 }}
                        />
                      </div>
                      {bookmark.tags && bookmark.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {bookmark.tags.map((tag, i) => (
                            <span
                              key={tag}
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${TAG_COLORS[i % TAG_COLORS.length]} cursor-pointer hover:brightness-110`}
                              onClick={() => setShowTagFilter(tag)}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {bookmark.description && (
                        <motion.p
                          className="text-muted-foreground text-sm mb-4 line-clamp-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.3 }}
                        >
                          {bookmark.description}
                        </motion.p>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(bookmark.createdAt).toLocaleDateString()}</span>
                        </div>
                        <motion.a
                          href={bookmark.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-600 font-semibold hover:underline text-sm transition-all duration-200 hover:scale-105"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.1, color: "#1e40af" }}
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Visit</span>
                        </motion.a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-12 text-center">
                <Bookmark className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {searchQuery ? 'No bookmarks found' : 'No bookmarks yet'}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {searchQuery
                    ? 'Try adjusting your search terms or clear the search to see all bookmarks.'
                    : 'Start building your bookmark collection by adding your first bookmark.'
                  }
                </p>
                {!searchQuery && (
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={resetForm}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Bookmark
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Bookmark</DialogTitle>
                      </DialogHeader>
                      <BookmarkForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        isEditing={false}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Bookmark</DialogTitle>
            </DialogHeader>
            <BookmarkForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Bookmark Form Component
interface BookmarkFormProps {
  formData: { title: string; link: string; description: string; tags?: string };
  setFormData: (data: { title: string; link: string; description: string; tags?: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

const BookmarkForm: React.FC<BookmarkFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  isEditing
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="title">Title *</Label>
      <Input
        id="title"
        placeholder="Enter bookmark title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        className="transition-smooth"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="link">URL *</Label>
      <div className="relative">
        <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="link"
          type="url"
          placeholder="https://example.com"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="pl-10 transition-smooth"
          required
        />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        placeholder="Optional description..."
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
        className="transition-smooth"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="tags">Tags <span className="text-xs text-muted-foreground">(comma separated)</span></Label>
      <Input
        id="tags"
        placeholder="e.g. work, personal, tech"
        value={formData.tags || ''}
        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        className="transition-smooth"
      />
    </div>
    <Button type="submit" className="w-full transition-smooth" disabled={isSubmitting}>
      {isSubmitting ? (
        <LoadingSpinner size="sm" text={isEditing ? "Updating..." : "Adding..."} />
      ) : (
        isEditing ? "Update Bookmark" : "Add Bookmark"
      )}
    </Button>
  </form>
);

export default Bookmarks;