// subscriptionsフォルダを作る意味はあるのだろうか？
import { formatYen } from '@/app/lib/utils';
import type { SubscriptionListItem, SubscriptionStatus } from '@/app/lib/definitions';

function StatusBadge({ status }: { status: SubscriptionStatus }) {
    const isActive = status === 'active';
    return (
        <span
            className={`rounded-full px-2 py-1 text-xs ${
                isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500' 
            }`}
        >
            {isActive ? '契約中' : '解約済み'}
        </span>
    );
}

export default function SubscriptionsTable({
    subscriptions,
}: {
    subscriptions: SubscriptionListItem[];
}) {
    if (subscriptions.length === 0) {
        return <p className="mt-6 text-sm text-gray-500">該当するサブスクはありません</p>;
    }

    return (
        <table className="mt-6 w-full text-left text-sm">
            <thead className="border-b text-gray-500">
                <tr>
                    <th className="py-2 font-normal">サービス名</th>
                    <th className="py-2 font-normal">カテゴリ</th>
                    <th className="py-2 text-right font-normal">全額</th>
                    <th className="py-2 pl-4 font-normal">状態</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {subscriptions.map((s) => (
                    <tr key={s.id}>
                        <td className="py-3 font-medium">{s.name}</td>
                        <td className="py-3">{s.category}</td>
                        <td className="py-3 text-right">
                            {formatYen(s.amount)}
                            <span className="text-gray-500">
                                /{s.billing_cycle === 'monthly' ? '月' : '年'}
                            </span>
                        </td>
                        <td className="py-3 pl-4">
                            <StatusBadge status={s.status} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}