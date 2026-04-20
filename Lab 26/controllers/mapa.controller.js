exports.get_mapa = (req, res, next) => {
    res.render('mapa', {
      tituloPagina: 'Mapa musical',
      username: req.session?.username || '',
      googleMapsApiKey: 'AIzaSyA2zpkGXO8Sd302STiAXsyM8f8fLVm4RNw'
    });
  };