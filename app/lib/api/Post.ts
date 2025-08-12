export const postRequest = async <T>(
  url: string,
  body: Record<string, any>
): Promise<T> => {
  try {
    let fullUrl = url;
    if (url.startsWith("/")) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      fullUrl = `${baseUrl}${url}`;
    }

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `POST request to ${fullUrl} failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};
