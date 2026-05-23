import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateClosingPDF = (sales) => {
  if (sales.length === 0) return;

  const doc = new jsPDF();

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  // =========================
  // CÁLCULOS GENERALES
  // =========================

  const totalSalesAmount = sales.reduce((acc, sale) => {
    return acc + sale.total;
  }, 0);

  const totalClosingAmount = sales.reduce((acc, sale) => {
    return acc + (sale.closingTotal || sale.total);
  }, 0);

  const totalDeliveryAmount =
    totalSalesAmount - totalClosingAmount;

  const totalGrams = sales.reduce((acc, sale) => {
    return acc + (sale.totalWeightGrams || 0);
  }, 0);

  const totalKilos = totalGrams / 1000;

  // =========================
  // ENCABEZADO
  // =========================

  doc.setFontSize(20);
  doc.setTextColor(40);

  doc.text('EL REPARTO - Cierre de Caja', 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100);

  doc.text(
    `Fecha: ${date} | Hora: ${time}`,
    14,
    28
  );

  // =========================
  // TABLA
  // =========================

  const tableData = sales.map((sale) => [
    `#${String(sale.orderNumber).padStart(3, '0')}`,
    sale.timestamp,
    sale.id,
    sale.items
      .map((item) => `${item.quantity}x ${item.name}`)
      .join('\n'),
    sale.method.toUpperCase(),
    `${((sale.totalWeightGrams || 0) / 1000).toFixed(3)} Kg`,
    `$${sale.total.toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 35,

    head: [[
      'Orden',
      'Hora',
      'ID Venta',
      'Productos',
      'Pago',
      'Peso',
      'Total'
    ]],

    body: tableData,

    headStyles: {
      fillColor: [255, 182, 193],
      textColor: 255
    },

    styles: {
      fontSize: 8,
      cellPadding: 3,
      valign: 'middle'
    },

    columnStyles: {
      3: { cellWidth: 60 },
      5: { fontStyle: 'bold' }
    }
  });

  // =========================
  // RESUMEN FINAL
  // =========================

  const finalY = doc.lastAutoTable.finalY + 15;

  doc.setFontSize(12);
  doc.setTextColor(40);
  doc.setFont(undefined, 'normal');

  doc.text(
    `Ventas realizadas: ${sales.length}`,
    14,
    finalY
  );

  doc.text(
    `Total Helado Despachado: ${totalKilos.toFixed(3)} Kg`,
    14,
    finalY + 7
  );

  // =========================
  // TOTALES
  // =========================

  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');

  doc.text(
    `Total vendido: $${totalSalesAmount.toFixed(2)}`,
    14,
    finalY + 20
  );

  doc.text(
    `Total caja real: $${totalClosingAmount.toFixed(2)}`,
    14,
    finalY + 28
  );

  doc.text(
    `Delivery excluido: $${totalDeliveryAmount.toFixed(2)}`,
    14,
    finalY + 36
  );

  // =========================
  // GUARDAR PDF
  // =========================

  doc.save(
    `Cierre_${date.replace(/\//g, '-')}.pdf`
  );
};