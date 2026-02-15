import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// הגדרת המפתח מחוץ לפונקציה
const resend = new Resend('re_P5wypHGG_6evk5dbbs5wvrVzjzNbDX2pe');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const email = body.email;

        // זה יודפס בטרמינל של ה-VS Code (לא בדפדפן!)
        console.log("---------------------------------");
        console.log("ניסיון הרשמה עבור:", email);
        console.log("---------------------------------");

        const data = await resend.emails.send({
            from: 'Pizza Newsletter <onboarding@resend.dev>',
            to: 'nirhasson01@gmail.com',
            subject: 'נרשם חדש לניוזלטר! 🍕',
            html: `
                <div style="direction: rtl; font-family: sans-serif;">
                    <h2>היי ניר, יש חדשות!</h2>
                    <p>מישהו נרשם לניוזלטר באתר הפיצה שלך.</p>
                    <p>כתובת המייל שלו: <strong>${email}</strong></p>
                </div>
            `
        });

        console.log("תגובה מ-Resend:", data);
        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        console.error("שגיאה ב-API של הניוזלטר:", error);
        return NextResponse.json(
            { error: error.message || "נראה שיש תקלה..." },
            { status: 500 }
        );
    }
}