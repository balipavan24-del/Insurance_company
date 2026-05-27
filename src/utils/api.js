/** Build API URLs from VITE_API_BASE_URL (.env). Returns path-only when unset. */
export function getApiBaseUrl() {
  const base = import.meta.env.VITE_API_BASE_URL || '';
  return base.replace(/\/$/, '');
}

export function apiUrl(path) {
  const base = getApiBaseUrl();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}
