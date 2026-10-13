//金額の表示用関数
export function formatYen(amount: number) {
    return amount.toLocaleString('ja-JP', { style:'currency', currency: 'JPY' });
}

//日付をスラッシュで表示する関数
export function formatShortDate(date: string) {
    const [, month, day] = date.split('-').map(Number);
    return `${month}/${day}`;
}