"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  CalendarDays,
  ChefHat,
  Mail,
  Menu,
  Phone,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type MouseEvent } from "react";

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
  },
  {
    number: "02",
    icon: UtensilsCrossed,
    title: "Sodas institucionales",
    text: "Experiencia en la administración de sodas y participación en licitaciones según las condiciones de cada institución.",
  },
  {
    number: "03",
    icon: CalendarDays,
    title: "Catering",
    text: "Buffet, comidas empacadas, alimentación empresarial y servicios para actividades institucionales o particulares.",
  },
];

type ProposalForm = {
  institution: string;
  contact: string;
  organization: string;
  service: string;
  province: string;
  location: string;
  people: string;
  frequency: string;
  startDate: string;
  phone: string;
  email: string;
  details: string;
};

const emptyProposal: ProposalForm = {
  institution: "", contact: "", organization: "", service: "", province: "", location: "", people: "",
  frequency: "", startDate: "", phone: "", email: "", details: "",
};

const organizationOptions = ["Escuela", "Colegio", "Institución pública", "Empresa privada", "Organización o asociación", "Evento particular", "Otro"];
const serviceOptions = ["Comedor estudiantil", "Alimentación empresarial", "Catering y eventos", "Soda institucional", "Otro servicio de alimentación"];
const provinceOptions = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];
const frequencyOptions = ["Servicio diario", "Varios días por semana", "Servicio semanal", "Evento de un día", "Evento de varios días", "Por definir"];

const coverageProvinces = [
  { name: "San José", x: 596, y: 275.5 },
  { name: "Alajuela", x: 554.5, y: 139.5 },
  { name: "Heredia", x: 630.2, y: 171.1 },
  { name: "Cartago", x: 682, y: 271.8 },
  { name: "Limón", x: 765.7, y: 299 },
  { name: "Puntarenas", x: 749.6, y: 401 },
  { name: "Guanacaste", x: 412.8, y: 157.5 },
];

