export const getRequest = async <T>(url: string): Promise<T> => {
  try {
    // If url starts with '/', prepend base URL for server-side fetch
    let fullUrl = url;
    if (url.startsWith("/")) {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL;
      fullUrl = `${baseUrl}${url}`;
    }

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`GET request to ${fullUrl} failed with status ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};