"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="landing-container flex-center">
      <div className="landing-content glass-panel">
        <h1>Équilibre</h1>
        <p>Un accompagnement relationnel et personnel continu.</p>
        <Link href="/dashboard" className="btn btn-primary">
          <span>Accéder à mon espace</span>
          <ArrowRight size={18} style={{ marginLeft: "0.5rem" }} />
        </Link>
      </div>

      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--bg-color) 0%, #e0e7ff 100%);
          padding: 1rem;
        }

        .landing-content {
          padding: 3rem 2rem;
          text-align: center;
          max-width: 500px;
          width: 100%;
        }

        h1 {
          font-size: 3rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-bottom: 1rem;
          letter-spacing: -0.05em;
        }

        p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}
