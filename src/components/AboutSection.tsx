const ITEMS = [
  {
    title: '¿Qué es el BPM?',
    body: 'Beats por minuto: cuántos pulsos tiene la canción en 60 segundos. En bachata, cuanto más alto el BPM, más rápido tienes que mover los pies para seguir el paso básico de 8 tiempos.',
  },
  {
    title: '¿Derecho o majao?',
    body: 'Son dos formas de marcar la rotura del paso básico (hacia qué lado y en qué tiempo rompes). No es una propiedad física del audio — es una decisión de técnica del bailarín, aunque el acento de la guira/bajo de cada canción suele hacer que una de las dos se sienta más natural. Por eso aquí se presenta como sugerencia pedagógica, no como un hecho medido.',
  },
  {
    title: '¿Qué es el "mambo"?',
    body: 'El tramo instrumental de muchas bachatas (sin voz, con la guira y el bongó más protagonistas) donde se suele soltar el paso básico y lucir pasos sueltos o shines. Reconocerlo de oído es una habilidad en sí misma.',
  },
  {
    title: '¿Cómo uso el contador 1-8?',
    body: 'Abre una canción y dale a reproducir en YouTube: el número grande arranca ya calibrado con el primer beat real detectado por un análisis de audio (AcousticBrainz), no con una suposición a 0. Si tu vídeo usa otra mezcla y el "1" no encaja del todo, ajústalo con los botones de ±0.05s — queda guardado para esa canción, y puedes restablecer el valor real cuando quieras.',
  },
  {
    title: '¿El tempo se mantiene igual toda la canción?',
    body: 'Lo comprobamos de verdad: analizamos cada beat real de la canción completa (no solo el primero) y en varias encontramos que la intro o el final tienen un tempo ligeramente distinto al resto. Recalibramos el punto de partida usando la parte estable de cada canción (saltando esa intro) para que el contador no arrastre ese error — pero en los últimos segundos de outro, algunas canciones pueden desajustarse un poco igualmente.',
  },
]

export function AboutSection() {
  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <h2 className="text-lg font-semibold text-white">Antes de empezar</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <div key={item.title} className="rounded-xl border border-white/5 bg-black/20 p-4">
            <h3 className="text-sm font-semibold text-rose-300">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/60">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
