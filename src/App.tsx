import { useEffect, useLayoutEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import gardenPhoto from "./assets/couple-garden.jpg";
import wagonPhoto from "./assets/couple-wagon.jpg";
import eucalyptusBranch from "./assets/eucalyptus-branch.jpg";
import eucalyptusSpray from "./assets/eucalyptus-spray.jpg";

/** The invitation is designed on a fixed 306px-wide sheet and scaled to the viewport. */
const SHEET_WIDTH = 306;

function computeZoom(viewportWidth: number) {
  if (viewportWidth >= 768) return 1.5;
  if (viewportWidth >= 480) return 1.4;
  return viewportWidth / SHEET_WIDTH;
}

function useBoardZoom() {
  const [zoom, setZoom] = useState(() =>
    typeof document === "undefined" ? 1 : computeZoom(document.documentElement.clientWidth),
  );

  useEffect(() => {
    const update = () => setZoom(computeZoom(document.documentElement.clientWidth));
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return zoom;
}

type ActivityIconName = "church" | "cocktail" | "flowers" | "dinner" | "party" | "pin";
type DialogName = "rsvp" | "gift" | null;

const activities: { time: string; label: string; icon: ActivityIconName }[] = [
  { time: "5:00 PM", label: "Ceremony", icon: "church" },
  { time: "6:30 PM", label: "Welcome cocktail", icon: "cocktail" },
  { time: "7:45 PM", label: "Couple's entrance", icon: "flowers" },
  { time: "8:00 PM", label: "Dinner", icon: "dinner" },
  { time: "9:00 PM", label: "Party", icon: "party" },
  { time: "3:30 AM", label: "Farewell", icon: "pin" },
];

function Heart({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 15" fill="currentColor" aria-hidden="true">
      <path d="M8 14.1 1.5 7.8C-2.4 3.8 3.2-1.6 8 3.4c4.8-5 10.4.4 6.5 4.4L8 14.1Z" />
    </svg>
  );
}

function FineDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`fine-divider ${className}`} aria-hidden="true">
      <span />
      <Heart />
      <span />
    </div>
  );
}

function LeafFlourish({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 170 42" fill="none" aria-hidden="true">
      <g stroke="#777f68" strokeWidth=".9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M70 25C50 24 29 19 11 7M69 25C51 27 36 33 23 38M100 25c20-1 41-6 59-18M101 25c18 2 33 8 46 13" />
        <path d="M20 12c-5-1-8-5-8-8 5 0 9 3 10 8M29 17c-2-5-1-9 2-12 3 5 3 9 0 13M38 20c-4-2-7-6-7-9 5 0 9 3 9 9M45 22c-1-5 0-9 4-12 2 5 1 9-2 13M55 24c-4-2-6-5-7-8 5 0 8 3 9 8M30 34c-1-5 1-8 4-11 2 5 1 8-2 11M42 30c2-4 5-6 9-6-2 5-5 7-9 7M57 27c1-4 4-6 8-6-1 4-4 6-8 6" />
        <path d="M150 12c5-1 8-5 8-8-5 0-9 3-10 8M141 17c2-5 1-9-2-12-3 5-3 9 0 13M132 20c4-2 7-6 7-9-5 0-9 3-9 9M125 22c1-5 0-9-4-12-2 5-1 9 2 13M115 24c4-2 6-5 7-8-5 0-8 3-9 8M140 34c1-5-1-8-4-11-2 5-1 8 2 11M128 30c-2-4-5-6-9-6 2 5 5 7 9 7M113 27c-1-4-4-6-8-6 1 4 4 6 8 6" />
      </g>
      <path fill="#777f68" d="M85 33c-2.9-2.3-6.3-4.8-6.3-7.2 0-2.5 3.4-3.8 6.3-.6 2.9-3.2 6.3-1.9 6.3.6 0 2.4-3.4 4.9-6.3 7.2Z" />
    </svg>
  );
}

