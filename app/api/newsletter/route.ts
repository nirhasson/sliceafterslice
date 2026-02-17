import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const email = body.email;

        console.log("Processing subscription for:", email);

        // 1. הוספה לרשימת ה-Audience
        // עכשיו כשאתה Verified, זה יופיע בטאב Audience ב-Resend
        try {
            await resend.contacts.create({
                email: email,
                audienceId: '2371deb5-321f-48bd-856c-2793dbafeba4',
            });
            console.log("Added to audience successfully");
        } catch (error) {
            console.error("Audience Error (User might exist):", error);
        }

        // 2. שליחת מייל אישור למשתמש (מהמייל הרשמי שלך!)
        await resend.emails.send({
            from: 'Slice After Slice <info@sliceafterslice.co.il>',
            to: email,
            reply_to: 'nirhasson01@gmail.com',
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
            from: 'Slice After Slice <info@sliceafterslice.co.il>',
            to: 'nirhasson01@gmail.com',
            subject: '🍕 נרשם חדש לניוזלטר!',
            html: `<p>יש לך נרשם חדש באתר: <strong>${email}</strong></p>`
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("General API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}