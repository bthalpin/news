export const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    console.log(date,date.toDateString())
    return date.toDateString();
}