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
  Link as LinkIcon
} from 'lucide-react';

interface BookmarkItem {
  id: string;
  title: string;
  link: string;
  description?: string;
  createdAt: string;
}

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
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  useEffect(() => {
    const filtered = bookmarks.filter(bookmark =>
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.link.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBookmarks(filtered);
  }, [bookmarks, searchQuery]);

  const fetchBookmarks = async () => {
    try {
      const response = await bookmarkAPI.getAll();
      setBookmarks(response.data);
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
      if (editingBookmark) {
        // Update existing bookmark
        const response = await bookmarkAPI.update(editingBookmark.id, formData);
        setBookmarks(prev => prev.map(b => 
          b.id === editingBookmark.id ? response.data : b
        ));
        setIsEditDialogOpen(false);
        toast({
          title: "Success",
          description: "Bookmark updated successfully.",
        });
      } else {
        // Create new bookmark
        const response = await bookmarkAPI.create(formData);
        setBookmarks(prev => [response.data, ...prev]);
        setIsAddDialogOpen(false);
        toast({
          title: "Success",
          description: "Bookmark added successfully.",
        });
      }
      
      // Reset form
      setFormData({ title: '', link: '', description: '' });
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
      description: bookmark.description || ''
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
    setFormData({ title: '', link: '', description: '' });
    setEditingBookmark(null);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary-soft">
                <Bookmark className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">My Bookmarks</h1>
                <p className="text-muted-foreground">
                  {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''} saved
                </p>
              </div>
            </div>
            
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
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search bookmarks..."
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
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
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
                  <Card className="h-full hover:shadow-large transition-smooth cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Bookmark className="h-5 w-5 text-primary flex-shrink-0" />
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-smooth">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(bookmark)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(bookmark.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
                        {bookmark.title}
                      </h3>
                      
                      {bookmark.description && (
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                          {bookmark.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(bookmark.createdAt).toLocaleDateString()}</span>
                        </div>
                        
                        <a
                          href={bookmark.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-primary hover:underline text-sm transition-smooth"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Visit</span>
                        </a>
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
  formData: { title: string; link: string; description: string };
  setFormData: (data: { title: string; link: string; description: string }) => void;
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