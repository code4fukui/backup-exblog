export const normalizeLink = (html) => {
  return html.replace(/href=([^"'\s>]+)/g, 'href="$1"');
};
