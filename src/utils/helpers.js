// Formats to more readable date/time
export const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toDateString();
}