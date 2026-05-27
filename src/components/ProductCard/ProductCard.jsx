const CLICKABLE_IDS = new Set([
  'motor-insurance',
  'health-insurance',
  'term-insurance',
  'cargo-insurance',
  'business-insurance',
]);

function ProductCard({ id, title, subtitle, iconSrc, popular = false, onCardClick }) {
  const clickable = CLICKABLE_IDS.has(id);

  return (
    <article
      className={`insurance-card${popular ? ' is-popular' : ''}${clickable ? ' insurance-card--clickable' : ''}`}
      data-insurance-id={id}
      onClick={clickable ? () => onCardClick?.(id) : undefined}
      onKeyDown={
        clickable
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onCardClick?.(id);
              }
            }
          : undefined
      }
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {popular ? <span className="popular-badge">Most Popular</span> : null}
      {iconSrc ? (
        <img
          className="insurance-card-icon"
          src={iconSrc}
          alt=""
          decoding="async"
          aria-hidden="true"
        />
      ) : null}
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </article>
  );
}

export default ProductCard;
