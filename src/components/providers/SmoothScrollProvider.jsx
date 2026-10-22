'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Gracefully handle reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    try {
      // 1. Register GSAP ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);

      // 2. Initialize Lenis Smooth Scroll Engine
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.2,
        infinite: false,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;

      // 3. Synchronize Lenis with GSAP ScrollTrigger
      lenis.on('scroll', (e) => {
        ScrollTrigger.update();
        window.dispatchEvent(
          new CustomEvent('lenis-scroll', {
            detail: { velocity: e.velocity, scroll: e.scroll, progress: e.progress },
          })
        );
      });

      // 4. Drive Lenis updates via GSAP Ticker
      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);

      // 5. Setup Dynamic Bidirectional Scroll Animations & Parallax
      let ctx;
      const initScrollAnimations = () => {
        if (ctx) ctx.revert();

        ctx = gsap.context(() => {
          // A. Multi-speed Parallax Scrub on [data-parallax]
          const parallaxEls = document.querySelectorAll('[data-parallax]');
          parallaxEls.forEach((el) => {
            const speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
            const yDist = speed * 80;
            gsap.fromTo(
              el,
              { y: -yDist },
              {
                y: yDist,
                ease: 'none',
                scrollTrigger: {
                  trigger: el.closest('section') || el,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1,
                },
              }
            );
          });

          // B. Section-level Smooth Dynamic Fade In
          const sections = document.querySelectorAll('section:not(#hero)');
          sections.forEach((section) => {
            gsap.fromTo(
              section,
              { opacity: 0.15, y: 25 },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });

          // C. Rich Individual Micro-Animations across sections
          // 1. Pop-In Animations (.scroll-pop, .scroll-pop-in)
          const popEls = document.querySelectorAll('.scroll-pop, .scroll-pop-in');
          popEls.forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, scale: 0.9, y: 24 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.7,
                ease: 'back.out(1.4)',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });

          // 2. Fade Up Animations (.scroll-fade-up)
          const fadeUpEls = document.querySelectorAll('.scroll-fade-up');
          fadeUpEls.forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 35 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });

          // 3. Fade Down Animations (.scroll-fade-down)
          const fadeDownEls = document.querySelectorAll('.scroll-fade-down');
          fadeDownEls.forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: -25 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });

          // 4. Slide Left Animations (.scroll-slide-left)
          const slideLeftEls = document.querySelectorAll('.scroll-slide-left');
          slideLeftEls.forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, x: -40 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });

          // 5. Slide Right Animations (.scroll-slide-right)
          const slideRightEls = document.querySelectorAll('.scroll-slide-right');
          slideRightEls.forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, x: 40 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });

          // 6. Staggered Batch Pop-In for Interactive Cards (.scroll-card)
          ScrollTrigger.batch('.scroll-card', {
            interval: 0.08,
            batchMax: 4,
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { opacity: 0, y: 24, scale: 0.93 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.65,
                  stagger: 0.07,
                  ease: 'back.out(1.2)',
                  overwrite: 'auto',
                }
              ),
            onLeaveBack: (batch) =>
              gsap.to(batch, {
                opacity: 0,
                y: 20,
                scale: 0.95,
                duration: 0.35,
                overwrite: 'auto',
              }),
          });
        });

        ScrollTrigger.refresh();
      };

      // Initial run & deferred refresh for images
      initScrollAnimations();
      const t1 = setTimeout(initScrollAnimations, 250);
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 800);

      // Listen for window resize to recalculate trigger bounds
      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener('resize', handleResize);
        gsap.ticker.remove(tickerCallback);
        if (ctx) ctx.revert();
        lenis.destroy();
        window.__lenis = null;
      };
    } catch (err) {
      console.warn('SmoothScrollProvider fallback to native scroll:', err);
    }
  }, []);

  return <>{children}</>;
}



