import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/data/blogPosts";

interface BlogPostCardProps {
  post: BlogPost;
  className?: string;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const BlogPostCard = ({ post, className }: BlogPostCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const readingTime = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 220)
  ); // ~220 words per minute

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={cn(
        "group relative flex flex-col h-full rounded-3xl overflow-hidden",
        "bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900",
        "border border-slate-100/80 dark:border-slate-800/80",
        "shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_26px_70px_rgba(15,23,42,0.16)]",
        "transition-all duration-500 ease-out hover:-translate-y-2",
        "min-h-[340px] sm:min-h-[360px] md:min-h-[380px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
        className,
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-3xl rounded-b-none bg-slate-900/5">
        <div className="aspect-[16/9]">
          <img
            src={post.imageURL}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 sm:px-6 pt-5 pb-5 sm:pb-6">
        {/* Top section: CTA + title + excerpt (flex-1 so bottom section aligns across cards) */}
        <div className="flex-1 flex flex-col">
          {/* Pill CTA */}
          <div className="mb-4 flex">
            <span className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 text-[11px] font-semibold tracking-[0.16em] uppercase px-4 py-2 shadow-sm border border-slate-200/80 dark:bg-slate-900 dark:text-slate-50 dark:border-slate-700">
              Read Story
            </span>
          </div>

          {/* Title */}
          <div className="group/title">
            <h3 className="text-[1.15rem] sm:text-xl md:text-[1.35rem] font-bold leading-snug text-purple-600 dark:text-purple-300 group-hover/title:text-purple-500 dark:group-hover/title:text-purple-200 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </div>

          {/* Excerpt */}
          <p className="mt-2 text-[0.78rem] sm:text-[0.86rem] md:text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Bottom section: author + meta, always aligned to bottom */}
        <div className="mt-5 space-y-3">
          {/* Author row */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300 text-xs font-semibold">
              {getInitials(post.author || "PVK")}
            </div>
            <div>
              <p className="text-xs sm:text-[0.8rem] font-semibold text-slate-800 dark:text-slate-100">
                {post.author}
              </p>
              <p className="text-[0.7rem] sm:text-[0.75rem] text-slate-500 dark:text-slate-400">
                PVK Enterprises • Insight
              </p>
            </div>
          </div>

          {/* Footer meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] sm:text-[0.75rem] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 min-w-0">
              <Calendar className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              <time dateTime={post.date} className="leading-none truncate">
                {formatDate(post.date)}
              </time>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <Clock className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              <span className="leading-none whitespace-nowrap">
                {readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;

