export async function safeJsonParse(response: Response) {
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Invalid response type: ${contentType}`);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error(
      `Failed to parse JSON: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
