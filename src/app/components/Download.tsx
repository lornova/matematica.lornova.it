import { ShoppingCart, FileText, BookOpen, Layers } from 'lucide-react';

// TODO: sostituire con l'ASIN reale quando il libro sarà pubblicato su Amazon
const AMAZON_URL = 'https://www.amazon.it/';

export function Download() {
  const handleAmazonPurchase = () => {
    window.open(AMAZON_URL, '_blank', 'noopener,noreferrer');
  };

  const stats = [
    { icon: FileText, value: "~300", label: "Pagine (stima)" },
    { icon: BookOpen, value: "14", label: "Capitoli" },
    { icon: Layers, value: "3", label: "Appendici" }
  ];

  return (
    <section id="download" className="py-20 bg-gradient-to-br from-[#C45500] to-[#E86A10] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Acquista il libro
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Disponibile al momento della pubblicazione su Amazon in formato cartaceo e Kindle.
            Un percorso organico per costruire le basi matematiche del corso di laurea
            in Informatica L-31.
          </p>

          <div className="grid grid-cols-3 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-white/80" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">Cosa include</h3>
            <ul className="text-left max-w-2xl mx-auto space-y-3 text-white/95">
              <li className="flex items-start gap-3">
                <span className="text-white mt-1">✓</span>
                <span>Quattordici capitoli in tre blocchi: linguaggio e strumenti, logica e dimostrazioni, matematica discreta</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white mt-1">✓</span>
                <span>Esempi svolti passo per passo e soluzioni complete in appendice</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white mt-1">✓</span>
                <span>Note per informatici: collegamenti espliciti con programmazione, algoritmi, AI e ML</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white mt-1">✓</span>
                <span>Riferimenti a codice in C, C++, Python ed SQL dove pertinenti</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white mt-1">✓</span>
                <span>Terminologia italiana affiancata ai termini inglesi della letteratura tecnica</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white mt-1">✓</span>
                <span>Appendice su come studiare la matematica con l'aiuto dell'AI</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleAmazonPurchase}
            className="bg-white text-[#C45500] px-10 py-5 rounded-xl hover:bg-[#FFF5EB] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 mx-auto font-bold text-lg shadow-2xl"
          >
            <ShoppingCart className="w-6 h-6" />
            Acquista su Amazon
          </button>

          <p className="mt-6 text-sm text-white/80">
            Formato cartaceo e Kindle. Uscita prevista nel 2026.
          </p>
        </div>
      </div>
    </section>
  );
}
