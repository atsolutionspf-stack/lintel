// La web se mudó de lintel.atsolutionspf.workers.dev a dintel.atsolutionspf.workers.dev.
// Este Worker conserva la dirección antigua y lleva cada visita a la misma página en la nueva.
const NEW_HOST = 'dintel.atsolutionspf.workers.dev';

export default {
  fetch(request) {
    const url = new URL(request.url);
    url.hostname = NEW_HOST;
    return Response.redirect(url.toString(), 301);
  },
};
