export const generateSimpleId = () => {
    return Math.random().toString(36).substr(2, 9); // e.g., "5g9vnl4rq"
}