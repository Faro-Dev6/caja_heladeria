import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

import { SalesHistory } from '../SalesHistory';

export const RightPanel = ({
  sales,
  handleCloseDay
}) => {
  return (
    <div className="w-72 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/40 p-5 flex flex-col shadow-sm">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
        Historial de Ventas
      </h2>

      <SalesHistory sales={sales} />

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleCloseDay}
        className="bg-pos-mint text-gray-700 font-bold py-3 mt-4 rounded-2xl flex items-center justify-center gap-2 border border-green-200/50 hover:bg-green-200 transition-colors"
      >
        <Lock size={16} />
        CERRAR DÍA
      </motion.button>
    </div>
  );
};