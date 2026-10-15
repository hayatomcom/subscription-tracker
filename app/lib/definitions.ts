// データの型を定義するファイル
export type BillingCycle = 'monthly' | 'yearly'; //どちらかの文字列dけ

export type ActiveSubscription = {
    id: string;
    name: string;
    amount: number;
    billing_cycle: BillingCycle;
    first_billing_date: string; //文字列で'2026-10-10'のように扱う
};

export type UpcomingBilling = ActiveSubscription & {
    nextBillingDate: string;
    daysLeft: number;
};

export type SubscriptionStatus = 'active' | 'cancelled';

export type SubscriptionListItem = {
    id: string;
    name: string;
    amount: number;
    billing_cycle: BillingCycle;
    category: string;
    status: SubscriptionStatus;
}

export const CATEGORIES = ['動画', '音楽', 'ソフトウェア', '通信', 'その他'] as const; //この配列の中身は変更されないという指定。
export type Category = (typeof CATEGORIES)[number]; //'動画'、'音楽'..のどれか
