import { serveFile } from "https://deno.land/std@0.106.0/http/file_server.ts";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    // Serve the HTML content
    const html = await Deno.readTextFile("choose-license.html");
    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    });
  } else if (url.pathname.startsWith("/bootstrap/")) {
    // Serve Bootstrap files
    const filePath = `.${url.pathname}`;
    return await serveFile(request, filePath);
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
