// mod.ts

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    // Serve the HTML content
    const htmlResponse = await fetch("https://yourdomain.com/choose-license.html");
    return new Response(htmlResponse.body, {
      status: htmlResponse.status,
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    });
  } else if (url.pathname === "/api/select-answer") {
    // Handle user's answer
    const params = url.searchParams;
    const question = params.get("question");
    const answer = params.get("answer");

    // Example: You can process the answer here (e.g., save to database, return results)
    const result = {
      question,
      answer,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  } else {
    return new Response("Not found", { status: 404 });
  }
}
