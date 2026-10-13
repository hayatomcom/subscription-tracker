import { connection } from 'next/server';
import { fetchSummary, fetchUpcomingBillings } from '@/app/lib/data';
import { formatYen } from '@/app/lib/utils';
import { todayInTokyo } from "@/app/lib/billing";
import SummaryCard from '@/app/ui/summary-card';
import UpcomingList from '@/app/ui/upcoming-list'
import { TEMP_USER_ID } from "@/app/lib/temp-user";
import Link from 'next/link';

export default async function DashboardPage() {
    await connection();
    const today = todayInTokyo();
    //const summary = await fetchSummary(TEMP_USER_ID);
    
    const [summary, upcoming] = await Promise.all([
        fetchSummary(TEMP_USER_ID),
        fetchUpcomingBillings(TEMP_USER_ID, today),
    ]);

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">ダッシュボード</h1>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <SummaryCard
                    title="月額換算"
                    value={formatYen(summary.monthlyTotal)}
                    note="年払いは12ヶ月で割って換算"
                />
                <SummaryCard
                    title="年額換算"
                    value={formatYen(summary.yearlyTotal)}
                />
                <SummaryCard
                    title="契約中"
                    value={`${summary.activeCount}件`}
                />
            </div>
            <UpcomingList items={upcoming} />
            <Link href="/dashboard/subscriptions" className="mt-6 inline-block text-sm text-blue-600 hover:underline">
                サブスク一覧を見る →
            </Link>
        </main>
    );
}