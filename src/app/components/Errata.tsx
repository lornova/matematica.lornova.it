import { AlertCircle, Github, Send } from 'lucide-react';
import { useState } from 'react';

const ERRATA_ISSUES_URL = 'https://github.com/lornova/matematica.lornova.it/issues/new';

export function Errata() {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [correction, setCorrection] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedLocation = location.trim();
    const trimmedDescription = description.trim();
    const trimmedCorrection = correction.trim();

    const title = `Errata: ${trimmedLocation || 'segnalazione'}`;
    const bodyLines = [
      '**Capitolo / pagina**',
      trimmedLocation || '(non specificato)',
      '',
      '**Descrizione dell’errore**',
      trimmedDescription,
    ];
    if (trimmedCorrection) {
      bodyLines.push('', '**Correzione proposta**', trimmedCorrection);
    }

    const params = new URLSearchParams({
      title,
      body: bodyLines.join('\n'),
      labels: 'errata',
    });

    window.open(
      `${ERRATA_ISSUES_URL}?${params.toString()}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="errata" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#3D1C00] mb-4">
            Errata corrige
          </h2>
          <p className="text-lg text-[#5A3A1E] max-w-3xl mx-auto">
            Elenco degli errori noti presenti nel libro e modulo per segnalarne di nuovi.
            Ogni correzione è preziosa: grazie in anticipo per il contributo.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#FFF5EB] to-[#FFE8D6] p-8 rounded-xl border border-[#E86A10]/20">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-[#C45500]" />
              <h3 className="text-xl font-semibold text-[#3D1C00]">Errori noti</h3>
            </div>
            <p className="text-[#5A3A1E]">
              Nessun errore segnalato al momento.
            </p>
            <p className="text-sm text-[#8B5A3C] mt-4">
              Questa lista sarà aggiornata man mano che verranno verificate le
              segnalazioni ricevute.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E86A10]/30 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Github className="w-6 h-6 text-[#C45500]" />
              <h3 className="text-xl font-semibold text-[#3D1C00]">Segnala un errore</h3>
            </div>
            <p className="text-sm text-[#5A3A1E] mb-6">
              La segnalazione apre una issue pubblica su GitHub con i dati compilati qui sotto.
              È richiesto un account GitHub gratuito per completare l'invio.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="errata-location" className="block text-sm font-medium text-[#3D1C00] mb-1">
                  Capitolo o pagina
                </label>
                <input
                  id="errata-location"
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="es. Capitolo 3, pagina 42"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A10] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="errata-description" className="block text-sm font-medium text-[#3D1C00] mb-1">
                  Descrizione dell'errore <span className="text-[#C45500]">*</span>
                </label>
                <textarea
                  id="errata-description"
                  required
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  placeholder="Descrivi l'errore trovato"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A10] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="errata-correction" className="block text-sm font-medium text-[#3D1C00] mb-1">
                  Correzione proposta
                </label>
                <textarea
                  id="errata-correction"
                  value={correction}
                  onChange={(event) => setCorrection(event.target.value)}
                  rows={3}
                  placeholder="Se hai un'idea della correzione, scrivila qui"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A10] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#C45500] text-white px-6 py-3 rounded-lg hover:bg-[#E86A10] transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <Send className="w-4 h-4" />
                Apri segnalazione su GitHub
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
