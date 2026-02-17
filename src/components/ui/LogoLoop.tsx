import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import '../../styles/LogoLoop.css';

const ANIMATION_CONFIG = { MIN_COPIES: 2, COPY_HEADROOM: 2 };

const toCssLength = (value: string | number | undefined): string | undefined =>
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

// ---------- Types ----------

export interface LogoNodeItem {
  node: React.ReactNode;
  title?: string;
  ariaLabel?: string;
  href?: string;
  brandColor?: string;
}

export interface LogoImageItem {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
  brandColor?: string;
}

export type LogoItem = LogoNodeItem | LogoImageItem;

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number; // Pixels per second
  direction?: 'left' | 'right'; // Vertical not supported in this CSS-marquee optimization for now
  width?: string | number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: string) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ---------- Component ----------

export const LogoLoop = memo(
  ({
    logos,
    speed = 80, // Default pixels per second
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 48,
    pauseOnHover = true,
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style,
  }: LogoLoopProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const [singleWidth, setSingleWidth] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);

    // Initial and Resize Measurement
    useEffect(() => {
      const measure = () => {
        if (!containerRef.current || !listRef.current) return;

        const containerW = containerRef.current.clientWidth;
        const listW = listRef.current.scrollWidth; // Use scrollWidth to capture full content including gaps

        if (listW > 0) {
          setSingleWidth(listW);
          // Calculate how many copies needed to fill screen + buffer
          // We need at least enough copies to cover (container + listWidth) so that when we translate by listWidth, we still have content
          const copiesNeeded = Math.ceil((containerW + listW) / listW) + 1;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
      };

      // Measure immediately
      measure();

      // Retry to ensure content is loaded/rendered (React 18 double render, fonts, etc)
      const t1 = setTimeout(measure, 50);
      const t2 = setTimeout(measure, 500);

      const handleResize = () => measure();
      window.addEventListener('resize', handleResize);

      // optional: ResizeObserver
      let ro: ResizeObserver | null = null;
      if (window.ResizeObserver) {
        ro = new ResizeObserver(measure);
        if (containerRef.current) ro.observe(containerRef.current);
        if (listRef.current) ro.observe(listRef.current);
      }

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(t1);
        clearTimeout(t2);
        ro?.disconnect();
      };
    }, [logos, gap, logoHeight]);

    // Calculate duration based on speed (px/s) and distance (singleWidth)
    // Time = Distance / Speed
    const duration = useMemo(() => {
      if (singleWidth === 0 || speed === 0) return 0;
      return singleWidth / speed;
    }, [singleWidth, speed]);

    const cssVariables = useMemo(
      () => ({
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        '--logoloop-scroll-distance': `${direction === 'left' ? -singleWidth : singleWidth}px`,
        '--logoloop-duration': `${duration}s`,
        '--logoloop-direction': direction === 'left' ? 'normal' : 'reverse',
      }),
      [gap, logoHeight, singleWidth, duration, direction]
    ) as React.CSSProperties;

    const rootClassName = useMemo(
      () =>
        [
          'logoloop',
          scaleOnHover && 'logoloop--scale-hover',
          pauseOnHover && 'logoloop--pause-hover',
          className,
        ]
          .filter(Boolean)
          .join(' '),
      [scaleOnHover, pauseOnHover, className]
    );

    const renderLogoItem = useCallback(
      (item: LogoItem, key: string) => {
        if (renderItem) {
          return (
            <li className="logoloop__item" key={key} role="listitem">
              {renderItem(item, key)}
            </li>
          );
        }
        
        const isNodeItem = 'node' in item;
        const brandColor = item.brandColor;
        
        const content = isNodeItem ? (
          <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
            {item.node}
          </span>
        ) : (
          <img
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            width={item.width}
            height={item.height}
            alt={item.alt ?? ''}
            title={item.title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );

        const itemAriaLabel = isNodeItem
          ? item.ariaLabel ?? item.title
          : item.alt ?? item.title;

        // Link wrapper
        const itemContent = item.href ? (
          <a
            className="logoloop__link"
            href={item.href}
            aria-label={itemAriaLabel || 'logo link'}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );

        const itemTitle = isNodeItem ? item.title : item.title ?? item.alt;
        const itemStyle = brandColor
          ? ({ '--brand-color': brandColor } as React.CSSProperties)
          : undefined;

        return (
          <li
            className="logoloop__item"
            key={key}
            role="listitem"
            data-title={itemTitle}
            style={itemStyle}
          >
            {itemContent}
          </li>
        );
      },
      [renderItem]
    );

    // We render multiple <ul> lists. The first one is ref'd for measurement.
    const logoLists = useMemo(
        () =>
          Array.from({ length: copyCount }, (_, copyIndex) => (
            <ul
              className="logoloop__list"
              key={`copy-${copyIndex}`}
              role="list"
              aria-hidden={copyIndex > 0}
              ref={copyIndex === 0 ? listRef : undefined}
            >
              {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
            </ul>
          )),
        [copyCount, logos, renderLogoItem]
      );

    const containerStyle = useMemo(
      () => ({
        width: toCssLength(width) ?? '100%',
        ...cssVariables,
        ...style,
      }),
      [width, cssVariables, style]
    );

    return (
      <div
        ref={containerRef}
        className={rootClassName}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
      >
        <div className="logoloop__track">
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
