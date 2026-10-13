//次回請求日を計算する関数のファイル

import type { BillingCycle } from '@/app/lib/definitions';

//日本時間の今日を文字列で返す。
export function todayInTokyo() {
    return new Intl.DateTimeFormat('sv-SE',{ timeZone: 'Asia/Tokyo'}).format(new Date());
}

//その月が何日まであるかを返す。
function daysInMonth(year: number, month: number) {
    return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function toDateString(year: number, month: number, day: number) {
    const mm = String(month).padStart(2,'0');
    const dd = String(day).padStart(2,'0');
    return `${year}-${mm}-${dd}`;
}

//指定した年月の請求日(月末を超える場合は末日に揃える)
function billingDateIn(year: number, month: number, billingDay: number) {
    return toDateString(year, month, Math.min(billingDay, daysInMonth(year, month)));
}

export function getNextBillingDate(
    firstBillingDate: string,
    cycle: BillingCycle,
    today: string,
) {
    //初回請求日がまだ来ていなければ、それが次回請求日
    if (firstBillingDate >= today) return firstBillingDate;

    const [, firstMonth, billingDay] = firstBillingDate.split('-').map(Number);
    const [year, month] = today.split('-').map(Number);

    if (cycle === 'monthly') {
        const thisMonth = billingDateIn(year, month, billingDay); //billingDateInで請求日と月末を比較する。
        if (thisMonth >= today) return thisMonth; //2026年11月1開始で今日が10月10日なら次回は、11月1日

        const nextYear = month === 12 ? year + 1 : year; //年を跨ぐ処理
        const nextMonth = month === 12 ? 1 : month + 1; //年を跨いだら1月にする
        return billingDateIn(nextYear, nextMonth, billingDay);
    }

    const thisYear = billingDateIn(year, firstMonth, billingDay);
    if (thisYear >= today) return thisYear;
    return billingDateIn(year + 1, firstMonth, billingDay);
}

//今日から指定日まで何日あるかを返す
export function daysUntil(date: string, today: string) {
    const toUTC = (s: string) => {
        const [y,m,d] = s.split('-').map(Number); //Date.UTCの月は0が1月なので、1を引いている。
        return Date.UTC(y, m-1, d);
    };
    return Math.round((toUTC(date) - toUTC(today)) / 86_400_000); //「指定日のミリ秒 - 今日のミリ秒 / 1日のミリ秒」
}