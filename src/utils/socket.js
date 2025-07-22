import { io } from "socket.io-client";

// export const socket = io("http://localhost:5000", {
//   withCredentials: true,
//   transports: ["websocket"],
// });
export const socket = io(`${process.env.REACT_APP_COURIERLY_API}`, {
  withCredentials: true,
  transports: ["websocket"],
});
