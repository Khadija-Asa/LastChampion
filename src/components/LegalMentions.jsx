import { Link } from "react-router-dom";
import "./../styles/LegalMentions.css";

export default function LegalMentions() {
  return (
    <div className="legal_wrapper">
      <div className="legal_content">
        <Link to="/" className="legal_back">
          ← Retour
        </Link>

        <h1>Mentions légales</h1>

        <section>
          <h2>Éditeur du site</h2>
          <p>Khadidja Aït Si Ali</p>
          <p>
            Contact :{" "}
            <a href="mailto:khadidja.aitsiali@gmail.com">
              khadidja.aitsiali@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2>Hébergement</h2>
          <p>GitHub Pages</p>
          <p>
            GitHub, Inc. — 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA
          </p>
        </section>

        <section>
          <h2>Propriété intellectuelle</h2>
          <p>
            Les images utilisées sur ce site appartiennent à leurs ayants droit
            respectifs. Ce site est un projet personnel à but non commercial.
          </p>
        </section>

        <section>
          <h2>Données personnelles</h2>
          <p>
            Ce site ne collecte aucune donnée personnelle. Aucun cookie de
            traçage n'est utilisé.
          </p>
        </section>
      </div>
    </div>
  );
}
