// app/api/webhooks/account/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {activateSubmerchant} from "@/lib/db";

// Define types for the account webhook payload
interface Account {
    id: string;
    email?: string;
    name?: string;
    created_at: string;
    reference: string;
    // Add other account fields as needed
}

interface AccountWebhookEvent {
    object: string;
    webhook_endpoint_id: string;
    event_type: string;
    event_time: string;
    livemode: boolean;
    api_version: string;
    account: Account;
}

export async function POST(request: NextRequest) {
    try {
        // Parse the webhook payload
        const event: AccountWebhookEvent = await request.json();

        // Verify it's an account.created event
        if (event.event_type !== 'account.created') {
            return NextResponse.json(
                { error: `Unexpected event type: ${event.event_type}` },
                { status: 400 }
            );
        }

        // Extract account information
        const { account } = event;

        console.log(`New account created: ${account.id}`);
        console.log(`Created at: ${account.created_at}`);

        // TODO: Add your business logic here
        // Examples:
        // - Create user in your database
        // - Send welcome email
        // - Set up default preferences
        // - Initialize user resources

        // Example implementation:
        try {
            console.log(account.reference, account.id)
            activateSubmerchant(account.reference, account.id)
            // Create user in database
            // await db.user.create({
            //   data: {
            //     externalId: account.id,
            //     email: account.email,
            //     name: account.name,
            //     createdAt: new Date(account.created_at),
            //   }
            // });

            // Send welcome email
            // await sendWelcomeEmail(account.email, account.name);

            console.log(`Successfully processed account creation for ${account.id}`);

        } catch (error) {
            console.error('Error processing account creation:', error);
            throw error;
        }

        // Return success response
        return NextResponse.json(
            { received: true, accountId: account.id },
            { status: 200 }
        );

    } catch (error) {
        console.error('Account webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}