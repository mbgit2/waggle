export interface SubMerchant {
    name: string,
    acc_id: string
}

export interface Service {
    id: number,
    name: string,
    description: string,
    submerchant: string,
    type: string,
    price: string
}

export interface ServiceWithSubmerchant {
    id: number,
    name: string,
    description: string,
    submerchant: string,
    type: string,
    price: string,
    submerchantId: string
}

export interface Order {
    id: number,
    service: string,
    email: string,
    date: string,
    status: string
}

export interface CreateServiceInput {
    name: string;
    description: string;
    type: string;
    price: string;
}
