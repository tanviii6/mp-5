import getCollection, { URL_COLLECTION } from "@/db";
import { redirect } from "next/navigation";

export default async function AliasPage(props: { params: Promise<{ alias: string }> }) {
    const { alias } = await props.params;
    const links = await getCollection(URL_COLLECTION);

    const record = await links.findOne({ alias: alias });
    if (!record) {
        return <h1>Alias not found</h1>;
    }

    redirect(record.url);
}

