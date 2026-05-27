import { useEffect, useRef, useState } from 'react';

/** Hero / above-the-fold — animates when the block is on screen at load */
export const revealInView = {
  threshold: 0.12,
  rootMargin: '0px',
};

/** Sections below the fold — animates only after scrolling into the viewport */
export const revealOnScroll = {
  threshold: 0.22,
  rootMargin: '0px 0px -14% 0px',
};

function ScrollReveal({
  as: Component = 'div',
  className = '',
  children,
  delay = 0,
  once = true,
  threshold = revealOnScroll.threshold,
  rootMargin = revealOnScroll.rootMargin,
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return undefined;
    }

    let frameId = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(() => {
              setVisible(true);
            });
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [once, threshold, rootMargin]);

  const mergedStyle =
    delay > 0
      ? { ...style, '--scroll-reveal-delay': `${delay}ms` }
      : style;

  const classes = ['scroll-reveal', visible && 'is-visible', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component ref={ref} className={classes} style={mergedStyle} {...rest}>
      {children}
    </Component>
  );
}

export default ScrollReveal;
