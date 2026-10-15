import { fetchFilteredSubscriptions, fetchSubscriptionsPages } from "@/app/lib/data";
import { TEMP_USER_ID } from "@/app/lib/temp-user";
import SubscriptionsTable from "@/app/ui/subscriptions/table";
import Search from '@/app/ui/subscriptions/search';
import Pagination from "@/app/ui/subscriptions/pagination";
import Link from 'next/link';

export default async function SubscriptionsPage(props: {
    searchParams?: Promise<{ query?: string; page?: string}>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const pageParam = Math.floor(Number(searchParams?.page))
    const currentPage = pageParam >= 1 ? pageParam : 1;

    const [subscriptions, totalPages] = await Promise.all([
        fetchFilteredSubscriptions(TEMP_USER_ID, query, currentPage),
        fetchSubscriptionsPages(TEMP_USER_ID, query),
    ]);

    return (
        <main className="p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">サブスク一覧</h1>
                <Link
                    href="/dashboard/subscriptions/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
                >
                    + 新規登録
                </Link>
            </div>
            <Search placeholder="サービス名・カテゴリで検索" />
            <SubscriptionsTable subscriptions={subscriptions} />
            <Pagination currentPage={currentPage} totalPages={totalPages} query={query} />
        </main>
    );
}