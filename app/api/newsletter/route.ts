import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const email = body.email;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        console.log("Newsletter signup attempt for:", email);

        // 1. הוספת המשתמש לרשימת התפוצה ב-Resend (Audience)
        // החלף את 'your-audience-id-here' ב-ID האמיתי מהפאנל של Resend
        await resend.contacts.create({
            email: email,
            audienceId: '2371deb5-321f-48bd-856c-2793dbafeba4',
        });

        // 2. שלח מייל אישור למשתמש (מהדומיין המאומת שלך)
        await resend.emails.send({
            from: 'Slice After Slice <info@sliceafterslice.co.il>',
            to: email, // שולח ישירות למשתמש שנרשם
            subject: 'ברוך הבא לניוזלטר! 🍕',
            html: `
                <div style="direction: rtl; font-family: sans-serif; text-align: right;">
                    <h2>תודה על ההרשמה!</h2>
                    <p>איזה כיף שהצטרפת לקהילה של Slice After Slice.</p>
                    <p>מעכשיו תהיה הראשון לדעת על כל מה שקורה בעולם הפיצה המקומי, לקבל עידכונים שווים והטבות מיוחדות של הקהילה.</p>
                </div>
            `
        });

        // 3. שלח התראה אליך (ניר) על הנרשם החדש
        const notification = await resend.emails.send({
            from: 'Slice After Slice <info@sliceafterslice.co.il>',
            to: 'nirhasson01@gmail.com',
            subject: '🍕 נרשם חדש לניוזלטר!',
            html: `
                <div style="direction: rtl; font-family: sans-serif; text-align: right;">
                    <h2>היי ניר!</h2>
                    <p>יש לך נרשם חדש באתר:</p>
                    <p><strong>אימייל:</strong> ${email}</p>
                    <p>הוא נוסף אוטומטית לרשימת ה-Audience ב-Resend.</p>
                </div>
            `
        });

        console.log("Newsletter process completed successfully");
        return NextResponse.json({ success: true, message: 'Subscribed and notified!' });

    } catch (error: any) {
        console.error("Newsletter error:", error);
        return NextResponse.json(
            { error: error.message || 'Failed to subscribe' },
            { status: 500 }
        );
    }
}