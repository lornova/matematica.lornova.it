import { BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#C45500]" />
            <span className="font-semibold text-lg">Fondamenti di Matematica per Studenti di Informatica</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="hover:text-[#E86A10] transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#E86A10] transition-colors">
              Il Libro
            </button>
            <button onClick={() => scrollToSection('contents')} className="hover:text-[#E86A10] transition-colors">
              Contenuti
            </button>
            <button onClick={() => scrollToSection('author')} className="hover:text-[#E86A10] transition-colors">
              Autore
            </button>
            <button onClick={() => scrollToSection('errata')} className="hover:text-[#E86A10] transition-colors">
              Errata
            </button>
            <a
              href="https://www.lornova.it"
              target="_top"
              className="font-medium hover:text-[#E86A10] transition-colors"
            >
              Blog
            </a>
            <button
              onClick={() => scrollToSection('download')}
              className="bg-[#C45500] text-white px-4 py-2 rounded-lg hover:bg-[#E86A10] transition-colors"
            >
              Acquista
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left hover:text-[#E86A10] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left hover:text-[#E86A10] transition-colors"
            >
              Il Libro
            </button>
            <button
              onClick={() => scrollToSection('contents')}
              className="block w-full text-left hover:text-[#E86A10] transition-colors"
            >
              Contenuti
            </button>
            <button
              onClick={() => scrollToSection('author')}
              className="block w-full text-left hover:text-[#E86A10] transition-colors"
            >
              Autore
            </button>
            <button
              onClick={() => scrollToSection('errata')}
              className="block w-full text-left hover:text-[#E86A10] transition-colors"
            >
              Errata
            </button>
            <a
              href="https://www.lornova.it"
              target="_top"
              className="block w-full text-left font-medium hover:text-[#E86A10] transition-colors"
            >
              Blog
            </a>
            <button
              onClick={() => scrollToSection('download')}
              className="block w-full text-left bg-[#C45500] text-white px-4 py-2 rounded-lg hover:bg-[#E86A10] transition-colors"
            >
              Acquista
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
