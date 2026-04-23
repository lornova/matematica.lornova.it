import { BookOpen, Github, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-[#E86A10]" />
              <span className="font-semibold text-white text-lg">Fondamenti di Matematica</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Manuale di matematica per studenti italiani di Informatica L-31.
              In uscita a giugno 2026.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Navigazione</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-[#E86A10] transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#E86A10] transition-colors">Il Libro</a>
              </li>
              <li>
                <a href="#contents" className="hover:text-[#E86A10] transition-colors">Contenuti</a>
              </li>
              <li>
                <a href="#author" className="hover:text-[#E86A10] transition-colors">Autore</a>
              </li>
              <li>
                <a
                  href="https://www.lornova.it"
                  target="_top"
                  className="hover:text-[#E86A10] transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a href="#download" className="hover:text-[#E86A10] transition-colors">Acquista</a>
              </li>
              <li>
                <a href="#errata" className="hover:text-[#E86A10] transition-colors">Errata</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contatti</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.linkedin.com/in/lorenzonovara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#E86A10] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lornova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#E86A10] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} Lorenzo Novara. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-gray-500">
            Sito statico senza cookie né tracker.
          </p>
        </div>
      </div>
    </footer>
  );
}
