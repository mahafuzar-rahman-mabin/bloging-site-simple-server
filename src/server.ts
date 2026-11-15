import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";
import { routeHandeler } from "./router/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    routeHandeler(req, res);
  },
);

server.listen(3000, () => {
  console.log("server is running");
});
