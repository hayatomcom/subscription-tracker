//import { sql } from '@/app/lib/db';

export default async function Page() {
  //const result = await sql`SELECT NOW() AS now`;
  //const now: Date = result[0].now;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">サブスク管理</h1>
      <p className="mt-2 text-gray-600">毎月の固定費をひと目で把握するアプリケーション</p>
      {/* <p className="mt-4 text-sm">
        DB接続確認：{now.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo'})}
      </p> */}
    </main>
  );
}