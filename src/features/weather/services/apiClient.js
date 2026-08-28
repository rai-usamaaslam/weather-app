export async function apiClient(url, options = {}) {
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    throw new Error(
      "Network error. Please check your internet connection."
    );
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Invalid response from weather service."
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
}