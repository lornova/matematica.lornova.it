import { ShoppingCart, BookOpen } from 'lucide-react';
import coverImage from '../../imports/cover_fondamenti_ebook.svg';

export function Hero() {
  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-[#FFF5EB] via-[#FFE8D6] to-[#FFD4B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#E86A10]/10 text-[#C45500] px-4 py-2 rounded-full text-sm border border-[#E86A10]/30">
              <BookOpen className="w-4 h-4" />
              <span>In preparazione. Uscita prevista nel 2026.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D1C00] leading-tight">
              Fondamenti di Matematica per Studenti di Informatica
            </h1>

            <p className="text-xl text-[#5A3A1E]">
              Un libro di matematica scritto da un informatico con venticinque anni di carriera,
              pensato per chi affronta il primo anno di Informatica L-31. Non un manuale accademico:
              un percorso incrementale, con esempi svolti passo per passo e collegamenti espliciti
              con la programmazione, gli algoritmi, l'AI e il machine learning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToDownload}
                className="bg-[#C45500] text-white px-8 py-4 rounded-lg hover:bg-[#E86A10] transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <ShoppingCart className="w-5 h-5" />
                Acquista su Amazon
              </button>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-[#C45500] text-[#C45500] px-8 py-4 rounded-lg hover:bg-[#E86A10]/10 transition-colors font-semibold"
              >
                Scopri di più
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={coverImage}
                alt="Copertina Fondamenti di Matematica per Studenti di Informatica"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
