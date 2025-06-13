"use server";

import { redirect } from "next/navigation";
import {accountExists, createSubMerchantWithServices} from "@/lib/db";

export async function createOnboarding(formData: FormData) {
    const name = formData.get("name") as string;

    if (!name) {
        throw new Error("Name is required");
    }

    if (await accountExists(name)) {
        throw new Error(`An account with the name "${name}" already exists`);
    }

    const servicesJson = formData.get("services") as string;

    const services = JSON.parse(servicesJson);

    if (!servicesJson || !services || services.length == 0) {
        throw new Error("Services are required");
    }

    console.log({ name, services });

    await createSubMerchantWithServices(name, services);

    redirect("https://onboarding.rootline.com/onboarding/orange?reference=" + name);
}