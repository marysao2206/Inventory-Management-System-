export const generateSku = (name: string) => {
  const slug = name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 8);

  const prefix = slug.length > 0 ? slug : "SKU";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `${prefix}-${timestamp}-${random}`;
};
