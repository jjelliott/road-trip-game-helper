export const backendRequest = (url, options) => {
    return fetch(import.meta.env.VITE_BACKEND_URL + url, options);
};