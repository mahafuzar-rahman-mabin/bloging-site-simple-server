import type { IncomingMessage, ServerResponse } from "node:http";

export const routeHandeler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "application/JSON" });
    res.end(JSON.stringify({ massage: "this is root router" }));
  } else if (url?.startsWith("/products")) {
    res.writeHead(200, { "content-type": "application/JSON" });
    res.end(JSON.stringify({ massage: "This is products route" }));
  } else {
    res.writeHead(404, { "content-type": "application/JSON" });
    res.end(JSON.stringify({ massage: "this is not route" }));
  }
};
