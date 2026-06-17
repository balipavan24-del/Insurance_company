/**
 * One dropdown panel used for Motor, Health, Business, Cargo, Renew.
 * Styling: NavDropdown.css (panel content) + Navbar.css (nav row + panel position)
 */
import { Link } from 'react-router-dom';
import './NavDropdown.css';

function NavDropdown({
  menu,
  isOpen,
  variant,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}) {
  if (!menu) {
    return null;
  }

  const theme = menu.theme;
  const rootClass = `${theme}-mega-menu`;

  return (
    <div
      className={`${rootClass} ${rootClass}--${variant} ${isOpen ? 'is-open' : ''}`}
      role="menu"
      aria-label={menu.ariaLabel}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`${rootClass}__body`}>
        <aside className={`${rootClass}__promo`}>
          <span className={`${rootClass}__tag`}>
            <span className={`${rootClass}__tag-icon`} aria-hidden="true">⚡</span>
            {menu.promo.tag}
          </span>
          <h3 className={`${rootClass}__promo-title`}>{menu.promo.title}</h3>
          <p className={`${rootClass}__promo-text`}>{menu.promo.text}</p>
          <div className={`${rootClass}__instant-card`} aria-hidden="true">
            <span className={`${rootClass}__instant-icon`}>✦</span>
            <span>
              <strong>{menu.promo.cardTitle}</strong>
              <small>{menu.promo.cardSub}</small>
            </span>
          </div>
        </aside>

        <div className={`${rootClass}__columns`}>
          {menu.columns.map((column) => (
            <div
              key={column.id}
              className={`${rootClass}__column ${rootClass}__column--${column.tone}`}
            >
              <p className={`${rootClass}__column-title`}>{column.title}</p>
              <ul className={`${rootClass}__links`}>
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      className={`${rootClass}__link`}
                      role="menuitem"
                      onClick={onNavigate}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {menu.footerActions?.length > 0 && (
        <footer className={`${rootClass}__footer`}>
          <p className={`${rootClass}__footer-label`}>Quick Actions</p>
          <ul className={`${rootClass}__actions`}>
            {menu.footerActions.map((action) => (
              <li key={action.id}>
                <Link
                  to={action.path}
                  className={`${rootClass}__action`}
                  role="menuitem"
                  onClick={onNavigate}
                >
                  {action.label}
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </div>
  );
}

export default NavDropdown;
