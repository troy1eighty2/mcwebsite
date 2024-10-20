import { WebSocketServer } from "ws";
import { status } from "minecraft-server-util";


const SERVER_HOST = "mononoke.troytran.com";
const SERVER_PORT = 25565;

const wss = new WebSocketServer({ port: 3002 });

const getServerStatus = async () => {
  try {
    const response = await status(SERVER_HOST, SERVER_PORT);
    return {
      online: true,
      playerCount: response.players.online,
    };
  } catch (error) {
    return {
      online: false,
      playerCount: 0,
    };
  }
};
wss.on('connection', (ws) => {

  getServerStatus().then((status) => {
    ws.send(JSON.stringify(status));

  });

  ws.on("close", () => {
    console.log("client disconnected");
  });

});

console.log("websocket running");
