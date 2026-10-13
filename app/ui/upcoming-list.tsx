import { formatYen, formatShortDate } from '@/app/lib/utils';
import type { UpcomingBilling } from '@/app/lib/definitions';

export default function UpcomingList({items}: {items: UpcomingBilling[]}) {
    return (
        <section className="mt-8 rounded-xl borer p-6">
            <h2 className="text-lg font-bold">30日以内の請求</h2>

            {items.length === 0 ? (
                <p className="mt-4 text-sm text-gray-500">
                    30日以内に予定されている請求はありません
                </p>
            ) : (
                <ul className="mt-4 divide-y">
                    {items.map((item) => (
                        <li key={item.id} className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                    {formatShortDate(item.nextBillingDate)}・
                                    {item.daysLeft === 0 ? '今日' : `あと${item.daysLeft}日`}
                                </p>
                            </div>
                            <p className="font-bold">{formatYen(item.amount)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}