import { useEffect, useRef, useState } from 'react';

const SCROLL_MODES = {
  /** Hero / top of page — animates as soon as it appears */
  hero: { threshold: 0.12, rootMargin: '0px' },
  /** Normal sections — animates when user scrolls them into view */
  section: { threshold: 0.22, rootMargin: '0px 0px -14% 0px' },
};

function ScrollReveal({
  as: Component = 'div',
  className = '',
  children,
  delay = 0,
  mode = 'section',
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const { threshold, rootMargin } = SCROLL_MODES[mode] ?? SCROLL_MODES.section;

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const mergedStyle =
    delay > 0 ? { ...style, '--scroll-reveal-delay': `${delay}ms` } : style;

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
