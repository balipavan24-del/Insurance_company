export const shouldShowNavbar = (pathname) => (
  pathname === '/'
  || pathname.startsWith('/motor-insurance')
  || pathname.startsWith('/health-insurance')
  || pathname.startsWith('/term-insurance')
  || pathname.startsWith('/cargo-insurance')
  || pathname.startsWith('/business-insurance')
  || pathname.startsWith('/business')
  || pathname.startsWith('/contact-us')
  || pathname.startsWith('/insurance-basics')
  || pathname.startsWith('/renew-plans')
);
