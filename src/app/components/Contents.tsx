import { BookOpen, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function Contents() {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const chapters = [
    {
      title: "Hello World",
      topics: [
        "Un assaggio concreto di cosa la matematica sappia fare",
        "Primi esempi di collegamento tra matematica ed informatica"
      ]
    },
    {
      title: "Il linguaggio della matematica",
      topics: [
        "Gli enunciati matematici: definizioni, teoremi e dintorni",
        "Che cosa sono le dimostrazioni",
        "La notazione matematica: un linguaggio (quasi) universale",
        "Come leggere le formule"
      ]
    },
    {
      title: "Algebra elementare e calcolo letterale",
      topics: [
        "Cenni preliminari sugli insiemi",
        "Insiemi numerici: naturali, interi, razionali, reali",
        "Proprietà delle operazioni e ordinamento",
        "Potenze, radicali e razionalizzazione",
        "Monomi, polinomi, prodotti notevoli e scomposizione in fattori",
        "Frazioni algebriche",
        "Equazioni e disequazioni di primo e secondo grado",
        "Equazioni e disequazioni con il valore assoluto",
        "Sistemi lineari"
      ]
    },
    {
      title: "Geometria analitica nel piano",
      topics: [
        "Il piano cartesiano e la distanza tra due punti",
        "La retta: equazioni, parallelismo, perpendicolarità",
        "Circonferenza, parabola, ellisse ed iperbole",
        "Intersezioni e posizioni reciproche tra curve",
        "Coordinate polari"
      ]
    },
    {
      title: "Trigonometria",
      topics: [
        "Angoli e loro misura: gradi e radianti",
        "Funzioni goniometriche: seno, coseno, tangente",
        "Identità fondamentali",
        "Formule di addizione, duplicazione, bisezione",
        "Formule parametriche e di Werner-prostaferesi",
        "Equazioni e disequazioni goniometriche",
        "Teoremi sui triangoli: seno, coseno, area"
      ]
    },
    {
      title: "Funzioni elementari e studio qualitàtivo",
      topics: [
        "Concetto di funzione: dominio, codominio, immagine",
        "Proprietà: iniettività, suriettività, monotonia, parità",
        "Funzioni potenza, polinomiali, esponenziali e logaritmiche",
        "Composizione di funzioni e funzione inversa",
        "Trasformazioni geometriche del grafico",
        "Studio qualitàtivo di una funzione (senza derivate)",
        "Funzioni definite a tratti e funzione valore assoluto"
      ]
    },
    {
      title: "Sommatorie, induzione e notazione asintotica",
      topics: [
        "Sommatorie: definizione, proprietà, somme telescopiche",
        "Produttorie e fattoriale",
        "Progressioni aritmetiche e geometriche",
        "Il principio di induzione matematica",
        "Induzione forte e principio del buon ordinamento",
        "Notazione asintotica: O, \u03A9, \u0398 (Big-O)"
      ]
    },
    {
      title: "Logica proposizionale",
      topics: [
        "Proposizioni e connettivi logici",
        "Tavole di verità",
        "Tautologie, contraddizioni e contingenze",
        "Equivalenza logica e leggi di De Morgan",
        "Forme normali: CNF e DNF",
        "Implicazione e condizioni necessarie/sufficienti",
        "Algebra di Boole"
      ]
    },
    {
      title: "Logica dei predicati e tecniche dimostrative",
      topics: [
        "Predicati e quantificatori: universale ed esistenziale",
        "Negazione di proposizioni quantificate",
        "Tecniche dimostrative: diretta, per assurdo, contronominale",
        "Dimostrazioni di esistenza e di unicità",
        "Controesempi"
      ]
    },
    {
      title: "Teoria degli insiemi",
      topics: [
        "Insiemi e operazioni fondamentali: unione, intersezione, complemento",
        "Proprietà delle operazioni insiemistiche",
        "Insieme delle parti e prodotto cartesiano",
        "Famiglie di insiemi e partizioni",
        "Insiemi numerici: \u2115, \u2124, \u211A, \u211D, \u2102",
        "Cenni di cardinalità: insiemi numerabili e non numerabili"
      ]
    },
    {
      title: "Relazioni e funzioni",
      topics: [
        "Relazioni binarie: definizione e proprietà",
        "Relazioni di equivalenza e classi di equivalenza",
        "Relazioni d'ordine: parziale e totale",
        "Funzioni: definizione rigorosa",
        "Iniettività, suriettività, biettività",
        "Composizione e funzione inversa",
        "Restrizione, estensione e funzione caratteristica"
      ]
    },
    {
      title: "Grafi",
      topics: [
        "Definizione di grafo: vertici, archi, grado",
        "Rappresentazioni in memoria: matrice di adiacenza, liste",
        "Cammini, cicli e connessione",
        "Grafi notevoli: completi, bipartiti, regolari",
        "Alberi: caratterizzazione e proprietà"
      ]
    },
    {
      title: "Combinatoria e calcolo combinatorio",
      topics: [
        "Principio fondamentale del conteggio",
        "Disposizioni e permutazioni, semplici e con ripetizione",
        "Combinazioni semplici e con ripetizione",
        "Coefficiente binomiale e teorema del binomio di Newton",
        "Triangolo di Tartaglia",
        "Principio di inclusione-esclusione",
        "Il principio dei cassetti",
        "Relazioni di ricorrenza e cenni al Teorema Master",
        "Cenni alle funzioni generatrici"
      ]
    },
    {
      title: "Teoria dei numeri elementare",
      topics: [
        "Divisibilità in \u2124",
        "Numeri primi e numeri composti",
        "Teorema Fondamentale dell'Aritmetica",
        "MCD e mcm",
        "L'algoritmo di Euclide",
        "Identità di Bézout",
        "Congruenze e aritmetica modulare",
        "Sistemi di numerazione posizionale",
        "Criteri di divisibilità"
      ]
    }
  ];

  return (
    <section id="contents" className="py-20 bg-gradient-to-br from-[#FFF5EB] to-[#FFE8D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#3D1C00] mb-4">
            Indice dei contenuti
          </h2>
          <p className="text-lg text-[#5A3A1E] max-w-2xl mx-auto">
            Quattordici capitoli organizzati in tre blocchi tematici: linguaggio e strumenti,
            logica e dimostrazioni, fondamenti di matematica discreta.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {chapters.map((chapter, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => setExpandedChapter(
                  expandedChapter === index ? null : index
                )}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#C45500] text-white rounded-lg flex items-center justify-center flex-shrink-0 font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#3D1C00]">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-[#8B5A3C] mt-1">
                      {chapter.topics.length} argomenti
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-6 h-6 text-[#8B5A3C] transition-transform duration-300 ${
                    expandedChapter === index ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {expandedChapter === index && (
                <div className="px-6 pb-5 pt-2 bg-[#FFF5EB]">
                  <ul className="space-y-2">
                    {chapter.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-2 text-[#5A3A1E]">
                        <BookOpen className="w-4 h-4 text-[#E86A10] mt-1 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
