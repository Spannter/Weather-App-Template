function getDateFromHours(time) {
    const date = new Date(time * 1000);
    return date.toLocaleString();
  }
  export { getDateFromHours };