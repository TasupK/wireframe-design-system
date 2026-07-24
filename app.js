export function getNextTheme(theme) {
  return theme === 'dark' ? 'light' : 'dark';
}

export function getDropdownState(open) {
  return { hidden: !open, expanded: String(open) };
}

if (typeof document !== 'undefined') {
  const root = document.body;
  const themeToggle = document.querySelector('#theme-toggle');
  const dropdownToggle = document.querySelector('#dropdown-toggle');
  const dropdown = document.querySelector('#demo-dropdown');
  const modalOpen = document.querySelector('#modal-open');
  const modal = document.querySelector('#demo-modal');

  function setDropdown(open) {
    const state = getDropdownState(open);
    dropdown.hidden = state.hidden;
    dropdownToggle.setAttribute('aria-expanded', state.expanded);
  }

  themeToggle.addEventListener('click', () => {
    const nextTheme = getNextTheme(root.dataset.theme);
    root.dataset.theme = nextTheme;
    themeToggle.setAttribute('aria-pressed', String(nextTheme === 'dark'));
    themeToggle.textContent = nextTheme === 'dark' ? 'Light mode' : 'Dark mode';
  });

  dropdownToggle.addEventListener('click', () => {
    setDropdown(dropdown.hidden);
  });

  modalOpen.addEventListener('click', () => modal.showModal());
  modal.querySelector('[data-close-modal]').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !dropdown.hidden) setDropdown(false);
  });
}

