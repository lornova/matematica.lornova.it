import { AlertTriangle, CheckCircle2, RefreshCw, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ERRATA_ENDPOINT = './errata.php';

type CaptchaState = {
  question: string;
  token: string;
} | null;

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

type ErrataResponse = {
  ok: boolean;
  error?: string;
};

async function fetchCaptcha(): Promise<CaptchaState> {
  const response = await fetch(`${ERRATA_ENDPOINT}?action=captcha`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`captcha HTTP ${response.status}`);
  }
  const data = (await response.json()) as { question: string; token: string };
  return { question: data.question, token: data.token };
}

export function ErrataForm() {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [correction, setCorrection] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [captcha, setCaptcha] = useState<CaptchaState>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mountedAtRef = useRef<number>(Date.now());

  const loadCaptcha = async () => {
    setCaptchaLoading(true);
    setCaptchaError(null);
    try {
      const next = await fetchCaptcha();
      setCaptcha(next);
      setCaptchaAnswer('');
    } catch {
      setCaptchaError('Impossibile caricare il captcha. Riprova tra poco.');
    } finally {
      setCaptchaLoading(false);
    }
  };

  useEffect(() => {
    void loadCaptcha();
  }, []);

  const resetForm = () => {
    setLocation('');
    setDescription('');
    setCorrection('');
    setCaptchaAnswer('');
    setHoneypot('');
    mountedAtRef.current = Date.now();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!captcha) return;

    setStatus('loading');
    setErrorMessage(null);

    const payload = {
      location: location.trim(),
      description: description.trim(),
      correction: correction.trim(),
      captcha_token: captcha.token,
      captcha_answer: captchaAnswer.trim(),
      honeypot,
      elapsed_ms: Date.now() - mountedAtRef.current,
    };

    try {
      const response = await fetch(ERRATA_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => ({}))) as ErrataResponse;

      if (response.ok && data.ok) {
        setStatus('success');
        resetForm();
        void loadCaptcha();
        return;
      }

      setStatus('error');
      setErrorMessage(data.error ?? `Errore del server (HTTP ${response.status}).`);
      void loadCaptcha();
    } catch {
      setStatus('error');
      setErrorMessage('Impossibile contattare il server. Verifica la connessione.');
      void loadCaptcha();
    }
  };

  const inputClass =
    'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A10] focus:border-transparent';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
          maxLength={200}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="errata-description"
          className="block text-sm font-medium text-[#3D1C00] mb-1"
        >
          Descrizione dell'errore <span className="text-[#C45500]">*</span>
        </label>
        <textarea
          id="errata-description"
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          maxLength={4000}
          placeholder="Descrivi l'errore trovato"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="errata-correction"
          className="block text-sm font-medium text-[#3D1C00] mb-1"
        >
          Correzione proposta
        </label>
        <textarea
          id="errata-correction"
          value={correction}
          onChange={(event) => setCorrection(event.target.value)}
          rows={3}
          maxLength={4000}
          placeholder="Se hai un'idea della correzione, scrivila qui"
          className={inputClass}
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website-url">Non compilare questo campo</label>
        <input
          id="website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="bg-[#FFF5EB] border border-[#E86A10]/30 rounded-lg p-4">
        <label htmlFor="errata-captcha" className="block text-sm font-medium text-[#3D1C00] mb-2">
          Verifica anti-spam <span className="text-[#C45500]">*</span>
        </label>
        {captchaError ? (
          <p className="text-sm text-red-700">{captchaError}</p>
        ) : (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-lg text-[#3D1C00]">
              {captcha ? `${captcha.question} =` : '…'}
            </span>
            <input
              id="errata-captcha"
              type="text"
              inputMode="numeric"
              required
              value={captchaAnswer}
              onChange={(event) => setCaptchaAnswer(event.target.value)}
              disabled={!captcha || captchaLoading}
              maxLength={6}
              className={`${inputClass} w-24`}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => void loadCaptcha()}
              disabled={captchaLoading}
              className="text-sm text-[#C45500] hover:text-[#E86A10] transition-colors flex items-center gap-1 disabled:opacity-50"
              aria-label="Ricarica captcha"
            >
              <RefreshCw className={`w-4 h-4 ${captchaLoading ? 'animate-spin' : ''}`} />
              Ricarica
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading' || !captcha}
        className="w-full bg-[#C45500] text-white px-6 py-3 rounded-lg hover:bg-[#E86A10] transition-colors flex items-center justify-center gap-2 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {status === 'loading' ? 'Invio in corso…' : 'Invia segnalazione'}
      </button>

      {status === 'success' && (
        <div
          role="status"
          className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-900"
        >
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            Segnalazione inviata, grazie. Ti risponderemo se serve qualche chiarimento.
          </p>
        </div>
      )}

      {status === 'error' && errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-900"
        >
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
