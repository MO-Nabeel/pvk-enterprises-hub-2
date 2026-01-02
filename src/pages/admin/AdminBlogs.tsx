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
    <AdminLayout title="Blog Management" subtitle="Create, edit, and manage your blog posts and categories.">
      <div className="space-y-6">
        {/* Stats Section - Moved to Top for Consistency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-violet-50/80 via-white to-violet-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-violet-900/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
              <FileText className="h-32 w-32 -mr-10 -mt-10" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-violet-600/80 dark:text-violet-400">
                Total Posts
              </CardTitle>
              <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-violet-100 dark:ring-violet-900/30 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
                {posts.length}
              </div>
              <p className="mt-3 text-xs font-semibold text-violet-600/80 dark:text-violet-400 flex items-center gap-1.5 bg-violet-50/50 dark:bg-violet-900/20 w-fit px-2 py-1 rounded-full">
                Published articles across all categories.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-emerald-900/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
              <List className="h-32 w-32 -mr-10 -mt-10" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-emerald-600/80 dark:text-emerald-400">
                Categories
              </CardTitle>
              <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-900/30 group-hover:scale-110 transition-transform duration-300">
                <List className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
                {categories.length}
              </div>
              <p className="mt-3 text-xs font-semibold text-emerald-600/80 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50/50 dark:bg-emerald-900/20 w-fit px-2 py-1 rounded-full">
                Active content topics.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-amber-900/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
              <Check className="h-32 w-32 -mr-10 -mt-10" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-amber-600/80 dark:text-amber-400">
                Filtered Results
              </CardTitle>
              <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-amber-100 dark:ring-amber-900/30 group-hover:scale-110 transition-transform duration-300">
                <Check className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
                {filteredPosts.length}
              </div>
              <p className="mt-3 text-xs font-semibold text-amber-600/80 dark:text-amber-400 flex items-center gap-1.5 bg-amber-50/50 dark:bg-amber-900/20 w-fit px-2 py-1 rounded-full">
                Posts matching current search criteria.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Card */}
        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
          <CardHeader className="px-6 pt-6 pb-4 border-b border-slate-100/50 dark:border-slate-800/50">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">Blog Posts</CardTitle>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Manage articles, edit content, and organize
                </p>
              </div>
              <Button
                onClick={handleNew}
                className="gap-2 text-xs font-bold uppercase tracking-wide rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all h-10 px-6"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-6 py-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex-1">
                <Input
                  placeholder="Search posts by title, author, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-10 text-sm rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus-visible:ring-slate-900 dark:focus-visible:ring-indigo-600"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-10 w-full md:w-[200px] text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
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

            <div className="overflow-x-auto rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white dark:bg-slate-950">
              <Table>
                <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
                  <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                    <TableHead className="w-[300px] whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 pl-6 h-12">Title</TableHead>
                    <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">Category</TableHead>
                    <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">Author</TableHead>
                    <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">Date</TableHead>
                    <TableHead className="text-right whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 pr-6 h-12">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12 text-sm text-muted-foreground">
                        {searchTerm || categoryFilter !== "all"
                          ? "No posts found matching your filters."
                          : "No blog posts yet. Click 'New Post' to create one!"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPosts.map((post) => (
                      <TableRow key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors">
                        <TableCell className="pl-6 py-4">
                          <div className="flex items-center gap-3">
                            {post.imageURL ? (
                              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <img
                                  src={post.imageURL}
                                  alt={post.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-sm">
                                <FileText className="h-5 w-5 text-slate-400" />
                              </div>
                            )}
                            <div className="min-w-0 max-w-[200px] sm:max-w-xs">
                              <div className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{post.title}</div>
                              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-1 truncate">
                                {post.excerpt}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge variant="outline" className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-slate-50 text-slate-700 border-0 ring-1 ring-slate-200/50 dark:bg-slate-900/30 dark:text-slate-300 dark:ring-slate-700/50 shadow-sm">
                            {post.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{post.author}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{formatDate(post.date)}</span>
                        </TableCell>
                        <TableCell className="text-right pr-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEdit(post)}
                              className="h-7 w-7 hover:bg-[#111827] hover:text-white transition-all duration-200 ease-in-out"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteConfirmId(post.id)}
                              className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
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

