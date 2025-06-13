// app/api/webhooks/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Define types for the webhook payload
interface Amount {
    currency: string;
    quantity: string;
}

interface Payment {
    id: string;
    created_at: string;
    account_id: string;
    reference: string;
    amount: Amount;
    checkout_status: string;
    return_url: string;
}

interface WebhookEvent {
    object: string;
    webhook_endpoint_id: string;
    event_type: string;
    event_time: string;
    livemode: boolean;
    api_version: string;
    payment: Payment;
}

// Optional: Add webhook signature verification
const verifyWebhookSignature = (
    payload: string,
    signature: string | null,
    secret: string
): boolean => {
    // Implement your webhook signature verification logic here
    // This is a placeholder - replace with actual verification
    // Most payment providers use HMAC-SHA256 or similar

    // Example (adjust based on your provider's requirements):
    // const crypto = require('crypto');
    // const expectedSignature = crypto
    //   .createHmac('sha256', secret)
    //   .update(payload)
    //   .digest('hex');
    // return signature === expectedSignature;

    return true; // Remove this line after implementing verification
};

export async function POST(request: NextRequest) {
    try {
        // Get the raw body for signature verification
        const rawBody = await request.text();

        console.log("Received payment webhook", rawBody)

        // Get signature from headers (adjust header name based on your provider)
        const signature = request.headers.get('x-webhook-signature');

        // Verify webhook signature (optional but recommended)
        const webhookSecret = process.env.WEBHOOK_SECRET || '';
        if (webhookSecret && !verifyWebhookSignature(rawBody, signature, webhookSecret)) {
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 401 }
            );
        }

        // Parse the webhook payload
        const event: WebhookEvent = JSON.parse(rawBody);

        // Handle different event types
        switch (event.event_type) {
            case 'payment.succeeded':
                await handlePaymentSucceeded(event);
                break;

            case 'payment.failed':
                await handlePaymentFailed(event);
                break;

            case 'payment.pending':
                await handlePaymentPending(event);
                break;
            case 'authorization.approved':
                await handleAuthorizationApproved(event);
                break;
            default:
                console.log(`Unhandled event type: ${event.event_type}`);
        }

        // Return success response
        return NextResponse.json(
            { received: true },
            { status: 200 }
        );

    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}

// Handler functions for different event types
async function handlePaymentSucceeded(event: WebhookEvent) {
    const { payment } = event;

    console.log(`Payment succeeded: ${payment.id}`);
    console.log(`Amount: ${payment.amount.quantity} ${payment.amount.currency}`);
    console.log(`Reference: ${payment.reference}`);

    // TODO: Implement your business logic here
    // Examples:
    // - Update order status in database
    // - Send confirmation email
    // - Update user subscription
    // - Trigger fulfillment process

    try {
        // Example database update (adjust to your ORM/database)
        // await db.payment.update({
        //   where: { id: payment.id },
        //   data: {
        //     status: 'succeeded',
        //     processedAt: new Date(event.event_time),
        //   }
        // });

        // Example email notification
        // await sendEmail({
        //   to: getUserEmail(payment.account_id),
        //   subject: 'Payment Successful',
        //   template: 'payment-success',
        //   data: { payment }
        // });

    } catch (error) {
        console.error('Error processing payment success:', error);
        throw error; // Re-throw to trigger 500 response
    }
}

async function handlePaymentFailed(event: WebhookEvent) {
    const { payment } = event;

    console.log(`Payment failed: ${payment.id}`);

    // TODO: Handle failed payment
    // - Update order status
    // - Notify customer
    // - Log for retry attempts
}

async function handlePaymentPending(event: WebhookEvent) {
    const { payment } = event;

    console.log(`Payment pending: ${payment.id}`);

    // TODO: Handle pending payment
    // - Update order status to pending
    // - Set up monitoring for status changes
}

async function handleAuthorizationApproved(event: WebhookEvent) {
    console.log(event)
    const response = await fetch(`https://payment-api.staging.rootline.com/v1/payment/${event.payment.id}/capture`, {
        method: 'POST',
        headers: {
            'Rootline-Version': '2024-04-23',
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.ROOTLINE_API_KEY!
        },
        body: JSON.stringify({
            reference: `capture request ${event.payment.id}`
        })
    });
    const data = await response.json();
    console.log(data)
}

// Optional: Add request size limit for webhooks
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
};