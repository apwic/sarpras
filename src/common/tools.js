export function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

export function getCreatedDateDiff(date) {
    const today = new Date();
    const bookingDate = new Date(date);
    const diffTime = today - bookingDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        if (diffHours === 0) {
            return 'Baru saja dibuat';
        }
        return 'Dibuat ' + diffHours + ' jam yang lalu';
    }
    return 'Dibuat ' + diffDays + ' hari yang lalu';
}
