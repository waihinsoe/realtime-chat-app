import axios from "axios";
import { useEffect, useState } from "react";
import { socket } from "./socket/socket";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<any>([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000");
    console.log(response);
  };

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onFooEvent = (value: any) => {
      setFooEvents((previous: any) => [...previous, value]);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);
  return (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <ConnectionManager />
      <MyForm />
      <button style={{ padding: "4px 8px" }} onClick={fetchData}>
        fetchData
      </button>
    </div>
  );
}

export default App;

export function ConnectionState({ isConnected }: { isConnected: any }) {
  return <p>State: {"" + isConnected}</p>;
}

export function Events({ events }: { events: any }) {
  return (
    <ul>
      {events.map((event: any, index: number) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
}

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit("create-something", value, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setValue(e.target.value)} />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
