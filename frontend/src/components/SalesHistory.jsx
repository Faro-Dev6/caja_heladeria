import { AnimatePresence, motion } from 'motion/react';

export const SalesHistory = ({ sales }) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-1">
      <AnimatePresence initial={false}>
        {sales.length === 0 ? (
          <p className="text-[10px] text-center text-gray-400 mt-10">
            No hay ventas registradas
          </p>
        ) : (
          sales.map((sale) => (
            <motion.div
              key={sale.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="py-3 border-bottom border-gray-100 border-b border-black/[0.05] transition-colors hover:bg-white/40 rounded-lg px-2"
            >
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{sale.timestamp}</span>

                <span className="text-pink-400">
                  ORDEN #{String(sale.orderNumber).padStart(3, '0')}
                </span>
              </div>

              <div className="flex justify-between font-bold text-gray-700">
                <span className="text-sm">
                  Venta ID: {sale.id}
                </span>

                <span className="text-sm">
                  ${sale.total.toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};