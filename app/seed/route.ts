import bcrypt from 'bcrypt';
import { sql } from '@/app/lib/db';
import { users, subscriptions } from '@/app/lib/placeholder-data';

async function seedUsers() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`; 

    await sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `;

    for (const user of users) { //usersから一人分ずつ取り出す
        const hashedPassword = await bcrypt.hash(user.password, 10);    
        await sql`
            INSERT INTO users (id, name, email, password)
            VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING
        `;
    }
}

async function seedSubscriptions() {
    await sql`
        CREATE TABLE IF NOT EXISTS subscriptions (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID NOT NULL REFERENCES users(id),
            name VARCHAR(255) NOT NULL,
            amount INT NOT NULL,
            billing_cycle VARCHAR(10) NOT NULL
                CHECK (billing_cycle IN ('monthly', 'yearly')),
            first_billing_date DATE NOT NULL,
            category VARCHAR(50) NOT NULL,
            status VARCHAR(10) NOT NULL DEFAULT 'active'
                CHECK (status IN ('active', 'cancelled')),
            memo TEXT,
            created_at TIMESTAMP DEFAULT NOW()
        )
    `;

    const [{ count }] = await sql`SELECT COUNT(*) FROM subscriptions`;
    if (Number(count) > 0) return;

    for (const s of subscriptions) {
        await sql`
            INSERT INTO subscriptions
                (user_id, name, amount, billing_cycle, first_billing_date, category, status, memo)
            VALUES
                (${s.user_id},${s.name},${s.amount},${s.billing_cycle},
                    ${s.first_billing_date},${s.category},${s.status},${s.memo})
        `;
    }
}

export async function GET() {
    if (process.env.NODE_ENV !== 'development') {
        return Response.json({ message: '開発環境でのみ実行できます'}, {status: 403});
    }

    try {
        await seedUsers();
        await seedSubscriptions();
        return Response.json({ message: 'シードが完了しました'});
    } catch (error) {
        return Response.json({ error: String(error)}, {status: 500});
    }
}