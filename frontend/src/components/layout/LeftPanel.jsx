import { motion } from 'motion/react';
import { IceCream } from 'lucide-react';

import { PRODUCTS } from '../../data/products';

import { ProductGrid } from '../ProductGrid';
import { OrderSummary } from '../OrderSummary';

export const LeftPanel = ({
  order,
  subtotal,
  total,
  addToOrder,
  updateQuantity,
  removeFromOrder,
  confirmOrder
}) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col gap-4 overflow-hidden">
      <header className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 bg-pink-300 rounded-full flex items-center justify-center text-white">
          <IceCream size={18} strokeWidth={2.5} />
        </div>

        <h1 className="text-xl font-bold tracking-tight text-gray-700">
          Caja Heladeria
        </h1>
      </header>

      <ProductGrid
        products={PRODUCTS}
        onAddToOrder={addToOrder}
      />

      <OrderSummary
        order={order}
        subtotal={subtotal}
        total={total}
        onUpdateQuantity={updateQuantity}
        onRemoveFromOrder={removeFromOrder}
      />

      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={order.length === 0}
        onClick={confirmOrder}
        className={`bg-pos-blue text-white font-bold py-4 rounded-full text-lg tracking-widest shadow-confirm uppercase transition-all
          ${order.length === 0 ? 'opacity-50 grayscale' : 'hover:brightness-105'}
        `}
      >
        Confirmar Pedido
      </motion.button>
    </div>
  );
};