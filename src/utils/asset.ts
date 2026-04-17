export const assetPath = (p: string) => {
    const base = import.meta.env.BASE_URL ?? '/';
    const normalizedBase = base.endsWith('/') ? base : base + '/';
    return normalizedBase + p.replace(/^\//, '');
};
