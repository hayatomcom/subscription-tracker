type Props = {
    title: string;
    value: string;
    note?: string;
};

export default function SummaryCard({ title, value, note }: Props) {
    return (
        <div className="rounded-xl border p-6">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="mt-2 text-xl font-bold">{value}</p>
            {note && <p className="mt-1 text-xs text-gray-400">{note}</p>}
        </div>
    );
}