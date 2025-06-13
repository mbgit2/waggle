import { neon, neonConfig } from '@neondatabase/serverless';
import {Service} from "@/lib/db/types";

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
