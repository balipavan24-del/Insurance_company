import './DropdownChevron.css';

function DropdownChevron({ className = '' }) {
  const classes = ['dropdown-arrow', className].filter(Boolean).join(' ');

  return (
    <svg
      className={classes}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export default DropdownChevron;
