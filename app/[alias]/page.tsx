import getCollection from "@/db";
import getUrl from "@/lib/getUrl";
import { redirect } from "next/navigation";

export default async function AliasPage({ params, }: { params: Promise<{ alias: string }>; }) {
    const { alias } = await params;
    const url = await getUrl(alias);

    if (url) {
        redirect(url);
    }

    redirect("/");
}

