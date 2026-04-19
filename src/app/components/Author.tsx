import { Linkedin, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Author() {
  const expertise = [
    'C/C++ embedded',
    'Cybersecurity automotive',
    'Crittografia applicata (HSM, PKCS#11)',
    'AUTOSAR, QNX, Linux embedded',
    'Android Automotive / AOSP',
    'Integrazione LLM in software di produzione',
  ];

  return (
    <section id="author" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            L'Autore
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl mb-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1683813479742-4730f91fa3ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Scrivania di lavoro"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3 text-[#5A3A1E]">
                <p className="font-semibold text-[#3D1C00]">Lorenzo Novara</p>
                <p className="text-sm">
                  Senior C++ Developer. Attualmente in ETAS (gruppo Bosch) sulla
                  cybersecurity automotive. Iscritto al triennio di Informatica
                  presso UniPegaso.
                </p>
                <div className="flex gap-3 pt-2">
                  <a
                    href="https://www.linkedin.com/in/lorenzonovara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C45500] hover:text-[#E86A10] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/lornova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C45500] hover:text-[#E86A10] transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Chi sono
                </h3>
                <div className="prose prose-lg text-gray-700 space-y-4">
                  <p>
                    Sono un informatico con venticinque anni di carriera come sviluppatore C++,
                    su sistemi embedded, desktop e distribuiti. Ho lavorato su cybersecurity
                    automotive, Hardware Security Modules e crittografia applicata, su
                    piattaforme di infotainment e integrazione smartphone (Apple CarPlay,
                    Android Auto), su Android Automotive basato su AOSP. Un anno a Seattle,
                    presso la sede di Microsoft, come resident engineer per Windows Embedded
                    Automotive. Non sono un matematico.
                  </p>
                  <p>
                    Dopo le superiori mi iscrissi ad ingegneria informatica, ma abbandonai
                    al secondo semestre perché la matematica del primo anno mi appariva come
                    un muro insormontabile. Questo non mi ha impedito di costruire una solida
                    carriera nel settore, ma la lacuna è rimasta.
                  </p>
                  <p>
                    Venticinque anni dopo sono tornato all'università, scegliendo una laurea
                    telematica in Informatica. Non essendoci libri di testo per i corsi di
                    matematica del mio ateneo, ho finito per riscrivere le dispense in LaTeX,
                    organizzandole come mi sarebbe piaciuto trovarle: con un percorso lineare
                    e notazioni coerenti. Da quel lavoro è nata l'idea di questo libro:
                    quello che avrei voluto avere da studente.
                  </p>
                </div>
              </div>

              <div className="bg-[#FFF5EB] p-6 rounded-xl border border-[#E86A10]/20">
                <h4 className="font-semibold text-[#3D1C00] mb-3">Aree di competenza professionale</h4>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((area, index) => (
                    <span
                      key={index}
                      className="bg-white px-4 py-2 rounded-full text-sm text-[#5A3A1E] border border-[#E86A10]/30"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.linkedin.com/in/lorenzonovara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#C45500] text-white px-6 py-3 rounded-lg hover:bg-[#E86A10] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  Contattami su LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
