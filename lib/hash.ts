/** SHA-256 hash (hex). Works in both server and client contexts. */
export async function hashPassword(password: string): Promise<string> {
  const buf = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
