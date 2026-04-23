import { AlertCircle, ArrowLeft, BookOpen } from 'lucide-react';
import { ErrataForm } from './ErrataForm';

export default function ErrataApp() {
  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-[#FFF5EB] to-[#FFE8D6] flex flex-col">
      <header className="bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="./" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <BookOpen className="w-6 h-6 text-[#C45500]" />
            <span className="font-semibold text-lg text-[#3D1C00]">
              Fondamenti di Matematica per Studenti di Informatica
            </span>
          </a>
          <a
            href="./"
            className="hidden sm:flex items-center gap-2 text-sm text-[#5A3A1E] hover:text-[#C45500] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla home
          </a>
        </div>
      </header>

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#3D1C00] mb-4">
              Errata corrige
            </h1>
            <p className="text-lg text-[#5A3A1E] max-w-2xl mx-auto">
              Elenco degli errori noti presenti nel libro e modulo per segnalarne di nuovi.
              Ogni correzione è preziosa: grazie in anticipo per il contributo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <section
              aria-labelledby="known-errors-heading"
              className="bg-white p-8 rounded-xl border border-[#E86A10]/20 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-[#C45500]" />
                <h2 id="known-errors-heading" className="text-xl font-semibold text-[#3D1C00]">
                  Errori noti
                </h2>
              </div>
              <p className="text-[#5A3A1E]">Nessun errore segnalato al momento.</p>
              <p className="text-sm text-[#8B5A3C] mt-4">
                Questa lista sarà aggiornata man mano che verranno verificate le
                segnalazioni ricevute.
              </p>
            </section>

            <section
              aria-labelledby="report-error-heading"
              className="bg-white p-8 rounded-xl border border-[#E86A10]/30 shadow-md"
            >
              <h2 id="report-error-heading" className="text-xl font-semibold text-[#3D1C00] mb-4">
                Segnala un errore
              </h2>
              <ErrataForm />
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Lorenzo Novara. Tutti i diritti riservati.
          </p>
          <a
            href="./"
            className="text-sm text-gray-400 hover:text-[#E86A10] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla home
          </a>
        </div>
      </footer>
    </div>
  );
}
