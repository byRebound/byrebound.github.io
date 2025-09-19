export async function handler(event, context) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ mycustofeild: "Farts"}),
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
}
