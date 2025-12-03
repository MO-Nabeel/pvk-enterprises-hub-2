import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostCard from "@/components/BlogPostCard";
import SectionBadge from "@/components/SectionBadge";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = post ? getRelatedPosts(post.id, 4) : [];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const readingTime = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 220)
  ); // ~220 words per minute

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Trophy Design": "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
      "Office Trends": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
      "Printing Tips": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    };
    return colors[category] || "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20";
  };

  // Convert markdown-like content to HTML (simple conversion)
  const formatContent = (content: string) => {
    const lines = content.split('\n');
    let inList = false;
    let html = '';

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith('# ')) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += `<h1 class="text-3xl sm:text-4xl font-bold mt-8 mb-4 text-foreground">${trimmed.substring(2)}</h1>`;
        return;
      }
      if (trimmed.startsWith('## ')) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += `<h2 class="text-2xl sm:text-3xl font-bold mt-6 mb-3 text-foreground">${trimmed.substring(3)}</h2>`;
        return;
      }
      if (trimmed.startsWith('### ')) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += `<h3 class="text-xl sm:text-2xl font-semibold mt-4 mb-2 text-foreground">${trimmed.substring(4)}</h3>`;
        return;
      }
      
      // Lists
      if (trimmed.startsWith('- ')) {
        if (!inList) {
          html += '<ul class="list-disc ml-6 mb-4 space-y-2">';
          inList = true;
        }
        let listItem = trimmed.substring(2);
        // Handle bold in list items
        listItem = listItem.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
        html += `<li class="text-muted-foreground">${listItem}</li>`;
        return;
      }
      
      // Close list if we hit a non-list line
      if (inList && trimmed !== '') {
        html += '</ul>';
        inList = false;
      }
      
      // Empty lines
      if (trimmed === '') {
        html += '<br />';
        return;
      }
      
      // Regular paragraphs
      let para = trimmed;
      // Handle bold text
      para = para.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
      html += `<p class="mb-4 leading-relaxed text-muted-foreground">${para}</p>`;
    });
    
    // Close any open list
    if (inList) {
      html += '</ul>';
    }
    
    return html;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16 sm:pt-20">
        {/* Article Header - hero banner */}
        <section className="relative overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0">
            <img
              src={post.imageURL}
              alt={post.title}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/90" />
          </div>
          
          <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14 md:py-18 lg:py-20">
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
              {/* Top controls: back + category */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link to="/blog">
                  <Button
                    variant="ghost"
                    className="rounded-full bg-white/95 text-slate-900 px-4 py-2 text-xs sm:text-sm font-semibold shadow-md hover:bg-white"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog & News
                  </Button>
                </Link>

                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em]",
                    "bg-white/10 text-white border border-white/20 backdrop-blur-sm",
                    getCategoryColor(post.category)
                  )}
                >
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-bold leading-tight sm:leading-[1.15] tracking-tight">
                {post.title}
              </h1>

              {/* Author + metadata row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm md:text-base text-white/90">
                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white text-xs sm:text-sm font-semibold shadow-md">
                    {getInitials(post.author || "PVK")}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{post.author}</span>
                    <span className="text-[11px] sm:text-xs text-white/80">
                      PVK Enterprises • Insight
                    </span>
                  </div>
                </div>

                {/* Date + reading time */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs md:text-sm text-white/80">
                  <div className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-3xl bg-card/95 dark:bg-slate-900/95 shadow-[0_18px_45px_rgba(15,23,42,0.12)] border border-border/60 px-5 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10">
                {/* Article Body */}
                <div
                  className="prose max-w-none dark:prose-invert
                    prose-headings:font-semibold prose-headings:text-foreground
                    prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-p:mb-4 sm:prose-p:mb-5
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-ul:list-disc prose-ul:ml-6 prose-li:text-muted-foreground
                    prose-li:mb-2
                    text-sm sm:text-base md:text-[1.02rem]"
                  dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                />
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 sm:mb-10 md:mb-12 space-y-3">
                  <SectionBadge label="Related Articles" className="mx-auto" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    You Might Also Like
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Explore more articles in the same category
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 items-stretch">
                  {relatedPosts.map((relatedPost) => (
                    <BlogPostCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostDetail;

