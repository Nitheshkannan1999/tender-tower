import type { CartItemType } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorDetails.message}`);
  }
  return await response.json();
};

export const fetchCartItems = async (): Promise<CartItemType[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error; 
  }
};

export const addItemToCart = async (item: CartItemType): Promise<CartItemType> => {
  const { id, ...itemWithoutId } = item;
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemWithoutId),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error; 
  }
};

export const updateCartItem = async (item: CartItemType): Promise<CartItemType[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${item?.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error; 
  }
};

export const removeCartItem = async (id: string): Promise<CartItemType[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error; 
  }
};
