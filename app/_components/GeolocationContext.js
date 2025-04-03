"use client";

import { createContext, useContext, useState, useEffect } from "react";

const GeolocationContext = createContext();

export function GeolocationProvider({ children }) {
  const [userIp, setUserIp] = useState(null);
  const [geolocation, setGeolocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchUserIp = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        setUserIp(data.ip);
        fetchGeolocation(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    fetchUserIp();
  }, []);

  const fetchGeolocation = async (ip) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_Kfuvlc9SAtYONaR1V8nUoMQMHB9cI&ipAddress=${ip}`
      );

      if (!response.ok) {
        throw new Error(`Invalid IP or API error (${response.status})`);
      }

      const data = await response.json();

      if (!data.location) {
        throw new Error(
          "Location data not found. Please check the IP address."
        );
      }

      setGeolocation(data);
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GeolocationContext.Provider
      value={{
        userIp,
        geolocation,
        loading,
        fetchGeolocation,
        errorMessage,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
}

// Custom Hook for using the context
export function useGeolocation() {
  return useContext(GeolocationContext);
}
