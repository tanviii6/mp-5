"use server";

import { UrlProps } from "@/components/UrlProps";
import getCollection,{URL_COLLECTION}  from "@/db";
import getAliasChecker from "./getAliasChecker";

export default async function postAlias(alias: string, url: string): Promise<UrlProps | null>{
      console.log("creating new alias");

    const p = {
        alias: alias,
        url: url
    };

    const isAvailable = await getAliasChecker(alias);
    if (!isAvailable) {
        console.log("Alias already exists!");
        return null;
    }


    const links = await getCollection(URL_COLLECTION);
    const res = await links.insertOne({...p});

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return { ...p, id: res.insertedId.toHexString() };

}