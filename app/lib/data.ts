// データを取得する関数をこのファイルにまとめる
import { sql } from '@/app/lib/db';
import { getNextBillingDate, daysUntil } from '@/app/lib/billing';
import { ActiveSubscription, UpcomingBilling } from "@/app/lib/definitions";

export async function fetchSummary(userId: string) {
    const [row] = await sql`
        SELECT
            COUNT(*) AS active_count,
            COALESCE(SUM(
                CASE
                    WHEN billing_cycle = 'monthly' THEN amount * 12
                    ELSE amount
                END
            ), 0) AS yearly_total
        FROM subscriptions
        WHERE user_id = ${userId} AND status = 'active'
    `;
    
    const yearlyTotal = Number(row.yearly_total);

    return {
        activeCount: Number(row.active_count),
        yearlyTotal,
        monthlyTotal: Math.round(yearlyTotal / 12),
    };
}

export async function fetchUpcomingBillings(
    userId: string,
    today: string,
    withinDays = 30,
): Promise<UpcomingBilling[]> {
    const rows = await sql<ActiveSubscription[]>
    `
        SELECT id, name, amount, billing_cycle,
            first_billing_date::text AS first_billing_date
        FROM subscriptions
        WHERE user_id = ${userId} AND status = 'active'
    `;

    return rows
        .map((s) => {
            const nextBillingDate = getNextBillingDate(s.first_billing_date, s.billing_cycle, today);
            return { ...s, nextBillingDate, daysLeft: daysUntil(nextBillingDate, today)};
        })
        .filter((s) => s.daysLeft <= withinDays)
        .sort((a,b) => a.daysLeft - b.daysLeft);

}