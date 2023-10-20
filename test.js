import { Response, runHandler } from "./quickcgi.js";
runHandler(async function (req) {
  return Response.json({
    hello: "world",
  });
});
