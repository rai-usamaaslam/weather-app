export async function apiClient(url, options = {}) {
  try {
    const response = await fetch(url, options);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    throw new Error(error.message || "Network error");
  }
}