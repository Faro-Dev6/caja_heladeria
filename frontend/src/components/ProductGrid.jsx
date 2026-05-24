import { motion } from 'motion/react';
import { IceCream } from 'lucide-react';

import { IconMap } from '../utils/iconmap';

export const ProductGrid = ({
  products,
  onAddToOrder
}) => {
  return (
    <div className="grid grid-cols-5 gap-2 overflow-y-auto pr-1">
      {products.map((product) => {
        const Icon = IconMap[product.icon] || IceCream;

        return (
          <motion.button
            key={product.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToOrder(product)}
            className="bg-pos-vanilla rounded-xl border border-orange-100 flex flex-col items-center justify-center p-2 shadow-card hover:bg-orange-50 transition-colors group h-[90px]"
          >
            <Icon
              className="mb-1 text-pink-400 group-hover:scale-110 transition-transform"
              size={22}
              strokeWidth={2}
            />

            <span className="text-[10px] uppercase font-bold text-gray-400">
              {product.name}
            </span>

            <span className="text-sm font-black text-gray-800 tracking-tight">
              ${product.price.toFixed(2)}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};