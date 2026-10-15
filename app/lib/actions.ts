//ServerActionを作る。
//ServerActionとは、サーバーで動く関数をフォームのactionに直接指定するだけで、ブラウザで入力したデータをサーバーに送って保存できる。
//Zodはデータが期待通りの形をしているかを検証するライブラリ

'use server'; //Server Actionは「ブラウザから呼び出せるサーバーの関数」という特別な存在。明示的な宣言が必要。

import { z } from 'zod';
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { sql } from '@/app/lib/db';
import { CATEGORIES } from "@/app/lib/definitions";
import { TEMP_USER_ID } from "@/app/lib/temp-user";

const SubscriptionSchema = z.object({
    name: z.string().trim().min(1).max(255),
    amount: z.coerce.number().int().positive().max(10_000_000),
    billingCycle: z.enum(['monthly','yearly']),
    firstBillingDate: z.iso.date(),
    category: z.enum(CATEGORIES),
    memo: z.string().trim().max(500),
});

export async function createSubscription(formData: FormData) {
    const data = SubscriptionSchema.parse({
        name: formData.get('name'), //値が無ければnull
        amount: formData.get('amount'),
        billingCycle: formData.get('billingCycle'),
        firstBillingDate: formData.get('firstBillingDate'),
        category: formData.get('category'),
        memo: formData.get('memo') ?? '',
    });

    await sql`
        INSERT INTO subscriptions
            (user_id, name, amount, billing_cycle, first_billing_date, category, memo)
        VALUES
            (${TEMP_USER_ID}, ${data.name}, ${data.amount}, ${data.billingCycle}, ${data.firstBillingDate}, ${data.category}, ${data.memo || null})
    `;

    revalidatePath('/dashboard');   //保存されている古い表示を捨てて、作り直す。データを変更したら、関係するページにrevalidatePathを呼ぶ。
    revalidatePath('/dashboard/subscriptions');
    redirect('/dashboard/subscriptions'); //保存が終わったら、一覧画面へ移動させる。
}