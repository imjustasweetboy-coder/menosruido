document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const header = document.querySelector('header.banner');
  if (!header) return;

  ScrollTrigger.create({
    trigger: 'body',
    start: 'top -90px',
    onEnter: () => header.classList.add('scrolled'),
    onLeaveBack: () => header.classList.remove('scrolled')
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Asegúrate de que el plugin esté registrado
  gsap.registerPlugin(ScrollTrigger);

  // Selecciona el contenedor que activará la animación
  const sectionTrigger = document.querySelector('container');
  // Selecciona todos los archivos que quieres animar
  const files = gsap.utils.toArray('.titulo');

  if (!sectionTrigger || files.length === 0) return;

  // 1. CONFIGURACIÓN INICIAL (OPCIONAL pero recomendada)
  // Ponemos los archivos en su estado "borroso y fuera de canvas"
  // antes de que empiece la animación para evitar saltos visuales.
  gsap.set(files, {
    opacity: 0,
    y: 100, // Fuera del canvas (hacia abajo, por ejemplo)
    filter: 'blur(10px)', // Borroso
    scale: 0.8 // Un poco más pequeños para dar profundidad
  });

  // 2. CREAMOS LA ANIMACIÓN (TIMELINE)
  // Usamos una Timeline para animar los archivos uno por uno
  const filesTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionTrigger, // El contenedor activa la animación
      start: 'top 80%', // Empieza cuando el contenedor llega al 80% del viewport
      end: 'bottom 20%', // Termina cuando el contenedor está casi saliendo
      scrub: 1, // ¡CLAVE! Enlaza el progreso de la animación al scroll (1 seg de suavizado)
      // markers: true, // Descomenta esto para ver las guías de inicio/fin durante el desarrollo
    }
  });

  // 3. AÑADIMOS LA ANIMACIÓN A LA TIMELINE
  filesTl.to(files, {
    opacity: 1,
    y: 0, // Volver a su posición original (alineados)
    filter: 'blur(0px)', // Nítidos
    scale: 1, // Tamaño original
    stagger: 0.2, // ¡CLAVE! Pequeño retraso entre cada archivo (cascada)
    ease: 'power2.out' // Suavizado de la animación
  });
});