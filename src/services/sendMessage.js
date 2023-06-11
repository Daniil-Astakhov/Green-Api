export const sendMessage = async (id, api, chatId, message) => {
  let url = `https://api.green-api.com/waInstance${id}/sendMessage/${api}`;

  let httpMethod = "POST";

  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({ chatId, message });

  try {
    const response = await fetch(url, {
      method: httpMethod,
      headers,
      body,
    });
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    const data = await response.json();
    console.log("Message sent:", data);
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};
