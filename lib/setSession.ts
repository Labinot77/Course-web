// utils/setSession.ts
export const setSessionCookieTest = async (idToken: string) => {
  await fetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: idToken }),
  });
};
