function InsuranceDetailPanel({
  emoji,
  title,
  intro,
  items,
  imageSrc,
  imageAlt,
  tone = 'fire',
  reverse = false,
}) {
  const mediaBlock = (
    <div className="business-home-detail-coverage__media">
      <img
        src={imageSrc}
        alt={imageAlt}
        width={640}
        height={420}
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  const contentBlock = (
    <div className="business-home-detail-coverage__body">
      <span className="business-home-detail-coverage__emoji" aria-hidden="true">
        {emoji}
      </span>
      <h3>{title}</h3>
      <p className="business-home-detail-coverage__intro">{intro}</p>
      <p className="business-home-detail-coverage__list-label">What&apos;s covered</p>
      <ul className={`business-home-detail-coverage__checks business-home-detail-coverage__checks--${tone}`}>
        {items.map((label) => (
          <li key={label}>
            <span className="business-home-detail-coverage__check" aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`business-home-detail-coverage__split ${reverse ? 'business-home-detail-coverage__split--balanced' : ''}`}>
      {reverse ? contentBlock : mediaBlock}
      {reverse ? mediaBlock : contentBlock}
    </div>
  );
}

export default InsuranceDetailPanel;
