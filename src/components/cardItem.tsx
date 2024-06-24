import React from "react";
import type { CartItemType } from "../types";

interface Props {
  item: CartItemType;
  onUpdate: (id: string, quantity: number, price: number, name: string) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<Props> = ({ item, onUpdate, onRemove }) => {
  const itemDetails = [
    { label: "Name", value: item.name, className: "cart-item-name" },
    {
      label: "Price",
      value: `$${item.price.toFixed(2)}`,
      className: "cart-item-price",
    },
    {
      label: "Quantity",
      value: item.quantity,
      className: "cart-item-quantity",
    },
  ];

  return (
    <li className="cart-item">
      <div className="cart-item-left">
        {itemDetails.map((detail) => (
          <div className="cart-item-details" key={detail.label}>
            <div className="cart-item-header">{detail.label}:</div>
            <span className={detail.className}>{detail.value}</span>
          </div>
        ))}
      </div>
      <div className="cart-item-right">
        <button
          className="cart-item-update"
          onClick={() =>
            onUpdate(item.id, item.quantity, item.price, item.name)
          }
        >
          Update
        </button>
        <button className="cart-item-remove" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
