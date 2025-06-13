// File: app/api/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';

type SuccessResponse = {
    message: string;
};

type ErrorResponse = {
    message: string;
    error?: string;
};

type WebhookData = {
    id: string;
    object: 'payment';
    created_at: string;
    account_id: string;
    reference: string;
    amount: {
        currency: string;
        quantity: string;
    };
    checkout_status: 'open' | 'completed' | 'failed' | 'expired';
    next_action?: {
        checkout_url: string;
    };
    return_url: string;
};

export async function POST(request: NextRequest) {
    try {
        const data: WebhookData = await request.json();

        // Process payment webhook
        console.log('Received payment webhook:', {
            paymentId: data.id,
            status: data.checkout_status,
            amount: `${data.amount.quantity} ${data.amount.currency}`,
            reference: data.reference
        });

        // TODO: Add your payment processing logic here
        // Examples:
        // - Update payment status in your database
        // - Send confirmation emails
        // - Update user's subscription status
        // - Log the payment event

        // If checkout is still open, you might want to track it
        if (data.checkout_status === 'open' && data.next_action?.checkout_url) {
            console.log('Checkout URL:', data.next_action.checkout_url);
        }

        // Respond with a 200 OK to acknowledge receipt of the webhook
        return NextResponse.json<SuccessResponse>(
            { message: 'Webhook received successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing webhook:', error);

        return NextResponse.json<ErrorResponse>(
            {
                message: 'Error processing webhook',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

// Optionally handle other HTTP methods
export async function GET() {
    return NextResponse.json<ErrorResponse>(
        { message: 'Method GET Not Allowed' },
        { status: 405, headers: { 'Allow': 'POST' } }
    );
}

export async function PUT() {
    return NextResponse.json<ErrorResponse>(
        { message: 'Method PUT Not Allowed' },
        { status: 405, headers: { 'Allow': 'POST' } }
    );
}

export async function DELETE() {
    return NextResponse.json<ErrorResponse>(
        { message: 'Method DELETE Not Allowed' },
        { status: 405, headers: { 'Allow': 'POST' } }
    );
}