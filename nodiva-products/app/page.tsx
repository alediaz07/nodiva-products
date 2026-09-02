"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChefHat,
  Mail,
  MapPin,
  Menu,
  Phone,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const phone = "+50683738588";
const email = "nodivaproducts@gmail.com";
const whatsapp = `https://wa.me/${phone.replace(/\D/g, "")}`;
const whatsappLink = (message: string) => `${whatsapp}?text=${encodeURIComponent(message)}`;
const emailLink = (subject: string, body: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (start: number, end: number, value: number) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

const storySteps = [
  {
    eyebrow: "01 · Planificación",
    title: "Cada servicio comienza entendiendo la operación.",
    text: "Menús, horarios, capacidad y dinámica de atención se organizan según los requerimientos reales de cada cliente.",
  },
  {
    eyebrow: "02 · Preparación",
    title: "Una cocina preparada para responder.",
    text: "Coordinamos la elaboración de alimentos con procesos claros, espacios funcionales y una operación que se adapta a cada escala.",
  },
  {
    eyebrow: "03 · Distribución",
    title: "Del área de producción al punto de servicio.",
    text: "Gestionamos el flujo completo para que cada preparación llegue donde debe, en el momento indicado.",
  },
  {
    eyebrow: "04 · Plato servido",
    title: "La operación termina cuando el servicio está completo.",
    text: "Integramos gestión, elaboración y distribución en una sola solución alimentaria.",
  },
];

const services = [
  {
    number: "01",
    icon: Building2,
    title: "Comedores estudiantiles",
    text: "Gestión integral para escuelas y colegios mediante procesos de contratación y licitación con el MEP.",
    href: whatsappLink("Hola NODIVA, deseo información sobre la gestión de comedores estudiantiles."),
  },
  {
    number: "02",
    icon: UtensilsCrossed,
    title: "Sodas institucionales",
    text: "Experiencia en la administración de sodas y participación en licitaciones según las condiciones de cada institución.",
    href: whatsappLink("Hola NODIVA, deseo información sobre el servicio para sodas institucionales."),
  },
  {
    number: "03",
    icon: CalendarDays,
    title: "Catering",
    text: "Buffet, comidas empacadas, alimentación empresarial y servicios para actividades institucionales o particulares.",
    href: whatsappLink("Hola NODIVA, deseo cotizar un servicio de catering."),
  },
];

export default function Home() {
  const storyRef = useRef<HTMLElement>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (!storyRef.current) return;
      const rect = storyRef.current.getBoundingClientRect();
      const distance = storyRef.current.offsetHeight - window.innerHeight;
      const next = Math.min(1, Math.max(0, -rect.top / Math.max(distance, 1)));
      setStoryProgress(next);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeWithEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [menuOpen]);

  const activeStep = Math.min(3, Math.floor(storyProgress * 4));
  const firstAngle = 1 - smoothstep(0.18, 0.3, storyProgress);
  const frontAngle = smoothstep(0.18, 0.3, storyProgress) * (1 - smoothstep(0.43, 0.55, storyProgress));
  const sideAngle = smoothstep(0.43, 0.55, storyProgress) * (1 - smoothstep(0.69, 0.81, storyProgress));
  const finalAngle = smoothstep(0.69, 0.81, storyProgress);
  const storyStyle = {
    "--story-x": `${(storyProgress - 0.5) * 7}%`,
    "--story-y": `${storyProgress * -2}%`,
    "--story-scale": (1.02 + storyProgress * 0.1).toString(),
    "--front-x": `${(0.42 - storyProgress) * 2.1}%`,
    "--side-x": `${(storyProgress - 0.58) * 2.4}%`,
    "--final-x": `${(0.78 - storyProgress) * 3.2}%`,
    "--angle-first": firstAngle.toFixed(4),
    "--angle-front": frontAngle.toFixed(4),
    "--angle-side": sideAngle.toFixed(4),
    "--angle-final": finalAngle.toFixed(4),
    "--scan-left": `${12 + storyProgress * 72}%`,
    "--story-width": `${storyProgress * 100}%`,
  } as CSSProperties;

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="NODIVA, volver al inicio" onClick={() => setMenuOpen(false)}>
          <Image unoptimized src="/images/nodiva-logo.jpeg" alt="" width={64} height={64} className="brand-mark" priority />
          <span><strong>NODIVA</strong><small>PRODUCTS S.A.</small></span>
        </a>

        {menuOpen && <button className="menu-backdrop" type="button" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} />}

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Navegación principal">
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
          <a href="#experiencia" onClick={() => setMenuOpen(false)}>Cómo trabajamos</a>
          <a href="#cobertura" onClick={() => setMenuOpen(false)}>Cobertura</a>
          <a className="nav-cta" href={whatsappLink("Hola NODIVA, deseo solicitar una cotización.")} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            Cotizar <ArrowRight size={16} />
          </a>
        </nav>

        <button className="menu-button" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="inicio">
        <Image unoptimized src="/images/cocina-industrial.png" alt="Cocina industrial moderna equipada para servicios de alimentación" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-grid" />

        <div className="hero-content">
          <p className="eyebrow"><span /> Soluciones integrales de alimentación</p>
          <h1>Una operación completa.<em>Hasta el plato servido.</em></h1>
          <p className="hero-copy">
            Diseñamos y gestionamos servicios de alimentación para instituciones,
            empresas y centros educativos en Costa Rica.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={whatsappLink("Hola NODIVA, deseo solicitar una propuesta de servicio.")} target="_blank" rel="noreferrer">
              Solicitar propuesta <ArrowRight size={18} />
            </a>
            <a className="button button-ghost" href="#experiencia">Conocer la operación</a>
          </div>
        </div>

        <a className="scroll-cue" href="#experiencia"><span>Descubrir</span><ArrowDown size={18} /></a>
        <div className="hero-index" aria-hidden="true"><span>CR</span><span>24 / 7</span></div>
      </section>

      <section className="intro">
        <p className="section-kicker">NODIVA PRODUCTS S.A.</p>
        <div className="intro-copy">
          <h2>No entregamos solamente alimentos.</h2>
          <p>
            Construimos la operación que hace posible servirlos todos los días:
            planificación, preparación, gestión, distribución y atención.
          </p>
        </div>
      </section>

      <section className="story" id="experiencia" ref={storyRef} style={storyStyle}>
        <div className="story-sticky">
          <div className="story-visual">
            <Image unoptimized src="/images/cocina-industrial.png" alt="" fill sizes="100vw" className="story-angle story-angle-first" />
            <Image unoptimized src="/images/cocina-frontal.png" alt="" fill sizes="100vw" className="story-angle story-angle-front" />
            <Image unoptimized src="/images/cocina-lateral.png" alt="" fill sizes="100vw" className="story-angle story-angle-side" />
            <Image unoptimized src="/images/cocina-industrial.png" alt="" fill sizes="100vw" className="story-angle story-angle-final" />
            <div className="story-vignette" />
            <div className="scan-line" />
          </div>

          <div className="story-counter"><span>0{activeStep + 1}</span><i /><span>04</span></div>
          <div className="story-copy">
            {storySteps.map((step, index) => (
              <article key={step.eyebrow} className={index === activeStep ? "story-step is-active" : "story-step"} aria-hidden={index !== activeStep}>
                <p className="eyebrow"><span /> {step.eyebrow}</p>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className="story-progress" aria-hidden="true"><span /></div>
        </div>
      </section>

      <section className="services" id="servicios">
        <div className="section-heading">
          <div><p className="section-kicker">Nuestros servicios</p><h2>Alimentación que se adapta a cada entorno.</h2></div>
          <p>
            Desde operaciones permanentes hasta actividades puntuales, cada servicio
            se estructura alrededor de las necesidades del cliente.
          </p>
        </div>

        <div className="service-grid">
          {services.map(({ number, icon: Icon, title, text, href }) => (
            <article className="service-card" key={title}>
              <div className="service-card-top"><span>{number}</span><Icon size={26} strokeWidth={1.5} /></div>
              <div><h3>{title}</h3><p>{text}</p></div>
              <a href={href} target="_blank" rel="noreferrer">Consultar servicio <ArrowRight size={17} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="feature feature-cafeteria">
        <div className="feature-media">
          <Image unoptimized src="/images/comedor-estudiantil.png" alt="Servicio profesional de comedor estudiantil" fill sizes="(max-width: 900px) 100vw, 60vw" />
        </div>
        <div className="feature-content">
          <p className="section-kicker">Diversos centros educativos</p>
          <h2>La tranquilidad de una gestión integral.</h2>
          <p>
            Nos adaptamos a los requerimientos de escuelas y colegios, coordinando
            cada etapa hasta completar el servicio.
          </p>
          <ul>
            <li><Check size={17} /> Operación ajustada a cada institución</li>
            <li><Check size={17} /> Elaboración y distribución</li>
            <li><Check size={17} /> Participación en licitaciones con el MEP</li>
          </ul>
          <a className="text-link" href={whatsappLink("Hola NODIVA, deseo conversar sobre un servicio para un centro educativo.")} target="_blank" rel="noreferrer">
            Conversar sobre una institución <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="feature feature-catering">
        <div className="feature-content">
          <p className="section-kicker">Catering flexible</p>
          <h2>Una solución para cada ocasión y cada escala.</h2>
          <p>
            Buffet, comidas empacadas, alimentación empresarial, desayunos,
            almuerzos, cenas y meriendas para actividades institucionales o particulares.
          </p>
          <div className="service-tags" aria-label="Modalidades de catering">
            <span>Empresarial</span><span>Eventos</span><span>Buffet</span><span>Comida empacada</span>
          </div>
          <a className="button button-dark" href={whatsappLink("Hola NODIVA, deseo cotizar un servicio de catering.")} target="_blank" rel="noreferrer">
            Cotizar catering <ArrowRight size={18} />
          </a>
        </div>
        <div className="feature-media">
          <Image unoptimized src="/images/catering.png" alt="Servicio de catering para empresas y eventos" fill sizes="(max-width: 900px) 100vw, 60vw" />
        </div>
      </section>

      <section className="menus">
        <div className="menus-copy">
          <p className="section-kicker">Menús adaptables</p>
          <h2>Variedad pensada para el servicio diario.</h2>
          <p>
            Cada menú se ajusta a los requerimientos del centro, el tipo de servicio
            y la dinámica de atención.
          </p>
        </div>
        <div className="menus-image">
          <Image unoptimized src="/images/menu-mensual.png" alt="Selección de comidas institucionales costarricenses" fill sizes="100vw" />
        </div>
      </section>

      <section className="coverage" id="cobertura">
        <div className="coverage-orbit" aria-hidden="true"><span className="orbit-one" /><span className="orbit-two" /><MapPin /></div>
        <div className="coverage-copy">
          <p className="section-kicker">Cobertura nacional</p>
          <h2>En todo Costa Rica.<br /><em>Principalmente en el Valle Central.</em></h2>
          <p>Nos acoplamos al horario, ubicación y capacidad requerida por cada operación.</p>
        </div>
        <div className="coverage-stats">
          <article><strong>24/7</strong><span>Atención disponible</span></article>
          <article><strong>Nacional</strong><span>Cobertura de servicio</span></article>
          <article><strong>Flexible</strong><span>Capacidad adaptable</span></article>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-mark" aria-hidden="true">N</div>
        <p className="section-kicker">Hablemos de su operación</p>
        <h2>¿Qué necesita servir?</h2>
        <p>Cuéntenos sus requerimientos y preparemos una propuesta personalizada.</p>
        <div className="hero-actions">
          <a className="button button-light" href={whatsappLink("Hola Norman, deseo solicitar una propuesta con NODIVA.")} target="_blank" rel="noreferrer">
            Escribir por WhatsApp <ArrowRight size={18} />
          </a>
          <a className="button button-outline-light" href={emailLink("Solicitud de propuesta — NODIVA", "Hola Norman,\n\nDeseo solicitar información y una propuesta para el siguiente servicio:\n\n")}>Enviar correo</a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <Image unoptimized src="/images/nodiva-logo.jpeg" alt="NODIVA Products S.A." width={72} height={72} />
          <div><strong>NODIVA</strong><span>PRODUCTS S.A.</span></div>
        </div>
        <div className="footer-contact">
          <a href={`tel:${phone}`} aria-label="Llamar a NODIVA al +506 8373 8588"><Phone size={16} /> +506 8373 8588</a>
          <a href={emailLink("Consulta desde el sitio web — NODIVA", "Hola Norman,\n\nDeseo realizar la siguiente consulta:\n\n")}><Mail size={16} /> {email}</a>
        </div>
        <div className="footer-meta"><span>Atención 24/7</span><span>Cotizaciones: Norman Díaz</span></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappLink("Hola NODIVA, deseo información sobre sus servicios.")} target="_blank" rel="noreferrer" aria-label="Contactar a NODIVA por WhatsApp">
        <ChefHat size={20} /><span>Cotizar</span>
      </a>
    </main>
  );
}
