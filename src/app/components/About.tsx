import { CheckCircle, Code, Languages, Pencil } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const features = [
    {
      icon: Code,
      title: "Scritto da un informatico",
      description: "Non da un matematico. L'approccio è pratico e concreto, con collegamenti costanti alla programmazione, agli algoritmi e all'AI."
    },
    {
      icon: Languages,
      title: "La matematica come un linguaggio",
      description: "Affrontata come si affronta un nuovo linguaggio di programmazione: sintassi, semantica, idiomi. Costruita pezzo per pezzo, senza dare nulla per scontato."
    },
    {
      icon: Pencil,
      title: "Esempi svolti passo per passo",
      description: "Ogni nuovo argomento parte da esercizi completamente risolti. Dalla soluzione guidata all'esercizio autonomo, senza salti."
    }
  ];

  const highlights = [
    "Il linguaggio della matematica: enunciati, dimostrazioni, notazione",
    "Dal precalcolo alla notazione asintotica (Big-O)",
    "Logica proposizionale, dei predicati e tecniche dimostrative",
    "Teoria degli insiemi, relazioni e funzioni",
    "Grafi, combinatoria e calcolo combinatorio",
    "Teoria elementare dei numeri e aritmetica modulare"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Il Libro
          </h2>
          <p className="text-xl text-[#5A3A1E] max-w-3xl mx-auto">
            Un manuale di matematica pensato per studenti italiani di Informatica.
            Costruisce i prerequisiti della triennale L-31 partendo dal linguaggio stesso
            della matematica, con un filo conduttore costante verso l'informatica.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-[#FFF5EB] to-[#FFE8D6] p-8 rounded-xl border border-[#E86A10]/20">
              <feature.icon className="w-12 h-12 text-[#C45500] mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-[#3D1C00]">{feature.title}</h3>
              <p className="text-[#5A3A1E]">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758685848691-3933bc2aa3ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Equazioni matematiche"
              className="w-full rounded-2xl shadow-xl"
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Contenuti
            </h3>
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#C45500] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-[#FFF5EB] rounded-xl border-l-4 border-[#C45500]">
              <p className="text-[#3D1C00]">
                Quattordici capitoli organizzati in <strong>tre blocchi tematici</strong>
                {' '}(linguaggio e strumenti, logica e dimostrazioni, matematica discreta),
                con esempi svolti, note per informatici che collegano la teoria alla pratica
                professionale e appendici su come studiare la matematica con l'AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
