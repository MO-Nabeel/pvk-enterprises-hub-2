import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 sm:px-6 md:px-8">
      <div className="text-center max-w-md w-full">
        <h1 className="mb-4 text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">404</h1>
        <p className="mb-4 text-lg sm:text-xl md:text-2xl text-muted-foreground">Oops! Page not found</p>
        <p className="mb-6 text-sm sm:text-base text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg sm:rounded-xl transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
