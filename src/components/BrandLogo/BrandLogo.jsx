import logo from '../../assets/images/Logo.png';
import './BrandLogo.css';

function BrandLogo({ className = '', alt = 'InsureEase', ...imgProps }) {
  return (
    <img
      src={logo}
      alt={alt}
      width={1080}
      height={380}
      className={`brand-logo${className ? ` ${className}` : ''}`}
      decoding="async"
      fetchPriority="high"
      {...imgProps}
    />
  );
}
export default BrandLogo;