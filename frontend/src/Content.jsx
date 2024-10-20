import styles from "./Content.module.css"
import { useState, useEffect } from "react";

function Content() {

  const [playercount, setPlayercount] = useState(0);
  const [status, setStatus] = useState("");
  useEffect(() => {
    const socket = new WebSocket('wss://mononoke.troytran.com/ws/');

    socket.onopen = () => {
      console.log("connected to websocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPlayercount(data.playerCount);
      setStatus(data.online ? "LIVE" : "OFFLINE");
    };
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    socket.onclose = () => {
      console.log("disconnected from websocket");
    }

    return () => {
      socket.close();
    }
  }, [])
  return (<>
    <div className={styles.container}>
      <h1>Princess Mononoke's 1.21.1 Minecraft Server</h1>
      <h2>Server Address: mononoke.troytran.com:25565</h2>
      <div>
        <h2>Status: <b>{status}</b></h2>
        <h2>Active Player Count: <b>{playercount}</b></h2>
      </div>
      <img src="https://images.fathomevents.com/image/upload/w_2000,dpr_2,f_auto,q_auto/v1711664759/Events/2024/1919/WebsiteHeroImage_1920x1080.jpg.jpg" />
      <h2>if you give me cancer i will ip ban you</h2>
    </div>
  </>)
}
export default Content
