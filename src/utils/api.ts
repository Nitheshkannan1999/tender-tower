import type { CartItemType } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchCartItems = async (): Promise<CartItemType[]> => {
  const response = await fetch(`${API_BASE_URL}/cart`);
  return await response.json();
};

export const addItemToCart = async (item: CartItemType): Promise<CartItemType> => {
  // Create a new object without the 'id' property
  const { id, ...itemWithoutId } = item;
  
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemWithoutId),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  return await response.json();
};


export const updateCartItem = async (item : CartItemType): Promise<CartItemType[]> => {
  const response = await fetch(`${API_BASE_URL}/cart/${item?.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({...item }),
  });
  return await response.json();
};

export const removeCartItem = async (id: string): Promise<CartItemType[]> => {
  const response = await fetch(`${API_BASE_URL}/cart/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};
