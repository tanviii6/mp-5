import getCollection  from "@/db";

export default async function getUrl(alias: string): Promise<string | null> {
  if (!alias) {
    return null;
  }

  const links = await getCollection();
  const doc = await links.findOne({ alias });

  if (!doc) {
    return null;
  }

  return doc.url;
}