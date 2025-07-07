export function createPageUrl(pageName) {
  return `/${pageName}`;
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

