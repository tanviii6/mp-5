"use server";
import getCollection  from "@/db";

export default async function getAliasChecker(alias: string) : Promise<boolean> {
    const links = await getCollection();
    const data = await links.findOne({alias});
    if (!data){
        return true;
    }else{
        return false;
    }    
}