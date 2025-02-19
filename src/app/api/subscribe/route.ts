import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    // Send welcome email
    await resend.emails.send({
      from: 'Henrik <hello@henriktalstad.com>',
      to: email,
      subject: 'Welcome to my newsletter!',
      html: `
        <h1>Thanks for subscribing!</h1>
        <p>I'm excited to share my thoughts on web development, design, and technology with you.</p>
        <p>You'll receive occasional emails from me about:</p>
        <ul>
          <li>Web development tips and tricks</li>
          <li>Design insights</li>
          <li>New blog posts</li>
          <li>Project updates</li>
        </ul>
        <p>Best regards,<br>Henrik</p>
      `,
    })

    // Store subscriber in your database here
    // Example: await prisma.subscriber.create({ data: { email } })

    return NextResponse.json(
      { message: 'Subscribed successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
