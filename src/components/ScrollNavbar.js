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

      // iOS 26 Content Visibility Effect - Lower blur for better visibility
      clearTimeout(scrollTimer);
      const dynamicBlur = Math.min(12 + (scrollY * 0.08), 25);
      const dynamicSaturation = Math.min(160 + (scrollY * 0.05), 190);
      const dynamicBrightness = Math.min(1.1 + (scrollY * 0.0005), 1.3);
      const dynamicContrast = Math.min(1 + (scrollY * 0.0003), 1.2);
      
      navbar.style.backdropFilter = `blur(${dynamicBlur}px) saturate(${dynamicSaturation}%) brightness(${dynamicBrightness}) contrast(${dynamicContrast})`;
      navbar.style.webkitBackdropFilter = `blur(${dynamicBlur}px) saturate(${dynamicSaturation}%) brightness(${dynamicBrightness}) contrast(${dynamicContrast})`;
      
      // Reset to optimized blur levels for content visibility
      scrollTimer = setTimeout(() => {
        if (scrollY > heavyScrollThreshold) {
          navbar.style.backdropFilter = 'blur(20px) saturate(180%) brightness(1.2) contrast(1.15)';
          navbar.style.webkitBackdropFilter = 'blur(20px) saturate(180%) brightness(1.2) contrast(1.15)';
        } else if (scrollY > scrollThreshold) {
          navbar.style.backdropFilter = 'blur(16px) saturate(170%) brightness(1.15) contrast(1.1)';
          navbar.style.webkitBackdropFilter = 'blur(16px) saturate(170%) brightness(1.15) contrast(1.1)';
        } else {
          navbar.style.backdropFilter = 'blur(12px) saturate(160%) brightness(1.1)';
          navbar.style.webkitBackdropFilter = 'blur(12px) saturate(160%) brightness(1.1)';
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