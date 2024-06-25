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
  const [errors, setErrors] = useState<{
    name?: string;
    price?: number;
    quantity?: number;
  }>({});

  useEffect(() => {
    if (isOpen) {
      setFormData(defaultValue);
      setErrors({});
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
    const newErrors: { name?: string; price?: string; quantity: string } = {};

    if (!formData.name) {
      newErrors.name = "Name cannot be empty.";
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than zero.";
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than zero.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onSubmit(formData, type);
      onClose();
    }
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
          <div key={field.name}>
            <label>
              {field.label}:
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={handleChange}
              />
            </label>
            {errors[field.name] && (
              <div className="error-message">{errors[field.name]}</div>
            )}
          </div>
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
