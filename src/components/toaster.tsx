import React, { useEffect, useState } from "react";

interface ToasterProps {
  message: string | null; // Define the type of 'message',
  setMessage: (msg: string) => void;
}

const Toaster: React.FC<ToasterProps> = ({ message, setMessage }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setMessage("");
      }, 2000); // Hide the toaster after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [message]);

  return <div className={`toaster ${visible ? "visible" : ""}`}>{message}</div>;
};

export default Toaster;
