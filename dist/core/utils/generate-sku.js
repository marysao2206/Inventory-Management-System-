export const generateSku = (name) => {
    const prefix = name
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 3)
        .map((part) => part.slice(0, 3).toUpperCase())
        .join("-");
    return `${prefix || "SKU"}-${Date.now().toString(36).toUpperCase()}`;
};
