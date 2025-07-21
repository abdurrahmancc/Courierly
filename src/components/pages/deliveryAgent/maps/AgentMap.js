import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 23.8103,
  lng: 90.4125,
};

const AgentMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC5mSH_kcqvdQRP01uR547Y7On3wFOn6os",
  });
  const [agentLocation, setAgentLocation] = useState(null);

  useEffect(() => {
    socket.on("agentLocationUpdate", (data) => {
      console.log("Location update:", data);
      setAgentLocation({
        lat: data.lat,
        lng: data.lng,
      });
    });

    return () => {
      socket.off("agentLocationUpdate");
    };
  }, []);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="w-full">
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={agentLocation || center}
        zoom={15}
        >
        {agentLocation && <Marker position={agentLocation} />}
        </GoogleMap>
    </div>
  );
};

export default AgentMap;
