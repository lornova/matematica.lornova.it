import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Contents } from './components/Contents';
import { Author } from './components/Author';
import { Download } from './components/Download';
import { Errata } from './components/Errata';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="size-full">
      <Header />
      <main>
        <Hero />
        <About />
        <Contents />
        <Author />
        <Download />
        <Errata />
      </main>
      <Footer />
    </div>
  );
}
