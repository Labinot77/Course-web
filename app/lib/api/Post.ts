// app/utils/api.ts
export const postRequest = async <T>(
    url: string,
    body: Record<string, any>
  ): Promise<T> => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}`);
      }
  
      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error("Error in API request:", error);
      throw error;
    }
  };
  