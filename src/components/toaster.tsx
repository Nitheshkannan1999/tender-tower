import React, { useEffect, useState } from "react";

interface ToasterProps {
  message: string | null; // Define the type of 'message'
}

const Toaster: React.FC<ToasterProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // Hide the toaster after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message]);

  return <div className={`toaster ${visible ? "visible" : ""}`}>{message}</div>;
};

export default Toaster;
