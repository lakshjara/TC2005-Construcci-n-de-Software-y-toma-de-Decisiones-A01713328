const IVA = 0.16;

const productos = {
  Numeros:  { nombre: 'Vela de números de los ángeles',  precio: 295, desc: 'Aroma fresco y cálido ideal para despejar la mente.' },
  Calaverita: { nombre: 'Vela de calaverita de azúcar', precio: 95, desc: 'Aroma a cempasúchil, perfecta para el altar de Día de Muertos.' },
  CafCan:   { nombre: 'Vela de Café y Canela',   precio: 295, desc: 'Aroma a café, clavo, vainilla y canela, con sensación cálida y hogareña.' },
};

const carrito = { Numeros: 0, vainiCalaverita: 0, CafCan: 0 };

const ticketBody   = document.getElementById('ticketBody');
const generalHelp  = document.getElementById('generalHelp');
const finalMessage = document.getElementById('finalMessage');
const finalText    = document.getElementById('finalMessageText');

function $(id) { return document.getElementById(id); }
function fmt(n) { return '$' + n.toFixed(2); }

function validar(key) {
  const input = $('qty' + key[0].toUpperCase() + key.slice(1));
  const help  = $('help'  + key[0].toUpperCase() + key.slice(1));
  const val   = Number(input.value);

  input.classList.remove('invalid-input', 'valid-input');

  if (!Number.isInteger(val) || val < 0) {
    help.textContent = 'Ingresa un número entero positivo.';
    input.classList.add('invalid-input');
    return false;
  }

  help.textContent = val > 0 ? `${val} unidad(es) — ${fmt(val * productos[key].precio)}` : '';
  if (val > 0) input.classList.add('valid-input');
  return true;
}

function renderTicket() {
  const items = Object.keys(carrito).filter(k => carrito[k] > 0);

  if (items.length === 0) {
    ticketBody.innerHTML = '<tr><td colspan="4" class="has-text-centered">Aún no has agregado productos.</td></tr>';
  } else {
    ticketBody.innerHTML = items.map(k => {
      const sub = carrito[k] * productos[k].precio;
      return `<tr><td>${productos[k].nombre}</td><td>${fmt(productos[k].precio)}</td><td>${carrito[k]}</td><td>${fmt(sub)}</td></tr>`;
    }).join('');
  }

  const subtotal = Object.keys(carrito).reduce((acc, k) => acc + carrito[k] * productos[k].precio, 0);
  $('subtotal').textContent = fmt(subtotal);
  $('iva').textContent      = fmt(subtotal * IVA);
  $('total').textContent    = fmt(subtotal * (1 + IVA));
}

function agregar(key) {
  if (!validar(key)) return;
  const input = $('qty' + key[0].toUpperCase() + key.slice(1));
  const qty   = Number(input.value);

  if (qty === 0) { generalHelp.textContent = 'Escribe una cantidad mayor a 0.'; return; }

  carrito[key] += qty;
  input.value = 0;
  input.classList.remove('valid-input');
  finalMessage.classList.add('is-hidden');
  renderTicket();
  generalHelp.textContent = `${productos[key].nombre} agregada al ticket.`;
}

document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => agregar(btn.dataset.product));
});

Object.keys(productos).forEach(key => {
  const card  = $('card' + key[0].toUpperCase() + key.slice(1));
  const input = $('qty'  + key[0].toUpperCase() + key.slice(1));

  card.addEventListener('mouseenter', () => {
    card.classList.add('highlight-card');
    generalHelp.textContent = `${productos[key].nombre}: ${productos[key].desc}`;
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('highlight-card');
    generalHelp.textContent = 'Pasa el cursor sobre una vela para ver su descripción.';
  });

  input.addEventListener('input', () => validar(key));
});

$('clearTicketBtn').addEventListener('click', () => {
  Object.keys(carrito).forEach(k => carrito[k] = 0);
  renderTicket();
  finalMessage.classList.add('is-hidden');
  generalHelp.textContent = 'Ticket vaciado.';
});

$('confirmBtn').addEventListener('click', () => {
  const total = Object.values(carrito).reduce((a, b) => a + b, 0);
  finalMessage.classList.remove('is-hidden', 'is-success', 'is-warning');

  if (total === 0) {
    finalMessage.classList.add('is-warning');
    finalText.textContent = 'Tu ticket está vacío. Agrega productos antes de confirmar.';
  } else {
    const monto = Object.keys(carrito).reduce((acc, k) => acc + carrito[k] * productos[k].precio, 0);
    finalMessage.classList.add('is-success');
    finalText.textContent = `Compra confirmada. ${total} producto(s), total: ${fmt(monto * (1 + IVA))}.`;
  }
});

renderTicket();