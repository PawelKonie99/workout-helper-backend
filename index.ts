import { app } from "./app";
import * as http from "http";

const server = http.createServer(app);

server.listen(3005, () => {
  console.log(`Server is running on port ${3005}`);
});
