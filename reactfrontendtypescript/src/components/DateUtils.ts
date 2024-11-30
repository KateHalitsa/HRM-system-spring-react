export function dateToISOStr(date: Date): string {
    if (date === null){
        return "";
    } else {
        return new Date(date).toISOString().split('T')[0];
    }
}

export function dateToDisplayStr(date: Date): string {
    if (date === null) {
        return "";
    } else {
        const d = new Date(date);
        return d.toLocaleDateString("ru", {day: 'numeric', month: 'long', year: 'numeric'});
    }
}