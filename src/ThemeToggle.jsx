function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      className={`theme-toggle ${dark ? 'is-dark' : 'is-light'}`}
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="tt-track">
        <span className="tt-knob" />
      </span>
    </button>
  );
}

export default ThemeToggle;
