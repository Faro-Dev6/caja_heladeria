import { AnimatePresence, motion } from 'motion/react';
import {
  Minus,
  Plus,
  Trash2
} from 'lucide-react';

export const OrderSummary = ({
  order,
  subtotal,
  total,
  onUpdateQuantity,
  onRemoveFromOrder
}) => {
  return (
    <div className="bg-pos-pink rounded-2xl p-5 flex flex-col gap-2 border border-pink-100 shadow-sm">
      <div className="flex-1 overflow-y-auto max-h-[160px] pr-2 space-y-2">
        <AnimatePresence mode="popLayout">
          {order.length === 0 ? (
            <p className="text-xs text-center text-pink-400 py-4 italic">
              Selecciona productos para comenzar
            </p>
          ) : (
            order.map((item) => (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-between items-center group"
              >
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-medium text-gray-600 truncate">
                    {item.quantity}x {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-700 text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <div className="flex gap-1">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.productId, -1)
                      }
                      className="p-0.5 hover:bg-pink-100 rounded text-pink-400"
                    >
                      <Minus size={14} />
                    </button>

                    <button
                      onClick={() =>
                        onUpdateQuantity(item.productId, 1)
                      }
                      className="p-0.5 hover:bg-pink-100 rounded text-pink-400"
                    >
                      <Plus size={14} />
                    </button>

                    <button
                      onClick={() =>
                        onRemoveFromOrder(item.productId)
                      }
                      className="p-0.5 hover:bg-red-100 rounded text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <hr className="border-pink-200 my-1" />

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Subtotal
        </span>

        <span className="text-sm">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-gray-800 tracking-tight">
          TOTAL
        </span>

        <span className="text-xl font-black text-pink-600">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};