function ActivityIcon({ name }: { name: ActivityIconName }) {
  let drawing: ReactNode;

  switch (name) {
    case "church":
      drawing = (
        <>
          <path d="M18 2v7m-3-4h6M8 33V16l10-8 10 8v17H8Z" />
          <path d="M4 33h28M12 33V19h12v14M16 33v-8h4v8M17 14h2v4h-2zM4 24l4-3m24 3-4-3M3 29h5m20 0h5" />
        </>
      );
      break;
    case "cocktail":
      drawing = (
        <>
          <path d="M5 8h26L18 21 5 8ZM18 21v11m-8 1h16M7 12h22M23 8l6-6M26 3h6" />
          <circle cx="24" cy="10" r="1.5" />
        </>
      );
      break;
    case "flowers":
      drawing = (
        <>
          <path d="M17 18v16m-5-16 5 9 6-9M11 33h13M9 20l8 8m10-8-10 8" />
          <path d="M11 8c-4-5-8 2-4 4-5 2-1 8 3 5 1 5 7 4 7 0 4 3 7-3 3-5 3-4-2-8-5-4-1-4-6-4-4 0ZM23 6c-3-4-6 1-3 3-4 1-2 6 1 5 0 4 5 4 6 1 3 2 6-3 2-5 3-3-1-6-4-4Z" />
          <circle cx="13" cy="12" r="1.5" /><circle cx="24" cy="10" r="1.2" />
        </>
      );
      break;
    case "dinner":
      drawing = (
        <>
          <circle cx="19" cy="18" r="12" /><circle cx="19" cy="18" r="8" />
          <path d="M3 5v26M1 5v9m4-9v9M3 14h2M34 5v26M32 5c0 7 0 12 2 12" />
        </>
      );
      break;
    case "party":
      drawing = (
        <>
          <circle cx="18" cy="20" r="12" /><path d="M18 8V3m-5 0h10M6 20h24M9 12c6 4 12 4 18 0M9 28c6-4 12-4 18 0M18 8c-8 7-8 17 0 24M18 8c8 7 8 17 0 24M18 8v24" />
          <path d="M5 5v3m-2-2h4M29 3v4m-2-2h4" />
        </>
      );
      break;
    case "pin":
      drawing = (
        <>
          <path d="M18 34S8 24 8 16a10 10 0 0 1 20 0c0 8-10 18-10 18Z" />
          <circle cx="18" cy="16" r="3.5" />
        </>
      );
      break;
  }

  return (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {drawing}
    </svg>
  );
}

function ChairIcon() {
  return (
    <svg viewBox="0 0 48 54" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 7c5-3 19-3 24 0v25H12V7ZM9 32h30v5H9zM12 37l-2 15m26-15 2 15M16 37v12m16-12v12M12 13h24m-20 0v19m16-19v19M9 28l-3-4v-6m33 10 3-4v-6" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 46 47" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 19h36v7H5zM8 26h30v18H8zM21 19v25m4-25v25M23 19C15 14 10 13 10 8c0-4 5-6 9-3 3 3 4 9 4 14ZM23 19c8-5 13-6 13-11 0-4-5-6-9-3-3 3-4 9-4 14Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 3a20 20 0 0 0-17 30L4 44l11-3A20 20 0 1 0 24 3Z" />
      <path d="M17 13c-2 1-4 4-4 7 0 7 9 16 16 16 3 0 6-2 7-4l-6-4-3 3c-4-2-7-5-9-9l3-3-4-6Z" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 36 27" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="32" height="23" rx="1" />
      <path d="m2 4 16 12L34 4" />
    </svg>
  );
}

function PointerIcon() {
  return (
    <svg className="button-pointer" viewBox="0 0 30 31" fill="#fbf8f1" stroke="#32372c" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 28 4 19c-.9-1.7.5-3.3 2-2.8l5 3V5a2 2 0 0 1 4 0v10a2 2 0 0 1 3.5-1.1 2 2 0 0 1 3.6 1.1 2 2 0 0 1 3.5 1.4l-.5 6.9c-.2 3.1-2.9 5.7-6 5.7H9Z" />
    </svg>
  );
}

