document.getElementById('buscar_ajax').onclick = () => {

    const artista = document.getElementById('artista_ajax').value;
    const csrf = document.getElementById('_csrf').value;
  
    fetch('/canciones/search-ajax', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'csrf-token': csrf
      },
      body: JSON.stringify({ artista })
    })
    .then(res => res.json())
    .then(data => {
  
      const contenedor = document.getElementById('resultado_ajax');
  
      if (!data.canciones.length) {
        contenedor.innerHTML = '<p>No hay resultados</p>';
        return;
      }
  
      let html = '';
  
      data.canciones.forEach(c => {
        const img = c.imagen
          ? (c.imagen.startsWith('http') ? c.imagen : '/uploads/' + c.imagen)
          : '';
  
        html += `
          <div>
            <h4>${c.titulo}</h4>
            <p>${c.artista}</p>
            <img src="${img}" width="100">
          </div>
        `;
      });
  
      contenedor.innerHTML = html;
    });
  };