export const formatDate = (date: Date) => {
    if (!date) return ''
    date = new Date(date);
    return date.toISOString().split('T')[0]; // returns 'YYYY-MM-DD'
};