import getCollection from "@/db";
import { redirect } from "next/navigation";

export default async function AliasPage({ params }: { params: Promise<{ alias: string }> }) {
  const { alias } = await params;
    const links = await getCollection();

    const record = await links.findOne({ alias: alias });
    if (!record) {
        return <h1>Alias not found</h1>;
    }

    redirect(record.url);
}

