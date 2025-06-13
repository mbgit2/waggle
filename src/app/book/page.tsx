import {getServices} from "@/lib/db";
import BookingForm from "@/app/book/BookingForm";

export default async function Home() {
    const services = await getServices();

    return (
        <BookingForm services={services}/>
    );
}
