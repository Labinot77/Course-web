export const deleteRequest = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`DELETE request to ${url} failed with status ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("DELETE request error:", error);
    throw error;
  }
};
