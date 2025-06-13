import { neon, neonConfig } from '@neondatabase/serverless';
import {CreateServiceInput, Service, ServiceWithSubmerchant} from "@/lib/db/types";

// Optional: Configure neon to use Web SQL API in Edge functions
neonConfig.webSocketConstructor = WebSocket;
neonConfig.useSecureWebSocket = true;

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

export const sql = neon(process.env.DATABASE_URL);

export async function getServices(): Promise<Service[]> {
    const results = await sql`SELECT * FROM services`;
    return results as Service[];
}

export async function getActiveServices(): Promise<ServiceWithSubmerchant[]> {
    const results = await sql`
        SELECT s.id as id, s.name as name, s.description as description, s.submerchant as submerchant, s.type as type, s.price as price, sm.acc_id ad submerchantId
        FROM services s
                 JOIN submerchant sm ON sm.name = s.submerchant
        WHERE sm.active = true;
    `;
    return results as ServiceWithSubmerchant[];
}

export async function accountExists(name: string): Promise<boolean> {
    const result = await sql`
        SELECT EXISTS(
            SELECT 1
            FROM submerchant
            WHERE name = ${name}
        )
    `;
    return result[0].exists;
}

export async function createSubMerchantWithServices(
    merchantName: string,
    services: CreateServiceInput[]
): Promise<void> {
    try {
        // Create the submerchant first
        await sql`
            INSERT INTO submerchant (name, active, acc_id)
            VALUES (${merchantName}, false, NULL)
        `;

        // Insert services if any exist
        if (services.length > 0) {
            for (const service of services) {
                await sql`
                    INSERT INTO services(name, description, submerchant, type, price) VALUES(${service.name}, ${service.description}, ${merchantName}, ${service.type}, ${service.price})
                `;
            }
        }

    } catch (error) {
        console.error('Error creating submerchant:', error);
        throw new Error('Failed to create submerchant and services');
    }
}
