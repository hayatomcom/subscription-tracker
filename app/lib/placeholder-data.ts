const userId = '410544b2-4001-4271-9855-fec4b6a6442a';

export const users = [
    {
        id: userId,
        name: 'テストユーザー',
        email: 'user@example.com',
        password: '123456',
    },
];

export const subscriptions = [
    { user_id: userId, name: 'Netflix', amount: 1490, billing_cycle: 'monthly', first_billing_date: '2025-04-10', category: '動画', status: 'active', memo: null },
    { user_id: userId, name: 'Spotify', amount: 980, billing_cycle: 'monthly', first_billing_date: '2024-08-01', category: '音楽', status: 'cancelled', memo: '2026年6月に解約' },
    { user_id: userId, name: 'Adobe Creative Cloud', amount: 86880, billing_cycle: 'yearly', first_billing_date: '2026-01-15', category: 'ソフトウェア', status: 'active', memo: '年払いで契約' },
    { user_id: userId, name: 'iCloud+', amount: 130, billing_cycle: 'monthly', first_billing_date: '2024-02-05', category: 'ソフトウェア', status: 'active', memo: null },
    { user_id: userId, name: '携帯電話', amount: 2970, billing_cycle: 'monthly', first_billing_date: '2023-11-25', category: '通信', status: 'active', memo: null },
    { user_id: userId, name: '自宅インターネット', amount: 5280, billing_cycle: 'monthly', first_billing_date: '2022-04-01', category: '通信', status: 'active', memo: null },
    { user_id: userId, name: 'Amazonプライム', amount: 5900, billing_cycle: 'yearly', first_billing_date: '2025-09-20', category: '動画', status: 'active', memo: null },  
];

