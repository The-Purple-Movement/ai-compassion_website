'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Gracefully handle reduced motion preference if requested
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Reveal everything immediately if reduced motion is requested
      document.querySelectorAll('.reveal-on-scroll, [data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    try {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        infinite: false,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;

      // Synchronize Lenis with GSAP ScrollTrigger with zero style recalculation overhead
      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(500, 33);

      // Automated Viewport Reveal Observer for smooth dynamic scrolling reveals
      const scrollSelector =
        '.reveal-on-scroll, [data-reveal], .scroll-fade-up, .scroll-fade-down, .scroll-pop, .scroll-popup, .scroll-fade-in, .scroll-slide-left, .scroll-slide-right';

      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              if (!entry.target.hasAttribute('data-scroll-repeat')) {
                revealObserver.unobserve(entry.target);
              }
            } else if (entry.target.hasAttribute('data-scroll-repeat')) {
              entry.target.classList.remove('is-revealed');
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -6% 0px',
          threshold: 0.08,
        }
      );

      const observeElements = () => {
        const elements = document.querySelectorAll(scrollSelector);
        elements.forEach((el) => {
          if (!el.classList.contains('is-revealed')) {
            revealObserver.observe(el);
          }
        });
      };

      observeElements();
      let mutationTimeout;
      const debouncedObserve = () => {
        if (mutationTimeout) clearTimeout(mutationTimeout);
        mutationTimeout = setTimeout(observeElements, 150);
      };
      const mutationObserver = new MutationObserver(debouncedObserve);
      mutationObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
        gsap.ticker.remove(tickerCallback);
        revealObserver.disconnect();
        mutationObserver.disconnect();
        lenis.destroy();
        window.__lenis = null;
      };
    } catch (err) {
      console.warn('SmoothScrollProvider fallback to native scroll:', err);
    }
  }, []);

  return <>{children}</>;
}
