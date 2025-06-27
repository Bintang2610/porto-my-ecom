export function getPublicImagePath(path) {
  if (!path) return '';
  return `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
}