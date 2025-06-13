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

export interface Order {
    id: number,
    service: string,
    email: string,
    date: string,
    status: string
}