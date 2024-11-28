export function dateToISOStr(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
}

export function dateToDisplayStr(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString("ru",{day: 'numeric', month: 'long', year: 'numeric'});
}