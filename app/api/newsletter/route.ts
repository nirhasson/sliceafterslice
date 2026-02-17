import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const email = body.email;

        // שליחת התראה אליך (ניר)
        await resend.emails.send({
            from: 'onboarding@resend.dev', // השתמש בזה עד שהדומיין יהיה Verified
            to: 'nirhasson01@gmail.com',
            subject: 'נרשם חדש לניוזלטר!',
            html: `<p>אימייל שנרשם: ${email}</p>`
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}