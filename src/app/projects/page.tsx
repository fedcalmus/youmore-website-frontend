import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { getProjects } from "@/lib/projects";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Progetti · Youmore",
  description: "Progetti nazionali e internazionali, in corso e terminati.",
};

export const instant = false;

export default async function ProgettiPage() {
  await connection();
  const projects = getProjects(true);

  return (
    <>
      <section className="projects-head">
        <div className="projects-head__row">
          <div>
            <div className="up eyebrow eyebrow--blue">Progetti</div>
            <h1 className="disp up d1 projects-head__title">
              Trova il tuo
              <br />
              prossimo viaggio.
            </h1>
          </div>
          <p className="up d2 projects-head__intro">Quando la scadenza passa, il progetto si chiude da solo e finisce tra i terminati.</p>
        </div>
      </section>

      <Suspense>
        <ProjectsExplorer projects={projects} />
      </Suspense>
    </>
  );
}
