import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'כל השדות חובה' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Slice After Slice <info@sliceafterslice.co.il>',
      to: 'nirhasson01@gmail.com',
      reply_to: email,
      subject: `📩 פנייה חדשה מ-${name}`,
      html: `
        <div dir="rtl" style="font-family: sans-serif; text-align: right; max-width: 600px;">
          <h2 style="border-bottom: 2px solid #333; padding-bottom: 8px;">פנייה חדשה מהאתר</h2>
          <p><strong>שם:</strong> ${name}</p>
          <p><strong>אימייל:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>הודעה:</strong></p>
          <div style="background: #f5f0e8; padding: 16px; border-right: 4px solid #333; margin-top: 8px;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
