import { HiCheck } from 'react-icons/hi';

function InsuranceDetailPanel({
  emoji,
  iconSrc,
  iconAlt = '',
  title,
  intro,
  items,
  imageSrc,
  imageAlt,
  tone = 'fire',
  reverse = false,
  imageLoading = 'lazy',
}) {
  const mediaBlock = (
    <div className="business-home-detail-coverage__media">
      <img
        src={imageSrc}
        alt={imageAlt}
        width={640}
        height={420}
        loading={imageLoading}
        decoding="async"
      />
    </div>
  );

  const contentBlock = (
    <div className="business-home-detail-coverage__body">
      <span className="business-home-detail-coverage__emoji" aria-hidden="true">
        {iconSrc ? (
          <img className="business-home-detail-coverage__emoji-img" src={iconSrc} alt={iconAlt} />
        ) : (
          emoji
        )}
      </span>
      <h3>{title}</h3>
      <p className="business-home-detail-coverage__intro">{intro}</p>
      <p className="business-home-detail-coverage__list-label">What&apos;s covered</p>
      <ul className={`business-home-detail-coverage__checks business-home-detail-coverage__checks--${tone}`}>
        {items.map((label) => (
          <li key={label}>
            <HiCheck
              className={`business-home-detail-coverage__check business-home-detail-coverage__check--${tone}`}
              aria-hidden="true"
            />
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
