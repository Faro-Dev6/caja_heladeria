import { 
  useEffect,
  useMemo,
  useState
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  saveData,
  loadData
} from '../services/localStorage.service';

export const useOrder = () => {
  const [order, setOrder] = useState(() => {
    return loadData('order', []);
  });

  const subtotal = useMemo(() => {
    return order.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }, [order]);

  useEffect(() => {
    saveData('order', order);
  }, [order]);

  const total = subtotal;

  const addToOrder = (product) => {
    setOrder((prevOrder) => {
      const existingProduct = prevOrder.find(
        (item) => item.productId === product.id
      );

      if (existingProduct) {
        return prevOrder.map((item) => {
          if (item.productId === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }

          return item;
        });
      }

      return [
        ...prevOrder,
        {
          id: uuidv4(),
          productId: product.id,
          name: product.name,
          price: product.price,
          weightInGrams: product.weightInGrams,
          excludeFromClosing: product.excludeFromClosing || false,
          quantity: 1
        }
      ];
    });
  };

  const removeFromOrder = (productId) => {
    setOrder((prevOrder) => {
      return prevOrder.filter(
        (item) => item.productId !== productId
      );
    });
  };

  const updateQuantity = (productId, delta) => {
    setOrder((prevOrder) => {
      return prevOrder.map((item) => {
        if (item.productId === productId) {
          const nextQuantity = item.quantity + delta;

          return nextQuantity > 0
            ? {
                ...item,
                quantity: nextQuantity
              }
            : item;
        }

        return item;
      });
    });
  };

  const clearOrder = () => {
    setOrder([]);
  };

  return {
    order,
    subtotal,
    total,
    addToOrder,
    removeFromOrder,
    updateQuantity,
    clearOrder
  };
};