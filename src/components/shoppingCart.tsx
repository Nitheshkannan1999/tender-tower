import React, { useState, useEffect } from "react";
import CartItem from "./cardItem";
import {
  fetchCartItems,
  addItemToCart,
  updateCartItem,
  removeCartItem,
} from "../utils/api";
import type { CartItemType } from "../types";
import Toaster from "./toaster";
import Popup from "./popup";

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupDefaultValue, setPopupDefaultValue] = useState<CartItemType>({
    name: "",
    price: 0,
    quantity: 1,
    id: "",
  });

  const loadCartItems = async () => {
    try {
      const items = await fetchCartItems();
      setCartItems(items);
    } catch (error) {
      console.error("Error loading cart items:", error);
    }
  };

  const handleOpenPopup = (
    type: string,
    item: CartItemType = popupDefaultValue
  ) => {
    setPopupDefaultValue(item);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupDefaultValue({
      name: "",
      price: 0,
      quantity: 1,
      id: "",
    });
  };

  const handleAddOrUpdateCartItem = async (
    item: CartItemType,
    type: string
  ) => {
    try {
      const updatedCart =
        type === "Add"
          ? [...cartItems, await addItemToCart(item)]
          : await updateCartItem(item);
      setCartItems(updatedCart);
      setMessage("");
      setMessage(`Cart Item ${type.toLowerCase()}d successfully`);
    } catch (error) {
      console.error(`Error ${type.toLowerCase()}ing item in cart:`, error);
    } finally {
      setIsPopupOpen(false);
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      const updatedCart = await removeCartItem(id);
      setCartItems(updatedCart);
      setMessage("");
      setMessage("Cart Item removed successfully");
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  return (
    <>
      <div className="shopping-cart">
        <h1>Shopping Cart</h1>
        <ul>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdate={() => handleOpenPopup("Update", item)}
              onRemove={() => handleRemoveItem(item.id)}
            />
          ))}
        </ul>
        <button
          onClick={() => handleOpenPopup("Add")}
          className="add-item-button"
        >
          Add Item
        </button>
      </div>
      <Toaster message={message} setMessage={setMessage} />
      <Popup
        type={popupDefaultValue.id ? "Update" : "Add"}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleAddOrUpdateCartItem}
        defaultValue={popupDefaultValue}
      />
    </>
  );
};

export default ShoppingCart;
