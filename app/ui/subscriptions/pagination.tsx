//ページ送り。サーバーコンポーネント。
import Link from 'next/link';

function createPageURL(query: string, page: number) {   //行き先のURLを組み立てる。
    const params = new URLSearchParams();
    if (query) params.set('query',query);
    params.set('page', String(page));
    return `/dashboard/subscriptions?${params.toString()}`;
}

export default function Pagination({
    currentPage,
    totalPages,
    query,
}: {
    currentPage: number;
    totalPages: number;
    query: string;
}) {
    if (totalPages <= 1) return null;
    
    //Tailwind Classを定義する。bg- 背景。
    const linkClass = 'rounded-lg border px-3 py-1 hover:bg-gray-50';
    const disabledClass = 'rounded-lg border px-3 py-1 text-gray-300';

    return (
        <nav className="mt-6 flex items-center justify-between text-sm">
            {currentPage > 1 ? (
                <Link href={createPageURL(query, currentPage - 1)} className={linkClass}>
                    ← 前へ
                </Link>
            ): (
                <span className={disabledClass}>← 前へ</span>
            )}

            <span className="text-gray-500">
                {currentPage} / {totalPages} ページ
            </span>

            {currentPage < totalPages ? (
                <Link href={createPageURL(query, currentPage + 1)} className={linkClass}>
                    次へ →
                </Link>
            ): (
                <span className={disabledClass}>次へ →</span>
            )}
        </nav>
    );
}