//登録ページを作成する。
import CreateForm from '@/app/ui/subscriptions/create-from';

export default function CreateSubscripionPage() {
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">サブスクを登録</h1>
            <CreateForm />
        </main>
    );
}