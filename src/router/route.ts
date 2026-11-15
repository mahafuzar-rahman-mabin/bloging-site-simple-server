import type { IncomingMessage, ServerResponse } from "node:http";
import { postController } from "../controllers/post.controller";

export const routeHandeler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "application/JSON" });
    res.end(JSON.stringify({ message: "this is root router" }));
  } else if (url?.startsWith("/blogs")) {
    postController(req, res);
  } else {
    res.writeHead(404, { "content-type": "application/JSON" });
    res.end(JSON.stringify({ message: "this is not route" }));
  }
};
