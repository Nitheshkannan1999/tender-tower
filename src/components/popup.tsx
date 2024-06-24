import React, { useState, useEffect } from "react";

interface PopupProps {
  type: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    item: {
      name: string;
      price: number;
      quantity: number;
      id: string;
    },
    type: string
  ) => void;
  defaultValue: { name: string; price: number; quantity: number; id: string };
}

const Popup: React.FC<PopupProps> = ({
  type,
  isOpen,
  onClose,
  onSubmit,
  defaultValue,
}) => {
  const [formData, setFormData] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) {
      setFormData(defaultValue);
    }
  }, [isOpen, defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" || name === "quantity" ? +value : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData, type);
    onClose();
  };

  if (!isOpen) return null;

  const fields = [
    { label: "Name", type: "text", name: "name", value: formData.name },
    { label: "Price", type: "number", name: "price", value: formData.price },
    {
      label: "Quantity",
      type: "number",
      name: "quantity",
      value: formData.quantity,
    },
  ];

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{`${type} Cart Item`}</h2>
        {fields.map((field) => (
          <label key={field.name}>
            {field.label}:
            <input
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={handleChange}
            />
          </label>
        ))}
        <div className="buttonCont">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
