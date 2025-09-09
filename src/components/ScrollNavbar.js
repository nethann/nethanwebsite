import { useEffect } from 'react';

const ScrollNavbar = () => {
  useEffect(() => {
    let scrollTimer = null;
    
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;

      const scrollY = window.scrollY;
      const scrollThreshold = 50;
      const heavyScrollThreshold = 200;
      
      // Ensure navbar stays fixed at top
      navbar.style.position = 'fixed';
      navbar.style.top = '1.5rem';
      navbar.style.left = '50%';
      navbar.style.transform = 'translateX(-50%)';
      navbar.style.zIndex = '1000';
      
      // Clear existing classes
      navbar.classList.remove('scrolled', 'scrolled-heavy');
      
      // Apply scroll-based classes with smooth transitions
      if (scrollY > heavyScrollThreshold) {
        navbar.classList.add('scrolled-heavy');
      } else if (scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
      }

      // Add momentum-based blur effect
      clearTimeout(scrollTimer);
      navbar.style.backdropFilter = `blur(${Math.min(20 + (scrollY * 0.2), 80)}px) saturate(${Math.min(180 + (scrollY * 0.1), 240)}%)`;
      navbar.style.webkitBackdropFilter = `blur(${Math.min(20 + (scrollY * 0.2), 80)}px) saturate(${Math.min(180 + (scrollY * 0.1), 240)}%)`;
      
      // Reset to default blur after scroll stops
      scrollTimer = setTimeout(() => {
        if (scrollY > heavyScrollThreshold) {
          navbar.style.backdropFilter = 'blur(60px) saturate(220%)';
          navbar.style.webkitBackdropFilter = 'blur(60px) saturate(220%)';
        } else if (scrollY > scrollThreshold) {
          navbar.style.backdropFilter = 'blur(40px) saturate(200%)';
          navbar.style.webkitBackdropFilter = 'blur(40px) saturate(200%)';
        } else {
          navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
          navbar.style.webkitBackdropFilter = 'blur(20px) saturate(180%)';
        }
      }, 150);
    };

    // Add scroll event listener with throttling
    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });
    
    // Initial call
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', optimizedScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollNavbar;