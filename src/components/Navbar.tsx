import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { MenuContext } from '@/context/MenuContext';
import '@/styles/bubble-menu-mobile.css';

const BubbleMenuIcon = ({ isOpen }: { isOpen: boolean }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const topLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    const topLine = topLineRef.current;
    const bottomLine = bottomLineRef.current;

    if (!root || !glow || !topLine || !bottomLine) return;

    const tl = gsap.timeline({
      defaults: { duration: 0.32, ease: 'power3.out' }
    });

    if (isOpen) {
      tl.to(root, { rotate: 180, scale: 1.08, ease: 'back.out(1.5)' }, 0)
        .to(
          glow,
          {
            scale: 1.08,
            background:
              'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(168,85,247,0.1) 70%, rgba(236,72,153,0.05) 100%)',
            boxShadow: '0 0 12px rgba(99,102,241,0.3)'
          },
          0
        )
        .to(
          topLine,
          {
            y: 0,
            rotate: 45,
            width: 22,
            background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
            boxShadow: '0 0 5px rgba(99,102,241,0.3)'
          },
          0
        )
        .to(
          bottomLine,
          {
            y: 0,
            rotate: -45,
            width: 22,
            background: 'linear-gradient(90deg, #ec4899 0%, #6366f1 100%)',
            boxShadow: '0 0 5px rgba(236,72,153,0.3)'
          },
          0
        );
    } else {
      tl.to(root, { rotate: 0, scale: 1 }, 0)
        .to(
          glow,
          {
            scale: 0.95,
            background:
              'radial-gradient(circle, rgba(99,102,241,0) 0%, rgba(168,85,247,0) 70%, rgba(236,72,153,0) 100%)',
            boxShadow: '0 0 0 rgba(99,102,241,0)'
          },
          0
        )
        .to(
          topLine,
          {
            y: -7,
            rotate: 0,
            width: 18,
            background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
            boxShadow: '0 0 0 rgba(99,102,241,0)'
          },
          0
        )
        .to(
          bottomLine,
          {
            y: 7,
            rotate: 0,
            width: 18,
            background: 'linear-gradient(90deg, #ec4899 0%, #3b82f6 100%)',
            boxShadow: '0 0 0 rgba(99,102,241,0)'
          },
          0
        );
    }

    return () => tl.kill();
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative flex h-8 w-8 flex-col items-center justify-center">
      <span ref={glowRef} className="absolute inset-0 rounded-full" />
      <span
        ref={topLineRef}
        className="absolute h-0.5 rounded-full"
        style={{
          width: '18px',
          transform: 'translateY(-7px)',
          background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
          transformOrigin: 'center'
        }}
      />
      <span
        ref={bottomLineRef}
        className="absolute h-0.5 rounded-full"
        style={{
          width: '18px',
          transform: 'translateY(7px)',
          background: 'linear-gradient(90deg, #ec4899 0%, #3b82f6 100%)',
          transformOrigin: 'center'
        }}
      />
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const headerRef = useRef<HTMLElement>(null);
  const isNavigatingRef = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const menuItems = useMemo(
    () => [
      {
        href: '#home',
        label: t('nav.home'),
        ariaLabel: t('nav.home'),
        rotation: -8,
        hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
      },
      {
        href: '#about',
        label: t('nav.about'),
        ariaLabel: t('nav.about'),
        rotation: 8,
        hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
      },
      {
        href: '#projects',
        label: t('nav.projects'),
        ariaLabel: t('nav.projects'),
        rotation: 8,
        hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
      },
      {
        href: '#skills',
        label: t('nav.skills'),
        ariaLabel: t('nav.skills'),
        rotation: 8,
        hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
      },
      {
        href: '#contact',
        label: t('nav.contact'),
        ariaLabel: t('nav.contact'),
        rotation: -8,
        hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
      }
    ],
    [t]
  );

  const animationDuration = 0.5;
  const staggerDelay = 0.12;

  useEffect(() => {
    if (!headerRef.current) return;

    const updateDimensions = () => {
      if (!headerRef.current) return;
      const { offsetWidth, offsetHeight } = headerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(headerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen || showOverlay) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => document.body.classList.remove('menu-open');
  }, [isOpen, showOverlay]);

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    const shouldLockScroll = isOpen;
    const hasSmoother = Boolean(smoother);

    if (shouldLockScroll) {
      if (!hasSmoother) document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overscrollBehavior = 'none';
      smoother?.paused(true);
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overscrollBehavior = '';
      smoother?.paused(false);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overscrollBehavior = '';
      smoother?.paused(false);
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      if (isNavigatingRef.current) return;

      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const viewportHeight = window.innerHeight;
      const viewportMiddle = viewportHeight / 2;

      if (scrollPosition < 100) {
        setActiveSection('home');
        return;
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setActiveSection('contact');
        return;
      }

      let closestSection = activeSection;
      let minDistance = Infinity;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(viewportMiddle - elementMiddle);

        if (rect.top <= viewportHeight * 0.7 && rect.bottom >= viewportHeight * 0.3) {
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        }
      });

      if (closestSection !== activeSection) {
        setActiveSection(closestSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubbleRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[];
    const backdrop = overlay?.querySelector('.rb-bubble-backdrop') as HTMLDivElement | null;
    const list = overlay?.querySelector('.rb-pill-list') as HTMLUListElement | null;

    if (!overlay || !bubbles.length) return;

    gsap.killTweensOf([overlay, backdrop, list, ...bubbles, ...labels].filter(Boolean));

    if (isOpen) {
      gsap.set(overlay, { display: 'flex', pointerEvents: 'auto' });
      if (backdrop) gsap.set(backdrop, { autoAlpha: 0 });
      if (list) {
        gsap.set(list, {
          scale: 0.95,
          y: 22,
          autoAlpha: 0,
          filter: 'blur(8px)',
          transformOrigin: '50% 0%'
        });
      }
      gsap.set(bubbles, {
        scale: 0.72,
        y: 32,
        x: (i: number) => (i % 2 === 0 ? -14 : 14),
        filter: 'blur(6px)',
        autoAlpha: 0,
        transformOrigin: '50% 50%',
        force3D: true
      });
      gsap.set(labels, { y: 16, scale: 0.96, autoAlpha: 0, force3D: true });

      bubbles.forEach((bubble, i) => {
        const item = menuItems[i];
        const isDesktop = window.innerWidth >= 900;
        gsap.set(bubble, { rotation: isDesktop ? (item?.rotation ?? 0) : 0 });
      });

      const openTl = gsap.timeline({ defaults: { overwrite: 'auto' } });
      openTl
        .to(backdrop, { autoAlpha: 1, duration: 0.24, ease: 'power2.out' }, 0)
        .to(
          list,
          {
            scale: 1,
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 0.34,
            ease: 'power3.out'
          },
          0.02
        )
        .to(
          bubbles,
          {
            keyframes: [
              {
                scale: 1.08,
                y: -5,
                x: 0,
                filter: 'blur(0px)',
                autoAlpha: 1,
                duration: Math.max(0.2, animationDuration * 0.58),
                ease: 'power3.out'
              },
              {
                scale: 1,
                y: 0,
                duration: Math.max(0.16, animationDuration * 0.42),
                ease: 'back.out(2.2)'
              }
            ],
            stagger: { each: staggerDelay }
          },
          0.02
        )
        .to(
          labels,
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: Math.max(0.26, animationDuration * 0.64),
            ease: 'power2.out',
            stagger: staggerDelay
          },
          0.12
        );
    } else if (showOverlay) {
      gsap.set(overlay, { pointerEvents: 'none' });
      const closeTl = gsap.timeline({
        defaults: { overwrite: 'auto' },
        onComplete: () => {
          gsap.set(overlay, { display: 'none', pointerEvents: 'none' });
          setShowOverlay(false);
        }
      });

      closeTl
        .to(
          labels,
          {
            y: 14,
            scale: 0.95,
            autoAlpha: 0,
            duration: 0.18,
            ease: 'power2.in',
            stagger: { each: 0.035, from: 'end' }
          },
          0
        )
        .to(
          bubbles,
          {
            keyframes: [
              {
                scale: 1.04,
                y: -4,
                duration: 0.1,
                ease: 'power1.out'
              },
              {
                scale: 0.7,
                y: 30,
                x: (i: number) => (i % 2 === 0 ? -14 : 14),
                filter: 'blur(6px)',
                autoAlpha: 0,
                duration: 0.24,
                ease: 'back.in(1.3)'
              }
            ],
            stagger: { each: 0.05, from: 'end' }
          },
          0
        )
        .to(
          list,
          {
            scale: 0.94,
            y: 16,
            autoAlpha: 0,
            filter: 'blur(8px)',
            duration: 0.2,
            ease: 'power2.in'
          },
          0.02
        )
        .to(backdrop, { autoAlpha: 0, duration: 0.2, ease: 'power2.inOut' }, 0.06);
    }
  }, [isOpen, showOverlay, menuItems, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (!isOpen) return;
      const bubbles = bubbleRefs.current.filter(Boolean) as HTMLAnchorElement[];
      const isDesktop = window.innerWidth >= 900;

      bubbles.forEach((bubble, i) => {
        const item = menuItems[i];
        if (!bubble || !item) return;
        const rotation = isDesktop ? (item.rotation ?? 0) : 0;
        gsap.set(bubble, { rotation });
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, menuItems]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;

    const section = href.replace('#', '');

    isNavigatingRef.current = true;
    setIsOpen(false);
    setActiveSection(section);

    const element = document.getElementById(section);
    if (!element) {
      isNavigatingRef.current = false;
      return;
    }

    const navOffset = 88;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      const targetY = Math.max(0, smoother.offset(element, 'top top') - navOffset);
      smoother.scrollTo(targetY, true);
    } else {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 900);
  };

  const handleMenuToggle = () => {
    const nextState = !isOpen;
    if (nextState) setShowOverlay(true);
    setIsOpen(nextState);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <MenuContext.Provider value={{ isMenuOpen: isOpen }}>
      <header
        ref={headerRef}
        style={{ zIndex: 3000, pointerEvents: 'auto' }}
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out',
          'rounded-full max-w-fit',
          'border border-neutral-400/25 dark:border-neutral-300/20',
          'shadow-lg shadow-black/5 dark:shadow-black/20',
          isScrolled
            ? 'bg-background/80 dark:bg-background/70 backdrop-blur-lg py-2 px-6 lg:px-8'
            : 'bg-background/70 dark:bg-background/60 backdrop-blur-md py-3 px-8 lg:px-10'
        )}
      >
        {dimensions.width > 0 && (
          <svg
            className="absolute pointer-events-none overflow-visible"
            style={{ top: 0, left: 0, width: '100%', height: '100%' }}
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="nav-progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <rect
              x="1.5"
              y="1.5"
              width={dimensions.width - 3}
              height={dimensions.height - 3}
              rx={Math.min((dimensions.height - 3) / 2, (dimensions.width - 3) / 2)}
              ry={Math.min((dimensions.height - 3) / 2, (dimensions.width - 3) / 2)}
              fill="none"
              stroke="url(#nav-progress-gradient)"
              strokeWidth="3"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={100 - scrollProgress}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="transition-[stroke-dashoffset] duration-100 ease-linear"
            />
          </svg>
        )}

        <nav className="relative z-10 flex items-center justify-between gap-4 lg:gap-8">
          <a
            href="#home"
            onClick={handleNavClick}
            className="font-bold text-xl text-foreground/90 hover:text-foreground transition-colors"
          >
            jeanca<span className="text-blue">Dev</span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map(item => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    'relative text-sm font-medium transition-all duration-500 ease-out px-3 py-2 rounded-md whitespace-nowrap',
                    isActive
                      ? 'text-foreground after:w-full'
                      : 'text-foreground/75 hover:text-foreground after:w-0 hover:after:w-full',
                    'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue',
                    'after:transition-all after:duration-500 after:ease-out'
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme as 'dark' | 'light'} toggleTheme={toggleTheme} />
            <LanguageToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={handleMenuToggle}
              className={cn(
                'relative lg:hidden group overflow-hidden hover:bg-foreground/5 transition-all duration-500',
                isOpen && 'bg-foreground/5'
              )}
              aria-expanded={isOpen}
              aria-controls="mobile-bubble-menu"
            >
              <BubbleMenuIcon isOpen={isOpen} />
              <span className="sr-only">{isOpen ? 'Cerrar menu' : 'Abrir menu'}</span>
            </Button>
          </div>
        </nav>
      </header>

      {showOverlay && (
        <div
          id="mobile-bubble-menu"
          ref={overlayRef}
          className="rb-bubble-menu-items fixed lg:hidden"
          style={{ zIndex: 2900 }}
          aria-hidden={!isOpen}
        >
          <div className="rb-bubble-backdrop" onClick={() => setIsOpen(false)} />
          <ul className="rb-pill-list" role="menu" aria-label="Mobile menu">
            {menuItems.map((item, index) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              const linkStyle = {
                '--item-rot': `${item.rotation ?? 0}deg`,
                '--pill-bg': isActive ? item.hoverStyles.bgColor : '#ffffff',
                '--pill-color': isActive ? item.hoverStyles.textColor : '#111111',
                '--hover-bg': item.hoverStyles.bgColor,
                '--hover-color': item.hoverStyles.textColor
              } as React.CSSProperties;

              return (
                <li key={item.href} role="none" className="rb-pill-col">
                  <a
                    ref={el => {
                      bubbleRefs.current[index] = el;
                    }}
                    href={item.href}
                    aria-label={item.ariaLabel || item.label}
                    role="menuitem"
                    onClick={handleNavClick}
                    className={cn('rb-pill-link', isActive && 'is-active')}
                    style={linkStyle}
                  >
                    <span
                      ref={el => {
                        labelRefs.current[index] = el;
                      }}
                      className="rb-pill-label"
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </MenuContext.Provider>
  );
};

export default Navbar;
