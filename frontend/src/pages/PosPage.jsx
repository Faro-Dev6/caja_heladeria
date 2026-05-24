import { LeftPanel } from '../components/layout/LeftPanel';
import { RightPanel } from '../components/layout/RightPanel';

import { useOrder } from '../hooks/useOrder';
import { useSales } from '../hooks/useSales';

export const PosPage = () => {
  const {
    order,
    subtotal,
    total,
    addToOrder,
    updateQuantity,
    removeFromOrder,
    clearOrder
  } = useOrder();

  const {
    sales,
    confirmOrder,
    handleCloseDay
  } = useSales({
    order,
    subtotal,
    clearOrder
  });

  return (
    <div className="flex h-screen overflow-hidden w-full p-6 gap-6 bg-pos-creamy">
      <LeftPanel
        order={order}
        subtotal={subtotal}
        total={total}
        addToOrder={addToOrder}
        updateQuantity={updateQuantity}
        removeFromOrder={removeFromOrder}
        confirmOrder={confirmOrder}
      />

      <RightPanel
        sales={sales}
        handleCloseDay={handleCloseDay}
      />
    </div>
  );
};