function WashBackground() {
  return (
    <svg className="wash-background" viewBox="0 0 306 303" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="wash-color" x1="0" x2=".2" y1="0" y2="1">
          <stop offset="0" stopColor="#e4e7d8" />
          <stop offset=".47" stopColor="#d4dacb" />
          <stop offset="1" stopColor="#e2e5d8" />
        </linearGradient>
        <radialGradient id="wash-shadow">
          <stop offset="0" stopColor="#aebea9" stopOpacity=".38" />
          <stop offset="1" stopColor="#aebea9" stopOpacity="0" />
        </radialGradient>
        <filter id="wash-blur"><feGaussianBlur stdDeviation="15" /></filter>
        <filter id="wash-grain">
          <feTurbulence type="fractalNoise" baseFrequency=".04 .07" numOctaves="3" seed="12" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <clipPath id="wash-edge">
          <path d="M0 10 7 12 13 8 21 12 28 7 35 10 43 5 52 10 61 7 70 12 79 8 88 11 96 6 105 12 114 9 122 13 130 8 138 10 147 7 156 12 164 8 172 12 182 9 190 13 199 7 207 11 217 9 227 13 235 8 244 12 252 7 260 12 270 10 280 15 290 12 299 18 306 16V286l-7 3-8-1-7 6-9-2-8 5-9-4-8 3-8-3-8 5-9-3-9 3-8-4-10 3-9-5-9 3-8-4-10 2-8-4-9 4-9-4-8 2-9-4-8 2-8-5-9 3-10-5-8 2-8-6-8 2-8-4-8 2-8-5-8 1-7-4-8 2-7-4-8 1-7-5-7 2-6-4-6 1V10Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#wash-edge)">
        <path d="M0 0h306v303H0z" fill="url(#wash-color)" />
        <ellipse cx="54" cy="110" rx="110" ry="90" fill="url(#wash-shadow)" filter="url(#wash-blur)" />
        <ellipse cx="252" cy="180" rx="100" ry="145" fill="url(#wash-shadow)" filter="url(#wash-blur)" />
        <ellipse cx="166" cy="274" rx="128" ry="54" fill="#f0f0df" opacity=".29" filter="url(#wash-blur)" />
        <path d="M0 0h306v303H0z" filter="url(#wash-grain)" opacity=".075" style={{ mixBlendMode: "multiply" }} />
      </g>
    </svg>
  );
}

