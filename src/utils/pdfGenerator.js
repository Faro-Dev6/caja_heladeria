import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateClosingPDF = (sales) => {
  if (sales.length === 0) return;

  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  // Cálculos
  const totalRecaudado = sales.reduce((acc, s) => acc + s.total, 0);
  const totalGrams = sales.reduce((acc, s) => acc + (s.totalWeightGrams || 0), 0);
  const totalKilos = totalGrams / 1000;

  // Encabezado
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text("EL REPARTO - Cierre de Caja", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Fecha: ${date} | Hora: ${time}`, 14, 28);

  // Tabla
  const tableData = sales.map(s => [
    `#${String(s.orderNumber).padStart(3, '0')}`,
    s.timestamp,
    s.id,
    s.items.map(item => `${item.quantity}x ${item.name}`).join('\n'),
    s.method.toUpperCase(),
    `${((s.totalWeightGrams || 0) / 1000).toFixed(3)} Kg`,
    `$${s.total.toFixed(2)}`
  ]);

  autoTable(doc,{
    startY: 35,
    head: [['Orden', 'Hora', 'ID Venta', 'Productos', 'Pago', 'Peso', 'Total']],
    body: tableData,
    headStyles: { fillColor: [255, 182, 193], textColor: 255 },
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

  // Resumen al final
  const finalY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(12);
  doc.setTextColor(40);
  doc.text(`Ventas realizadas: ${sales.length}`, 14, finalY);
  doc.text(`Total Helado Despachado: ${totalKilos.toFixed(3)} Kg`, 14, finalY + 7);
  
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(`RECAUDACIÓN TOTAL: $${totalRecaudado.toFixed(2)}`, 14, finalY + 17);

  // Guardar archivo
  doc.save(`Cierre_${date.replace(/\//g, '-')}.pdf`);

};