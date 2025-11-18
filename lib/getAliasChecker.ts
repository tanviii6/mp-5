"use server";
import getCollection,{URL_COLLECTION}  from "@/db";

export default async function getAliasChecker(alias: string) : Promise<boolean> {
    const links = await getCollection(URL_COLLECTION);
    const data = await links.findOne({alias});
    if (!data){
        return true;
    }else{
        return false;
    }    


}