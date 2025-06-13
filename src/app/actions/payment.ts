// app/actions/payment.ts

'use server';

export async function createPayment(amount: string, reference: string, account_id: string) {
    const response = await fetch('https://payment-api.rootline.com/v1/payments', {
        method: 'POST',
        headers: {
            'Rootline-Version': '2024-04-23',
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.ROOTLINE_API_KEY!
        },
        body: JSON.stringify({
            account_id: account_id,
            amount: {
                currency: 'EUR',
                quantity: amount
            },
            reference: reference,
            return_url: `https://waggle-nine.vercel.app/payment-success`
        })
    });

    if (!response.ok) {
        throw new Error('Failed to create payment');
    }

    return response.json();
}