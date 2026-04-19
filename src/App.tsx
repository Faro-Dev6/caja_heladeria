/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  IceCream, 
  IceCreamCone, 
  Cake, 
  Candy, 
  Lollipop, 
  Cookie, 
  Donut, 
  Cherry, 
  CircleOff,
  History,
  Lock,
  Plus,
  Minus,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, OrderItem, Sale } from './types';

const PRODUCTS: Product[] = [
  { id: '1', name: 'Helado Vainilla', price: 4.50, category: 'Ice Cream', icon: 'IceCream' },
  { id: '2', name: 'Helado Chocolate', price: 4.50, category: 'Ice Cream', icon: 'IceCream' },
  { id: '3', name: 'Paleta Menta', price: 3.25, category: 'Ice Cream', icon: 'IceCreamCone' },
  { id: '4', name: 'Muffin Fresa', price: 3.75, category: 'Pastry', icon: 'Cake' },
  { id: '5', name: 'Algodón Azúcar', price: 2.50, category: 'Candy', icon: 'Candy' },
  { id: '6', name: 'Ositos Goma', price: 1.50, category: 'Candy', icon: 'Cherry' },
  { id: '7', name: 'Popcorn Caramelo', price: 3.00, category: 'Candy', icon: 'Cookie' },
  { id: '8', name: 'Sorbet Blue', price: 4.00, category: 'Ice Cream', icon: 'IceCream' },
  { id: '9', name: 'Cake Macarons', price: 8.50, category: 'Pastry', icon: 'Cake' },
  { id: '10', name: 'Paleta Arcoiris', price: 2.25, category: 'Candy', icon: 'Lollipop' },
  { id: '11', name: 'Cucurucho Suave', price: 3.50, category: 'Ice Cream', icon: 'IceCreamCone' },
  { id: '12', name: 'Donut Glaseado', price: 2.00, category: 'Pastry', icon: 'Donut' },
];

const IconMap: Record<string, any> = {
  IceCream,
  IceCreamCone,
  Cake,
  Candy,
  Lollipop,
  Cookie,
  Donut,
  Cherry,
  Grape: CircleOff // Fallback
};

export default function App() {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [sales, setSales] = useState<Sale[]>([
    { id: '101', timestamp: '14:35', total: 15.50, items: [] },
    { id: '100', timestamp: '13:20', total: 8.75, items: [] },
    { id: '099', timestamp: '12:45', total: 22.00, items: [] },
  ]);

  const subtotal = useMemo(() => order.reduce((sum, item) => sum + (item.price * item.quantity), 0), [order]);
  const total = subtotal; // For now no tax for simplicity in visual design

  const addToOrder = (product: Product) => {
    setOrder(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => item.productId === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { 
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }];
    });
  };

  const removeFromOrder = (productId: string) => {
    setOrder(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setOrder(prev => prev.map(item => {
      if (item.productId === productId) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  const confirmOrder = () => {
    if (order.length === 0) return;
    
    const newSale: Sale = {
      id: Math.floor(Math.random() * 1000).toString(),
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      total,
      items: [...order]
    };

    setSales(prev => [newSale, ...prev]);
    setOrder([]);
  };

  return (
    <div className="flex h-screen w-full p-6 gap-6 bg-pos-creamy">
      {/* Left Panel - Control & Menu */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Header */}
        <header className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-pink-300 rounded-full flex items-center justify-center text-white">
            <IceCream size={18} strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-700">SWEET TREATS POS</h1>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-2">
          {PRODUCTS.map((product) => {
            const Icon = IconMap[product.icon] || IceCream;
            return (
              <motion.button
                key={product.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToOrder(product)}
                className="bg-pos-vanilla rounded-xl border border-orange-100 flex flex-col items-center justify-center p-3 shadow-card hover:bg-orange-50 transition-colors group aspect-[4/3]"
              >
                <Icon className="mb-1 text-pink-400 group-hover:scale-110 transition-transform" size={28} strokeWidth={2} />
                <span className="text-[10px] uppercase font-bold text-gray-400">{product.name}</span>
                <span className="text-sm font-black text-gray-800 tracking-tight">${product.price.toFixed(2)}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-pos-pink rounded-2xl p-5 flex flex-col gap-2 border border-pink-100 shadow-sm">
          <div className="flex-1 overflow-y-auto max-h-[160px] pr-2 space-y-2">
            <AnimatePresence mode="popLayout">
              {order.length === 0 ? (
                <p className="text-xs text-center text-pink-400 py-4 italic">Selecciona productos para comenzar</p>
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
                      <span className="text-sm font-medium text-gray-600 truncate">{item.quantity}x {item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-700 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => updateQuantity(item.productId, -1)} className="p-0.5 hover:bg-pink-100 rounded text-pink-400"><Minus size={14} /></button>
                        <button onClick={() => updateQuantity(item.productId, 1)} className="p-0.5 hover:bg-pink-100 rounded text-pink-400"><Plus size={14} /></button>
                        <button onClick={() => removeFromOrder(item.productId)} className="p-0.5 hover:bg-red-100 rounded text-red-400"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <hr className="border-pink-200 my-1"/>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Subtotal</span>
            <span className="text-sm">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800 tracking-tight">TOTAL</span>
            <span className="text-xl font-black text-pink-600">${total.toFixed(2)}</span>
          </div>
        </div>

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

      {/* Right Panel - History */}
      <div className="w-72 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/40 p-5 flex flex-col shadow-sm">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Historial de Ventas</h2>
        
        <div className="flex-1 flex flex-col overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {sales.map((sale) => (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="py-3 border-bottom border-gray-100 border-b border-black/[0.05] transition-colors hover:bg-white/40 rounded-lg px-2"
              >
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{sale.timestamp}</span>
                  <span className="font-mono">#{sale.id}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-700">
                  <span className="text-sm">Venta ID: {sale.id}</span>
                  <span className="text-sm">${sale.total.toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="bg-pos-mint text-gray-700 font-bold py-3 mt-4 rounded-2xl flex items-center justify-center gap-2 border border-green-200/50 hover:bg-green-200 transition-colors"
        >
          <Lock size={16} />
          CERRAR DÍA
        </motion.button>
      </div>
    </div>
  );
}
