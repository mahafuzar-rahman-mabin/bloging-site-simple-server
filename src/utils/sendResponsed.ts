import type { ServerResponse } from "node:http";

export const sendResponsed = (
  res: ServerResponse,
  port: number,
  status: boolean,
  message: string,
  data?: any,
) => {
  const responsed = {
    status,
    message,
    data,
  };
  res.writeHead(port, { "content-type": "application/JSON" });
  res.end(JSON.stringify(responsed));
};
