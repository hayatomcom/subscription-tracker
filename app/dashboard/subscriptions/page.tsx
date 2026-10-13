import { fetchFilteredSubscriptions, fetchSubscriptionsPages } from "@/app/lib/data";
import { TEMP_USER_ID } from "@/app/lib/temp-user";
import SubscriptionsTable from "@/app/ui/subscriptions/table";

export default async function SubscriptionsPage(props: {
    searchParams?: Promise<{ query?: string; page?: string}>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const pageParam = Math.floor(Number(searchParams?.page))
    const currentPage = pageParam >= 1 ?pageParam : 1;

    const [subscriptions, totalPages] = await Promise.all([
        fetchFilteredSubscriptions(TEMP_USER_ID, query, currentPage),
        fetchSubscriptionsPages(TEMP_USER_ID, query),
    ]);

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">サブスク一覧</h1>
            <p className="mt-2 text-sm text-gray-500">
                {currentPage} / {Math.max(totalPages,1)} ページ
            </p>
            <SubscriptionsTable subscriptions={subscriptions} />
        </main>
    );
}