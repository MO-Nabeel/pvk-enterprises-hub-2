import { useState, useMemo, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Plus, Pencil, Trash2, FileText, Calendar as CalendarIcon, User, List, Check, X } from "lucide-react";
import { getAllBlogPosts, saveBlogPosts, getAllCategories, generateSlug, type BlogPost } from "@/data/blogPosts";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

// Helper to convert file to data URL
const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

const AdminBlogs = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>(() => getAllBlogPosts());
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = async (files: FileList | null) => {
    if (!files || !editingPost) return;

    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    const file = imageFiles[0];
    try {
      const url = await fileToDataUrl(file);
      setEditingPost({ ...editingPost, imageURL: url });
    } catch (error) {
      console.error("Failed to load image", error);
      toast({
        title: "Error",
        description: "Failed to load image",
        variant: "destructive",
      });
    }
  };

  const handleClearImage = () => {
    if (!editingPost) return;
    setEditingPost({ ...editingPost, imageURL: "" });
  };

  const categories = useMemo(() => {
    const cats = new Set(posts.map((post) => post.category));
    if (editingPost?.category) {
      cats.add(editingPost.category);
    }
    // Also add default categories if they aren't in posts yet
    const defaults = getAllCategories();
    defaults.forEach(c => cats.add(c));

    return Array.from(cats).sort();
  }, [posts, editingPost?.category]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.category.toLowerCase().includes(term) ||
          post.author.toLowerCase().includes(term)
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [posts, searchTerm, categoryFilter]);

  const handleSave = () => {
    if (!editingPost) return;

    // Validation
    if (!editingPost.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    if (!editingPost.excerpt.trim()) {
      toast({
        title: "Validation Error",
        description: "Excerpt is required",
        variant: "destructive",
      });
      return;
    }

    if (!editingPost.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Content is required",
        variant: "destructive",
      });
      return;
    }

    if (!editingPost.category.trim()) {
      toast({
        title: "Validation Error",
        description: "Category is required",
        variant: "destructive",
      });
      return;
    }

    // Generate slug if not set or if title changed
    const slug = editingPost.slug || generateSlug(editingPost.title);

    const updatedPost: BlogPost = {
      ...editingPost,
      slug,
      date: editingPost.date || format(new Date(), "yyyy-MM-dd"),
    };

    let updatedPosts: BlogPost[];

    if (editingPost.id && posts.some((p) => p.id === editingPost.id)) {
      // Update existing
      updatedPosts = posts.map((p) => (p.id === editingPost.id ? updatedPost : p));
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
    } else {
      // Create new
      const newId = Date.now().toString();
      updatedPosts = [
        ...posts,
        {
          ...updatedPost,
          id: newId,
        },
      ];
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
    }

    setPosts(updatedPosts);
    saveBlogPosts(updatedPosts);
    setIsDialogOpen(false);
    setEditingPost(null);
    setIsAddingCategory(false);
  };

  const handleDelete = (id: string) => {
    const updatedPosts = posts.filter((p) => p.id !== id);
    setPosts(updatedPosts);
    saveBlogPosts(updatedPosts);
    setDeleteConfirmId(null);
    toast({
      title: "Success",
      description: "Blog post deleted successfully",
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsDialogOpen(true);
  };

  const handleNew = () => {
    setEditingPost({
      id: "",
      title: "",
      category: categories[0] || "",
      date: format(new Date(), "yyyy-MM-dd"),
      author: "PVK Team",
      imageURL: "",
      excerpt: "",
      content: "",
      slug: "",
    });
    setIsAddingCategory(false);
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <AdminLayout title="Blog Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Blog Posts</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your blog articles and content
                </p>
              </div>
              <Button
                onClick={handleNew}
                className="gap-2 bg-gradient-to-r from-[#00c6ff] to-[#00d97e] text-white hover:opacity-90 shadow-md hover:shadow-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="focus:bg-[#111827] focus:text-white">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="focus:bg-[#111827] focus:text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Posts Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        {searchTerm || categoryFilter !== "all"
                          ? "No posts found matching your filters"
                          : "No blog posts yet. Create your first post!"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {post.imageURL && (
                              <img
                                src={post.imageURL}
                                alt={post.title}
                                className="h-12 w-12 rounded object-cover"
                              />
                            )}
                            <div>
                              <div className="font-medium">{post.title}</div>
                              <div className="text-sm text-muted-foreground line-clamp-1">
                                {post.excerpt}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{post.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{post.author}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{formatDate(post.date)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(post)}
                              className="h-8 w-8 hover:bg-[#111827] hover:text-white"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteConfirmId(post.id)}
                              className="h-8 w-8 text-destructive hover:bg-[#111827] hover:text-white"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold">{posts.length}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{categories.length}</p>
                </div>
                <Badge variant="outline" className="h-8 w-8 flex items-center justify-center">
                  {categories.length}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Filtered Results</p>
                  <p className="text-2xl font-bold">{filteredPosts.length}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost?.id ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
            <DialogDescription>
              {editingPost?.id
                ? "Update the blog post details below"
                : "Fill in the details to create a new blog post"}
            </DialogDescription>
          </DialogHeader>
          {editingPost && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={editingPost.title}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title: e.target.value })
                    }
                    placeholder="Enter post title"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="category">Category *</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-muted"
                      onClick={() => {
                        setIsAddingCategory(!isAddingCategory);
                        // Optional: clear category if switching to add mode to avoid confusion, 
                        // or keep it to allow editing the current selection. 
                        // Let's keep it to allow "editing/refining" the selected category name if they switch to input.
                      }}
                      title={isAddingCategory ? "Select existing category" : "Create new category"}
                    >
                      {isAddingCategory ? (
                        <List className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {isAddingCategory ? (
                    <div className="flex gap-2">
                      <Input
                        id="category"
                        value={editingPost.category}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, category: e.target.value })
                        }
                        placeholder="Type new category name..."
                        className="focus:ring-2 focus:ring-primary"
                        autoFocus
                      />
                      <Button
                        type="button"
                        size="icon"
                        onClick={() => setIsAddingCategory(false)}
                        className="shrink-0 bg-green-600 hover:bg-green-700 text-white"
                        title="Save Category"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Select
                      value={editingPost.category}
                      onValueChange={(value) =>
                        setEditingPost({ ...editingPost, category: value })
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="z-[2000]">
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat} className="focus:bg-[#111827] focus:text-white">
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {isAddingCategory
                      ? "Type a new category name for this post"
                      : "Select a category from the list or click '+' to add new"
                    }
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={editingPost.author}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, author: e.target.value })
                    }
                    placeholder="Author name"
                  />
                </div>
                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal hover:bg-[#111827] hover:text-white transition-colors duration-200",
                          !editingPost.date && "text-muted-foreground"
                        )}
                      >
                        {editingPost.date ? (
                          format(new Date(editingPost.date), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-[2000]" align="start">
                      <Calendar
                        mode="single"
                        selected={editingPost.date ? new Date(editingPost.date) : undefined}
                        onSelect={(date) =>
                          setEditingPost({
                            ...editingPost,
                            date: date ? format(date, "yyyy-MM-dd") : "",
                          })
                        }
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1 rounded-md border border-border/70 bg-muted/20 px-3 py-2.5 sm:px-4 sm:py-3">
                  <label className="text-xs font-medium text-muted-foreground">
                    Blog Key Visual
                    <span className="ml-1 text-[11px] font-normal text-muted-foreground">
                      (Used for Blog Grid)
                    </span>
                  </label>
                  <div
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-border/70 bg-background px-3 py-2 text-[11px] sm:text-xs transition hover:bg-muted/60"
                    onClick={() => imageInputRef.current?.click()}
                    onDragOver={(event) => {
                      event.preventDefault();
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      handleImageSelect(event.dataTransfer.files);
                    }}
                  >
                    <div className="flex flex-col gap-0.5 text-left">
                      <span className="font-medium text-foreground text-xs sm:text-[13px]">
                        Click to select image
                      </span>
                      <span className="text-[11px] text-muted-foreground leading-snug">
                        Single main image used in the blog grid and on the blog post page.
                      </span>
                    </div>
                  </div>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleImageSelect(event.target.files)}
                  />
                  {editingPost.imageURL && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <div className="relative group w-full h-48 sm:h-64">
                        <div className="w-full h-full overflow-hidden rounded-md border border-border/60 bg-background">
                          <img
                            src={editingPost.imageURL}
                            alt={editingPost.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-medium">
                          Main Visual
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={handleClearImage}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={editingPost.excerpt}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, excerpt: e.target.value })
                  }
                  placeholder="Short summary of the post (2-3 lines)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={editingPost.content}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
                  }
                  placeholder="Full blog post content (supports markdown-like formatting)"
                  rows={15}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Supports markdown: Use # for headers, ** for bold, - for lists
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Post</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminBlogs;

