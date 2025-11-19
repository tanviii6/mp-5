export default async function getUrlChecker(url: string): Promise<boolean> {
  if (!url) return false;

  try {
    new URL(url);
  } catch {
    return false;
  }

  if (
    url.startsWith("https://cs391-url-shortener.vercel.app") ||
    url.startsWith("http://localhost:3000")
  ) {
    return false;
  }

  try {
    const res = await fetch(url);
    if (res.status < 200 || res.status >= 500) {
      return false;
    }
  } catch {
    return false;
  }

  return true;
}
