import {getActiveServices, getServices} from "@/lib/db";
import BookingForm from "@/app/book/BookingForm";

export default async function Home() {
    const services = await getActiveServices();

    return (
        <BookingForm services={services}/>
    );
}
