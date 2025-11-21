import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component that scrolls to the top of the page on route changes.
 * This ensures that when users navigate to a new page via links, they always
 * start at the top of the destination page.
 */
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Scroll to top immediately on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // Use 'auto' for instant scroll, not smooth
    });

    // Also set scrollTop directly as a fallback
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Handle custom scrollbar viewport if present (for any custom scrollbar implementations)
    const customScrollbarViewport = document.querySelector(
      "[data-custom-scrollbar-viewport]"
    ) as HTMLElement;
    if (customScrollbarViewport) {
      customScrollbarViewport.scrollTop = 0;
    }
  }, [pathname, search]); // Trigger on both pathname and search changes

  return null;
};

export default ScrollToTop;

