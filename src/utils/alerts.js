import Swal from "sweetalert2";

export const showPaymentAlert = async (subtotal) => {
  return await Swal.fire({
    title: "Seleccionar Medio de Pago",
    html: `
      <div class="py-4">
        <p class="text-gray-500 uppercase text-xs font-bold tracking-widest mb-1">Total a cobrar</p>
        <p id="swal-total-display" class="text-3xl font-black text-gray-800">
          $${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </p>
        <div id="swal-extra-info" class="h-5 mt-1"></div>
      </div>
    `,
    input: "select",
    inputOptions: {
      efectivo: "Efectivo",
      debito: "Débito",
      credito: "Crédito (7% recargo)",
      transferencia: "Transferencia",
    },
    inputPlaceholder: "Elija una opción",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#4FACF0",
    cancelButtonColor: "#ff9494",
    background: "#FFFDF2",
    customClass: {
      popup: "rounded-3xl",
      title: "text-gray-700 font-bold",
    },

didOpen: () => {
      const select = Swal.getInput();
      const totalDisplay = document.getElementById('swal-total-display');
      const extraInfo = document.getElementById('swal-extra-info');
      
      select.addEventListener('change', () => {
        const selectedValue = select.value;
        
        if (selectedValue === 'credito') {
          const totalConRecargo = subtotal * 1.07;
          totalDisplay.innerText = `$${totalConRecargo.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
          totalDisplay.classList.add('text-pink-600'); 
          extraInfo.innerHTML = '<span class="text-xs text-pink-400 font-bold">INCLUYE 7% RECARGO</span>';
        } else {
          totalDisplay.innerText = `$${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
          totalDisplay.classList.remove('text-pink-600');
          extraInfo.innerHTML = '';
        }
      });
    },
    inputValidator: (value) => {
      if (!value) {
        return "Debes seleccionar un medio de pago para continuar";
      }
    },
  });
};

export const showSuccessAlert = (totalFinal) => {
  Swal.fire({
    title: "¡Venta Exitosa!",
    text: `Se ha registrado el pago por $${totalFinal.toFixed(2)}`,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    background: "#FFFDF2",
    iconColor: "#B9FBC0",
  });
};

export const showCloseDayAlert = () => {
  return Swal.fire({
    title: '¿Cerrar caja?',
    text: "Se generará el reporte PDF y se vaciará el historial.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#B9FBC0', 
    cancelButtonColor: '#ff9494',  
    confirmButtonText: 'Sí, cerrar día',
    cancelButtonText: 'Cancelar',
    reverseButtons: true 
  });
};