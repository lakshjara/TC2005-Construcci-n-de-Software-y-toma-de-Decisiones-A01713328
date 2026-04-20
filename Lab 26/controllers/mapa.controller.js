exports.get_mapa = (req, res, next) => {
    res.render('mapa', {
      tituloPagina: 'Mapa musical',
      username: req.session?.username || '',
      googleMapsApiKey: 'PEGA_AQUI_TU_API_KEY'
    });
  };