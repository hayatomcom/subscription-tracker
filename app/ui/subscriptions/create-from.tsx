import Link from 'next/link';
import { createSubscription } from '@/app/lib/actions';
import { CATEGORIES } from "@/app/lib/definitions";
import { Lalezar } from "next/font/google";

const labelClass = 'block text-sm font-medium';
const inputClass = 'mt-1 w-full rounded-lg border px-3 py-2 text-sm';

export default function CreateFrom() {
    return (
        <form action={createSubscription} className="mt-6 max-w-lg space-y-5">
            <div>
                <label htmlFor="name" className={labelClass}>サービス名</label>
                <input id="name" name="name" type="text" required maxLength={255} className={inputClass}/>
            </div>

            <div>
                <label htmlFor="amount" className={labelClass}>金額(円)</label>
                <input id="amount" name="amount" type="number" required min={1} step={1} className={inputClass}/>
            </div>

            <fieldset>
                <legend className={labelClass}>支払いサイクル</legend>
                <div className="mt-2 flex gap-6 text-sm">
                    <label className="flex items-center gap-2">
                        <input type="radio" name="billingCycle" value="monthly" defaultChecked />
                        毎月
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="billingCycle" value="yearly" />
                        毎年
                    </label>
                </div>
            </fieldset>
            
            <div>
                <label htmlFor="firstBillingDate" className={labelClass}>初回請求日</label>
                <input id="firstBillingDate" name="firstBillingDate" type="date" required className={inputClass} />
            </div>

            <div>
                <label htmlFor="category" className={labelClass}>カテゴリ</label>
                <select id="category" name="category" required defaultValue="" className={inputClass}>
                    <option value="" disabled>選択してください</option>
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="memo" className={labelClass}>メモ(任意)</label>
                <textarea id="memo" name="memo" rows={3} maxLength={500} className={inputClass} />
            </div>

            <div className="flex justify-end gap-3">
                <Link href="/dashboard/subscriptions" className="rounded-lg border px-4 py-2 text-sm">
                    キャンセル
                </Link>
                <button type="submit" className="rounded-lg bg-blue-600 px- py-2 text-sm text-white hover:bg-blue-500">
                    登録する
                </button>
            </div>
        </form>
    );
}