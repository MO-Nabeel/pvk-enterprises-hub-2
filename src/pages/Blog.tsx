import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionBadge from "@/components/SectionBadge";
import BlogPostCard from "@/components/BlogPostCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { getAllBlogPosts, getAllCategories, getBlogPostsByCategory } from "@/data/blogPosts";
import { cn } from "@/lib/utils";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => ["All", ...getAllCategories()], []);
  const allPosts = useMemo(() => getAllBlogPosts(), []);

  const filteredPosts = useMemo(() => {
    let posts = selectedCategory === "All" 
      ? allPosts 
      : getBlogPostsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      posts = posts.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
    }

    return posts;
  }, [searchQuery, selectedCategory, allPosts]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16 sm:pt-20 md:pt-24 lg:pt-28">
        {/* Search and Filter Section */}
        <section className="py-8 sm:py-10 md:py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 h-12 sm:h-14 text-base sm:text-lg rounded-xl sm:rounded-2xl border-2 border-border focus-visible:border-primary"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-sm sm:text-base font-semibold text-muted-foreground mr-2">
                  Filter by:
                </span>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm sm:text-base font-medium transition-all",
                      selectedCategory === category
                        ? "bg-[#111827] hover:bg-[#1f2937] text-white border-2 border-transparent shadow-md"
                        : "bg-background hover:bg-muted border-2 border-border"
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            {filteredPosts.length > 0 ? (
              <>
                <div className="text-center mb-8 sm:mb-10 md:mb-12 space-y-3">
                  <SectionBadge label="Articles" className="mx-auto" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {searchQuery || selectedCategory !== "All"
                      ? `Found ${filteredPosts.length} ${filteredPosts.length === 1 ? "Article" : "Articles"}`
                      : "Latest Articles"}
                  </h2>
                  {(searchQuery || selectedCategory !== "All") && (
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {searchQuery && `Searching for "${searchQuery}"`}
                      {searchQuery && selectedCategory !== "All" && " in "}
                      {selectedCategory !== "All" && `Category: ${selectedCategory}`}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 items-stretch">
                  {filteredPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 sm:py-20 md:py-24">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="text-6xl sm:text-7xl">📝</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                    No articles found
                  </h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? `We couldn't find any articles matching "${searchQuery}". Try a different search term.`
                      : `No articles found in the "${selectedCategory}" category.`}
                  </p>
                  {(searchQuery || selectedCategory !== "All") && (
                    <Button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                      }}
                      className="mt-4 rounded-xl bg-[#111827] hover:bg-[#1f2937] text-white"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

