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

