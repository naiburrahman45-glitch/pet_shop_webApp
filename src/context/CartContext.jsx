import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToCart = (product, quantity=1) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? {...item, quantity:item.quantity + quantity} : item);
      return [...prev, {...product, quantity}];
    });
    setDrawerOpen(true);
  };

  const updateQuantity = (id, quantity) => {
    setItems(prev => quantity <= 0 ? prev.filter(item => item.id !== id) : prev.map(item => item.id === id ? {...item, quantity} : item));
  };
  const removeFromCart = id => setItems(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setItems([]);
  const subtotal = useMemo(() => items.reduce((sum,item)=>sum + item.price*item.quantity,0), [items]);
  const delivery = subtotal === 0 ? 0 : subtotal >= 75 ? 0 : 6;
  const total = subtotal + delivery;
  const count = items.reduce((sum,item)=>sum+item.quantity,0);

  return <CartContext.Provider value={{items,addToCart,updateQuantity,removeFromCart,clearCart,subtotal,delivery,total,count,drawerOpen,setDrawerOpen}}>
    {children}
  </CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);