import {
  useEffect,
  useState
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  showPaymentAlert,
  showSuccessAlert,
  showCloseDayAlert
} from '../utils/alerts';

import { generateClosingPDF } from '../utils/pdfGenerator';
import {
  saveData,
  loadData,
  removeData
} from '../services/localStorage.service';

export const useSales = ({
  order,
  subtotal,
  clearOrder
}) => {
  const [sales, setSales] = useState(() => {
    return loadData('sales', []);
  });
  useEffect(() => {
    saveData('sales', sales);
  }, [sales]);

  const confirmOrder = async () => {
    if (order.length === 0) return;

    const result = await showPaymentAlert(subtotal);

    if (!result.isConfirmed || !result.value) {
      return;
    }

    const paymentMethod = result.value;

    let finalTotal = subtotal;

    if (paymentMethod === 'credito') {
      finalTotal = subtotal * 1.07;
    }

    const productsClosingTotal = order.reduce((sum, item) => {
  if (item.excludeFromClosing) {
    return sum;
  }

  return sum + item.price * item.quantity;
}, 0);

const creditSurcharge =
  paymentMethod === 'credito'
    ? subtotal * 0.07
    : 0;

const closingTotal =
  productsClosingTotal + creditSurcharge;

    const totalWeightGrams = order.reduce((sum, item) => {
      return sum + item.weightInGrams * item.quantity;
    }, 0);

    const newSale = {
      id: uuidv4().split('-')[0].toUpperCase(),
      orderNumber: sales.length + 1,
      timestamp: new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      total: finalTotal,
      closingTotal,
      method: paymentMethod,
      items: [...order],
      totalWeightGrams
    };

    setSales((prevSales) => [newSale, ...prevSales]);

    clearOrder();

    showSuccessAlert(finalTotal);
  };

  const handleCloseDay = async () => {
    if (sales.length === 0) {
      return;
    }

    const result = await showCloseDayAlert();

    if (result.isConfirmed) {
      generateClosingPDF(sales);

      setSales([]);
      removeData('sales');
      removeData('order');

      clearOrder();
    }
  };

  return {
    sales,
    confirmOrder,
    handleCloseDay
  };
};