function LocationButton({ query }: { query: string }) {
  return (
    <a
      className="olive-button location-button"
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${query} on Google Maps`}
    >
      View Location
      <PointerIcon />
    </a>
  );
}

function Invitation({ onOpenDialog }: { onOpenDialog: (dialog: DialogName) => void }) {
  return (
    <article className="paper" aria-label="Wedding invitation for Rafaela and Josue">
      <img className="botanical botanical-top" src={eucalyptusBranch} alt="" aria-hidden="true" />
      <img className="botanical botanical-top-left" src={eucalyptusSpray} alt="" aria-hidden="true" />
      <img className="botanical botanical-left-bottom" src={eucalyptusSpray} alt="" aria-hidden="true" />
      <img className="botanical botanical-right-middle" src={eucalyptusSpray} alt="" aria-hidden="true" />
      <img className="botanical botanical-right-side" src={eucalyptusSpray} alt="" aria-hidden="true" />

      <div className="scripture">
        <p>"THREE THINGS WILL LAST<br />FOREVER - FAITH, HOPE,<br />AND LOVE. AND THE GREATEST<br />OF THESE IS LOVE."</p>
        <span>1 CORINTHIANS 13:13</span>
      </div>

      <div className="monogram" aria-label="R and J">
        <span>R</span><i /><span>J</span>
      </div>
      <div className="our-wedding">Our Wedding</div>
      <FineDivider className="opening-divider" />

      <div className="garden-photo">
        <img src={gardenPhoto} alt="Rafaela and Josue sitting together in a garden" />
      </div>

      <p className="invitation-copy">
        WITH GREAT JOY AND GRATEFUL HEARTS,<br />
        TOGETHER WITH OUR PARENTS, WE INVITE YOU<br />
        TO SHARE IN THE CELEBRATION OF OUR LOVE<br />
        AS WE UNITE IN MARRIAGE.
      </p>
      <FineDivider className="family-divider" />

      <div className="parents">
        <div>
          <strong>Parents of the Groom</strong>
          <span>Mr. Carlos Mendes<br />&amp; Mrs. {"L\u00facia"} Mendes</span>
        </div>
        <div>
          <strong>Parents of the Bride</strong>
          <span>Mr. {"Andr\u00e9"} Souza<br />&amp; Mrs. Juliana Souza</span>
        </div>
      </div>

      <div className="couple-names">
        <h1 className="first-name">Rafaela</h1>
        <span className="ampersand">&amp;</span>
        <div className="second-name">{"Josu\u00e9"}</div>
      </div>

      <p className="honor-line">WE HAVE THE HONOR OF INVITING<br />YOU TO OUR WEDDING</p>

      <div className="wedding-date" aria-label="Friday, April 14, 2023">
        <div className="month">April</div>
        <div className="date-row">
          <span className="date-side">Friday</span>
          <span className="date-number">14</span>
          <span className="date-side">2023</span>
        </div>
      </div>
      <LeafFlourish className="date-flourish" />
      <div className="signature">AreOne</div>

      <section className="venue venue-ceremony" aria-label="Religious ceremony">
        <div className="venue-time">5:00 PM</div>
        <h2>Religious Ceremony</h2>
        <strong>Saint Patrick Church</strong>
        <p>123 Green Valley Road<br />Lisbon: State of Grace 01234</p>
        <LocationButton query="Saint Patrick Church, 123 Green Valley Road, Lisbon" />
      </section>
      <FineDivider className="venue-divider" />
      <section className="venue venue-reception" aria-label="Reception">
        <div className="venue-time">6:30 PM</div>
        <h2>Reception</h2>
        <strong>Villa das Flores</strong>
        <p>456 Garden Lane<br />Lisbon: State of Grace 01234</p>
        <LocationButton query="Villa das Flores, 456 Garden Lane, Lisbon" />
      </section>

      <h2 className="itinerary-title">Itinerary of Activities</h2>
      <WashBackground />
      <section className="itinerary" aria-label="Itinerary of activities">
        <div className="timeline-line" aria-hidden="true" />
        {activities.map((activity, index) => (
          <div className="activity" key={activity.time} style={{ "--i": index } as CSSProperties}>
            <div className="activity-icon"><ActivityIcon name={activity.icon} /></div>
            <span className="timeline-dot" aria-hidden="true" />
            <p><strong>{activity.time}</strong><br />{activity.label}</p>
          </div>
        ))}
      </section>

      <section className="detail-block reserved" aria-label="Reserved seats">
        <div className="detail-icon chair-icon"><ChairIcon /></div>
        <div className="detail-body">
          <h2>Reserved Seats<br />For You</h2>
          <div className="seat-count"><span>2</span> Seats</div>
        </div>
      </section>
      <FineDivider className="reserved-divider" />

      <section className="detail-block gifts" aria-label="Gift suggestion">
        <div className="detail-icon gift-icon"><GiftIcon /></div>
        <div className="detail-body">
          <h2>Gift Suggestion</h2>
          <p>Your presence is the greatest gift<br />of all. However, if you wish to honor<br />us with a gift, a monetary contribution<br />will be warmly appreciated.</p>
          <button className="envelope-link" type="button" onClick={() => onOpenDialog("gift")}>Gift Envelopes<EnvelopeIcon /></button>
        </div>
      </section>
      <FineDivider className="gift-divider" />

      <section className="detail-block confirmation" aria-label="Attendance confirmation">
        <div className="detail-icon phone-icon"><PhoneIcon /></div>
        <div className="detail-body">
          <h2>Confirmation</h2>
          <p>Please confirm your attendance<br />by March 1st, 2023.</p>
          <button className="olive-button message-button" type="button" onClick={() => onOpenDialog("rsvp")}>
            Send Message<PointerIcon />
          </button>
        </div>
      </section>

      <div className="adults-note">
        <h2>Adults Only, Please</h2>
        <p>We hope you understand<br />our special day is an adults-only celebration.</p>
        <Heart className="note-heart" />
      </div>
      <LeafFlourish className="right-flourish" />
      <p className="closing-line">We Look Forward To<br />Celebrating With You</p>

      <div className="final-photo">
        <img src={wagonPhoto} alt="Rafaela and Josue sharing a kiss in a garden" />
      </div>
    </article>
  );
}

function InvitationDialog({ name, onClose }: { name: DialogName; onClose: () => void }) {
  const [guestName, setGuestName] = useState("");
  const [attending, setAttending] = useState("Yes, I will be there");
  const [guestCount, setGuestCount] = useState("1");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!name) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [name, onClose]);

  if (!name) return null;

  const copyRsvp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Hello Rafaela and Josue! This is ${guestName}. ${attending}. Guests: ${attending.startsWith("Yes") ? guestCount : "0"}.${note ? ` Message: ${note}` : ""}`;

    try {
      await navigator.clipboard.writeText(message);
      setStatus("Your RSVP message is copied. Paste it into a message to the couple.");
    } catch {
      window.location.href = `mailto:?subject=${encodeURIComponent("Wedding RSVP")}&body=${encodeURIComponent(message)}`;
      setStatus("Your email app is opening with the RSVP message.");
    }
  };

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="dialog-panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close dialog">&times;</button>
        {name === "gift" ? (
          <div className="gift-dialog-content">
            <div className="dialog-ornament"><GiftIcon /></div>
            <h2 id="dialog-title">Gift Envelopes</h2>
            <FineDivider />
            <p>Your presence at our wedding is the greatest gift. If you would also like to give a monetary gift, envelopes may be brought to the celebration.</p>
            <button type="button" className="olive-button dialog-action" onClick={onClose}>With Love</button>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={copyRsvp}>
            <h2 id="dialog-title">Kindly Reply</h2>
            <p>Prepare a message to let us know whether you can celebrate with us.</p>
            <label>Your name<input autoFocus value={guestName} onChange={(event) => setGuestName(event.target.value)} required placeholder="Your full name" /></label>
            <label>Will you attend?<select value={attending} onChange={(event) => setAttending(event.target.value)}><option>Yes, I will be there</option><option>Sorry, I cannot attend</option></select></label>
            {attending.startsWith("Yes") && <label>Number of guests<select value={guestCount} onChange={(event) => setGuestCount(event.target.value)}><option value="1">1 guest</option><option value="2">2 guests</option></select></label>}
            <label>A note for the couple (optional)<textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} placeholder="Your message" /></label>
            <button className="olive-button dialog-action" type="submit">Copy RSVP Message</button>
            {status && <p className="dialog-status" role="status">{status}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [dialog, setDialog] = useState<DialogName>(null);
  const boardZoom = useBoardZoom();

  useLayoutEffect(() => {
    // Only hide content for the reveal choreography when we can reliably show it again.
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const paper = document.querySelector(".paper");
    if (!paper) return;

    const elements = Array.from(paper.children).filter(
      (element) => !element.classList.contains("botanical") && element.tagName.toLowerCase() !== "svg",
    );

    paper.classList.add("reveal-ready");
    elements.forEach((element, index) => {
      element.classList.add("reveal");
      (element as HTMLElement).style.transitionDelay = `${(index % 4) * 85}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="invitation-stage">
      <div className="invitation-board" style={{ zoom: boardZoom }}>
        <Invitation onOpenDialog={setDialog} />
      </div>
      <InvitationDialog name={dialog} onClose={() => setDialog(null)} />
    </main>
  );
}
