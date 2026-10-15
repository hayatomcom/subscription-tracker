'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams(); //現在のURLの?移行の値を読み取る。
    const pathname = usePathname(); //現在のパス(/dashboard/subscriptions)を読み取る。
    const { replace } = useRouter(); //画面遷移を行う機能で、replaceだけ取り出す。URLを置き換えて再レンダリング。

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);   //現在のURLパラメータのコピーを作成
        params.set('page','1');
        if (term) {
            params.set('query',term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300) //入力が止まってから300ms後に関数を実行する。

    return (
        <div className="mt-6">
            <label htmlFor="search" className="sr-only">    {/*sr-onlyは画面上は隠すが、スクリーンリーダーには検索と伝わる */}
                検索
            </label>
            <input 
                id="search"
                className="w-full rounded-lg border px-4 py-2 text-sm"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query') ?? ''}  /*query=Netを開いたとき、欄にNetが入った状態になる。*/
            />
        </div>
    )

}1