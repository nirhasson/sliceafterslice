import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const email = body.email;

        // 1. הוספה לרשימת ה-Audience (כדי שתראה אותם בתוך Resend)
        try {
            await resend.contacts.create({
                email: email,
                audienceId: '2371deb5-321f-48bd-856c-2793dbafeba4',
            });
        } catch (audienceError) {
            console.error("Audience error (maybe user exists):", audienceError);
            // אנחנו ממשיכים גם אם זה נכשל, כדי שהמיילים יישלחו
        }

        // 2. שליחת מייל אישור למשתמש שנרשם
        await resend.emails.send({
            from: 'onboarding@resend.dev', // שנה ל-info@sliceafterslice.co.il ברגע שהדומיין מאומת
            to: email, // המייל של המשתמש
            subject: 'ברוך הבא לניוזלטר! 🍕',
            html: `
                <div dir="rtl" style="font-family: sans-serif; text-align: right;">
                    <h2>תודה שנרשמת!</h2>
                    <p>איזה כיף שהצטרפת ל-Slice After Slice. מעכשיו תהיה הראשון לדעת על כל מחשבון או מתכון חדש.</p>
                </div>
            `
        });

        // 3. שליחת התראה אליך (ניר)
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'nirhasson01@gmail.com',
            subject: 'נרשם חדש לניוזלטר! 🍕',
            html: `<p>יש לך נרשם חדש: <strong>${email}</strong></p>`
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}