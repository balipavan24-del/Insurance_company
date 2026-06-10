import { useEffect, useLayoutEffect } from 'react';

export function useAppScrollEffects(location, appContentRef) {
  useEffect(() => {
    if (!('scrollRestoration' in window.history)) {
      return undefined;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const appContent = appContentRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const previousHtmlBehavior = html.style.scrollBehavior;
    const previousBodyBehavior = body.style.scrollBehavior;
    const previousAppContentBehavior = appContent?.style.scrollBehavior;

    html.style.scrollBehavior = 'auto';
    body.style.scrollBehavior = 'auto';
    if (appContent) {
      appContent.style.scrollBehavior = 'auto';
    }

    window.scrollTo(0, 0);
    html.scrollTop = 0;
    body.scrollTop = 0;
    if (appContent?.scrollTo) {
      appContent.scrollTo(0, 0);
    }

    const rafId = window.requestAnimationFrame(() => {
      const nextBehavior = prefersReducedMotion ? 'auto' : 'smooth';
      html.style.scrollBehavior = nextBehavior;
      body.style.scrollBehavior = nextBehavior;
      if (appContent) {
        appContent.style.scrollBehavior = nextBehavior;
      }
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      html.style.scrollBehavior = previousHtmlBehavior;
      body.style.scrollBehavior = previousBodyBehavior;
      if (appContent) {
        appContent.style.scrollBehavior = previousAppContentBehavior || '';
      }
    };
  }, [location.pathname, location.key, appContentRef]);
}