export default function Home() {
  const storyRef = useRef<HTMLElement>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProvince, setActiveProvince] = useState(0);
  const [proposalOpen, setProposalOpen] = useState(false);
  const [proposal, setProposal] = useState<ProposalForm>(emptyProposal);
  const [proposalErrors, setProposalErrors] = useState<Partial<Record<keyof ProposalForm, string>>>({});
  const proposalTriggerRef = useRef<HTMLButtonElement | null>(null);
  const proposalDialogRef = useRef<HTMLDivElement>(null);

  const closeProposal = () => {
    setProposalOpen(false);
    window.setTimeout(() => proposalTriggerRef.current?.focus(), 0);
  };

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

  useEffect(() => {
    if (!proposalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    proposalDialogRef.current?.focus();
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProposal();
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [proposalOpen]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const interval = window.setInterval(() => {
      setActiveProvince((province) => (province + 1) % coverageProvinces.length);
    }, 1500);

    return () => window.clearInterval(interval);
  }, []);

  const openProposal = (event: MouseEvent<HTMLButtonElement>) => {
    proposalTriggerRef.current = event.currentTarget;
    setProposalOpen(true);
  };
  const updateProposal = (field: keyof ProposalForm, value: string) => {
    setProposal((current) => ({ ...current, [field]: value }));
    setProposalErrors((current) => ({ ...current, [field]: undefined }));
  };
  const validateProposal = () => {
    const errors: Partial<Record<keyof ProposalForm, string>> = {};
    const required: Array<keyof ProposalForm> = ["institution", "contact", "organization", "service", "province", "location", "people", "frequency", "phone"];
    required.forEach((field) => {
      if (!proposal[field].trim()) errors[field] = "Este campo es obligatorio.";
    });
    if (proposal.people && (!/^\d+$/.test(proposal.people) || Number(proposal.people) <= 0)) errors.people = "Ingrese una cantidad positiva.";
    if (proposal.phone && !/^\+?506\s?\d{4}[\s-]?\d{4}$/.test(proposal.phone.trim())) errors.phone = "Ingrese un teléfono válido con números y prefijo +506.";
    if (proposal.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(proposal.email.trim())) errors.email = "Ingrese un correo electrónico válido.";
    setProposalErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const proposalMessage = () => `SOLICITUD DE PROPUESTA — NODIVA PRODUCTS S.A.\n\nInstitución o empresa: ${proposal.institution}\nPersona de contacto: ${proposal.contact}\nTipo de organización: ${proposal.organization}\nServicio requerido: ${proposal.service}\nProvincia: ${proposal.province}\nCantón o ubicación: ${proposal.location}\nCantidad aproximada: ${proposal.people}\nFrecuencia: ${proposal.frequency}\nFecha estimada: ${proposal.startDate || "No indicada"}\nTeléfono: ${proposal.phone}\nCorreo: ${proposal.email || "No indicado"}\nDetalles adicionales: ${proposal.details || "No indicados"}\n\nSolicitud dirigida a Norman Díaz.`;
  const submitProposal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateProposal()) return;
    window.open(whatsappLink(proposalMessage()), "_blank", "noopener,noreferrer");
  };
  const emailProposal = () => {
    if (!validateProposal()) return;
    window.location.href = emailLink("Solicitud de propuesta institucional", proposalMessage());
  };

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
          <button className="nav-cta" type="button" onClick={(event) => { setMenuOpen(false); openProposal(event); }}>
            Cotizar <ArrowRight size={16} />
          </button>
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
            <button className="button button-primary" type="button" onClick={openProposal}>
              Solicitar propuesta <ArrowRight size={18} />
            </button>
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
          {services.map(({ number, icon: Icon, title, text }) => (
            <article className="service-card" key={title}>
              <div className="service-card-top"><span>{number}</span><Icon size={26} strokeWidth={1.5} /></div>
              <div><h3>{title}</h3><p>{text}</p></div>
              <button className="service-card-action" type="button" onClick={openProposal}>Consultar servicio <ArrowRight size={17} /></button>
            </article>
          ))}
        </div>
      </section>

      <section className="feature feature-cafeteria education-experience">
        <div className="feature-media">
          <Image unoptimized src="/images/comedor-estudiantil.png" alt="Servicio profesional de comedor estudiantil" fill sizes="(max-width: 900px) 100vw, 60vw" />
        </div>
        <div className="feature-content education-content">
          <p className="section-kicker">EXPERIENCIA EN CENTROS EDUCATIVOS</p>
          <h2>Alimentación adaptada a cada comunidad educativa.</h2>
          <p className="education-intro">Trabajamos con diversos centros educativos, coordinando el servicio de acuerdo con sus horarios, población, instalaciones y requerimientos particulares.</p>
          <div className="education-points">
            <article>
              <h3>EL REQUERIMIENTO</h3>
              <p>Cada escuela o colegio presenta condiciones diferentes de capacidad, horarios, menús y dinámica de atención.</p>
            </article>
            <article>
              <h3>LA RESPUESTA NODIVA</h3>
              <p>Adaptamos el personal, la preparación, la distribución y el servicio para desarrollar una operación organizada hasta el plato servido.</p>
            </article>
          </div>
          <div className="education-facts">
            <article><strong>ESCUELAS Y COLEGIOS</strong><span>Servicios adaptados a cada centro.</span></article>
            <article><strong>GESTIÓN COMPLETA</strong><span>Desde la coordinación hasta el plato servido.</span></article>
            <article><strong>LICITACIONES DEL MEP</strong><span>Participación en procesos de contratación institucional.</span></article>
          </div>
          <button className="button button-dark education-button" type="button" onClick={openProposal}>
            Consultar servicio para mi institución <ArrowRight size={18} />
          </button>
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
          <button className="button button-dark" type="button" onClick={openProposal}>
            Cotizar catering <ArrowRight size={18} />
          </button>
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
        <div className="coverage-orbit">
          <svg className="coverage-map" viewBox="250 40 600 500" role="img" aria-label="Mapa de Costa Rica con cobertura en sus siete provincias">
            <image href="/images/costa-rica-provincias.svg" x="0" y="0" width="1000" height="1000" preserveAspectRatio="xMidYMid meet" />
            <path className="coverage-map-route" d={coverageProvinces.slice(0, activeProvince + 1).map(({ x, y }) => `${x},${y}`).join(" ")} />
            <g className="coverage-pin" style={{ transform: `translate(${coverageProvinces[activeProvince].x}px, ${coverageProvinces[activeProvince].y}px)` }}>
              <circle className="coverage-pin-pulse" r="16" />
              <circle className="coverage-pin-dot" r="5" />
              <path className="coverage-pin-mark" d="M0-27c-8 0-14 6-14 14 0 10 14 22 14 22S14-3 14-13C14-21 8-27 0-27Zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" />
            </g>
          </svg>
          <p className="coverage-province" aria-live="polite">{coverageProvinces[activeProvince].name}</p>
        </div>
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
          <button className="button button-light" type="button" onClick={openProposal}>
            Escribir por WhatsApp <ArrowRight size={18} />
          </button>
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

      <button className="floating-whatsapp" type="button" onClick={openProposal} aria-label="Contactar a NODIVA por WhatsApp">
        <ChefHat size={20} /><span>Cotizar</span>
      </button>

      {proposalOpen && (
        <div className="proposal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeProposal(); }}>
          <div className="proposal-modal" role="dialog" aria-modal="true" aria-labelledby="proposal-title" tabIndex={-1} ref={proposalDialogRef}>
            <div className="proposal-modal-header">
              <div>
                <p className="section-kicker">Solicitud de propuesta</p>
                <h2 id="proposal-title">Solicite una propuesta adaptada a su operación.</h2>
                <p>Comparta los datos principales de su institución, empresa o evento. Norman Díaz recibirá la solicitud y se comunicará con usted para ampliar la información.</p>
              </div>
              <button className="proposal-close" type="button" onClick={closeProposal} aria-label="Cerrar formulario">&times;</button>
            </div>
            <form className="proposal-form" onSubmit={submitProposal} noValidate>
              <label>Nombre de la institución o empresa *<input value={proposal.institution} onChange={(event) => updateProposal("institution", event.target.value)} aria-invalid={Boolean(proposalErrors.institution)} />{proposalErrors.institution && <small>{proposalErrors.institution}</small>}</label>
              <label>Nombre de la persona de contacto *<input value={proposal.contact} onChange={(event) => updateProposal("contact", event.target.value)} aria-invalid={Boolean(proposalErrors.contact)} />{proposalErrors.contact && <small>{proposalErrors.contact}</small>}</label>
              <label>Tipo de organización *<select value={proposal.organization} onChange={(event) => updateProposal("organization", event.target.value)} aria-invalid={Boolean(proposalErrors.organization)}><option value="">Seleccione una opción</option>{organizationOptions.map((option) => <option key={option}>{option}</option>)}</select>{proposalErrors.organization && <small>{proposalErrors.organization}</small>}</label>
              <label>Servicio requerido *<select value={proposal.service} onChange={(event) => updateProposal("service", event.target.value)} aria-invalid={Boolean(proposalErrors.service)}><option value="">Seleccione una opción</option>{serviceOptions.map((option) => <option key={option}>{option}</option>)}</select>{proposalErrors.service && <small>{proposalErrors.service}</small>}</label>
              <label>Provincia *<select value={proposal.province} onChange={(event) => updateProposal("province", event.target.value)} aria-invalid={Boolean(proposalErrors.province)}><option value="">Seleccione una opción</option>{provinceOptions.map((option) => <option key={option}>{option}</option>)}</select>{proposalErrors.province && <small>{proposalErrors.province}</small>}</label>
              <label>Cantón o ubicación aproximada *<input value={proposal.location} onChange={(event) => updateProposal("location", event.target.value)} aria-invalid={Boolean(proposalErrors.location)} />{proposalErrors.location && <small>{proposalErrors.location}</small>}</label>
              <label>Cantidad aproximada de personas *<input type="number" min="1" step="1" value={proposal.people} onChange={(event) => updateProposal("people", event.target.value)} aria-invalid={Boolean(proposalErrors.people)} />{proposalErrors.people && <small>{proposalErrors.people}</small>}</label>
              <label>Frecuencia del servicio *<select value={proposal.frequency} onChange={(event) => updateProposal("frequency", event.target.value)} aria-invalid={Boolean(proposalErrors.frequency)}><option value="">Seleccione una opción</option>{frequencyOptions.map((option) => <option key={option}>{option}</option>)}</select>{proposalErrors.frequency && <small>{proposalErrors.frequency}</small>}</label>
              <label>Fecha estimada de inicio<input type="date" value={proposal.startDate} onChange={(event) => updateProposal("startDate", event.target.value)} /></label>
              <label>Teléfono de contacto *<input type="tel" inputMode="tel" placeholder="+506 0000 0000" value={proposal.phone} onChange={(event) => updateProposal("phone", event.target.value)} aria-invalid={Boolean(proposalErrors.phone)} />{proposalErrors.phone && <small>{proposalErrors.phone}</small>}</label>
              <label>Correo electrónico<input type="email" value={proposal.email} onChange={(event) => updateProposal("email", event.target.value)} aria-invalid={Boolean(proposalErrors.email)} />{proposalErrors.email && <small>{proposalErrors.email}</small>}</label>
              <label className="proposal-details">Detalles adicionales<textarea placeholder="Horarios, tipo de alimentación, instalaciones disponibles o cualquier requerimiento particular." value={proposal.details} onChange={(event) => updateProposal("details", event.target.value)} /></label>
              <p className="proposal-privacy">La información proporcionada será utilizada únicamente para atender su solicitud comercial.</p>
              <div className="proposal-actions">
                <button className="button button-primary" type="submit">Enviar solicitud por WhatsApp <ArrowRight size={18} /></button>
                <button className="button proposal-email" type="button" onClick={emailProposal}>Prefiero enviar un correo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
