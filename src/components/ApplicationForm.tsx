"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowRightIcon, CheckIcon } from "./icons";
import { submitApplication } from "@/lib/applications";
import type { Gender, TshirtSize, VolunteerApplicationInput } from "@/lib/applications";
import { DatePicker } from "./DatePicker";
import { SelectField } from "./SelectField";

const GENDER_OPTIONS = [
  { value: "Donna", label: "Donna" },
  { value: "Uomo", label: "Uomo" },
  { value: "Non binario", label: "Non binario" },
  { value: "Preferisco non dirlo", label: "Preferisco non dirlo" },
];

const SOURCE_OPTIONS = [
  { value: "Instagram", label: "Instagram" },
  { value: "Facebook", label: "Facebook" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Sito web", label: "Sito web" },
  { value: "Passaparola", label: "Passaparola" },
  { value: "Scuola o università", label: "Scuola o università" },
  { value: "Altro", label: "Altro" },
];

type FormValues = {
  nome: string;
  cognome: string;
  genere: string;
  nascita: string;
  cittadinanza: string;
  citta: string;
  email: string;
  telefono: string;
  passaporto: string;
  valido: string;
  motivazione: string;
  prima: string;
  fonte: string;
  emergenza: string;
  bisogni: string;
  taglia: string;
  gruppo: boolean;
  privacy: boolean;
};

const REQUIRED_KEYS: (keyof FormValues)[] = [
  "nome", "cognome", "genere", "nascita", "cittadinanza", "citta", "email", "telefono",
  "passaporto", "valido", "motivazione", "prima", "fonte", "emergenza", "bisogni", "taglia", "privacy",
];

const MIN_AGE = 16;
const MAX_AGE = 99;

function getAgeInYears(dob: Date): number {
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear = now.getMonth() > dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
  nome: yup.string().trim().required("Campo obbligatorio"),
  cognome: yup.string().trim().required("Campo obbligatorio"),
  genere: yup.string().required("Campo obbligatorio"),
  nascita: yup
    .string()
    .required("Campo obbligatorio")
    .test("not-future", "La data di nascita non può essere nel futuro", (value) => !value || new Date(value) <= new Date())
    .test("min-age", `Devi avere almeno ${MIN_AGE} anni per candidarti`, (value) => !value || getAgeInYears(new Date(value)) >= MIN_AGE)
    .test("max-age", "Controlla la data di nascita inserita", (value) => !value || getAgeInYears(new Date(value)) <= MAX_AGE),
  cittadinanza: yup.string().trim().required("Campo obbligatorio"),
  citta: yup.string().trim().required("Campo obbligatorio"),
  email: yup.string().trim().email("Controlla l’indirizzo email").required("Campo obbligatorio"),
  telefono: yup.string().trim().required("Campo obbligatorio"),
  passaporto: yup.string().required("Scegli un’opzione"),
  valido: yup.string().required("Scegli un’opzione"),
  motivazione: yup.string().trim().required("Campo obbligatorio"),
  prima: yup.string().required("Scegli un’opzione"),
  fonte: yup.string().required("Campo obbligatorio"),
  emergenza: yup.string().trim().required("Campo obbligatorio"),
  bisogni: yup.string().trim().required("Campo obbligatorio"),
  taglia: yup.string().required("Scegli un’opzione"),
  gruppo: yup.boolean().default(false).required(),
  privacy: yup.boolean().oneOf([true], "Serve il consenso al trattamento dei dati per inviare la candidatura").required(),
});

function mapGender(value: string): Gender {
  if (value === "Donna") return "FEMALE";
  if (value === "Uomo") return "MALE";
  return "OTHER";
}

function mapYesNo(value: string): boolean {
  return value === "Sì";
}

/** "valido" has a third option ("Non lo so") that mapYesNo would otherwise collapse into "No" — keep it distinct. */
function mapYesNoUnknown(value: string): boolean | null {
  if (value === "Sì") return true;
  if (value === "No") return false;
  return null;
}

function toApplicationInput(data: FormValues): VolunteerApplicationInput {
  return {
    name: data.nome,
    surname: data.cognome,
    gender: mapGender(data.genere),
    citizenship: data.cittadinanza,
    city: data.citta,
    dateOfBirth: data.nascita,
    email: data.email,
    phoneNumber: data.telefono,
    hasPassport: mapYesNo(data.passaporto),
    travelDocumentValidForCountry: mapYesNoUnknown(data.valido),
    motivation: data.motivazione,
    isFirstExperience: mapYesNo(data.prima),
    howDidYouFindUs: data.fonte,
    emergencyContact: data.emergenza,
    specialNeeds: data.bisogni,
    tshirtSize: data.taglia as TshirtSize,
    emailGroupConsent: data.gruppo,
    personalDataConsent: data.privacy,
  };
}

export function ApplicationForm({ slug, projectTitle, projectLocation }: { slug: string; projectTitle: string; projectLocation: string }) {
  const [sent, setSent] = useState<{ name: string; email: string; when: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { gruppo: false, privacy: false },
  });

  const values = watch();
  const done = REQUIRED_KEYS.filter((k) => !!values[k]).length;
  const pct = Math.round((done / REQUIRED_KEYS.length) * 100);
  const motivLen = values.motivazione?.length || 0;
  const hasErrors = isSubmitted && Object.keys(errors).length > 0;

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    setSubmitError(null);

    const result = await submitApplication(slug, toApplicationInput(data));

    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }

    const when = new Date().toLocaleString("it-IT", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
    setSent({ name: data.nome, email: data.email, when });
  }

  return (
    <section id="candidatura" className="section scroll-anchor">
      <div className="application-form__card">
        <div className="application-form__header">
          <div>
            <div className="eyebrow">Candidatura</div>
            <h2 className="disp application-form__title">Candidati a {projectTitle}</h2>
          </div>
          {!sent && (
            <div className="progress">
              <div className="progress__meta">
                <span>Completamento</span>
                <span>{pct}%</span>
              </div>
              <div className="progress__track">
                <div className="progress__fill" style={{ "--progress": `${pct}%` } as React.CSSProperties} />
              </div>
            </div>
          )}
        </div>

        {sent ? (
          <div role="status" className="success-panel application-form__success">
            <span className="okmark success-icon">
              <CheckIcon size={40} />
            </span>
            <h3 className="disp application-form__success-title">Candidatura inviata!</h3>
            <p className="application-form__success-text">
              Grazie {sent.name}. Abbiamo ricevuto la tua candidatura a {projectTitle} il {sent.when}. Ti scriviamo a {sent.email} appena chiusa la selezione.
            </p>
            <div className="success-actions">
              <Link className="btn btn-ink" href="/projects">
                Altri progetti
              </Link>
              <button
                type="button"
                className="btn btn-panel"
                onClick={() => {
                  reset();
                  setSent(null);
                }}
              >
                Nuova candidatura
              </button>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="application-form__body form-stack">
            {hasErrors && (
              <div role="alert" className="alert alert-error">
                Mancano alcuni campi obbligatori. Li trovi evidenziati qui sotto.
              </div>
            )}
            {submitError && (
              <div role="alert" className="alert alert-error">
                {submitError}
              </div>
            )}

            <fieldset className="sec">
              <legend>1 · Dati personali</legend>
              <label className="lbl">
                Progetto a cui ti candidi
                <input className="in" value={`${projectTitle} · ${projectLocation}`} readOnly />
              </label>
              <div className="field-grid">
                <label className="lbl">
                  Nome *<input className="in" autoComplete="given-name" {...register("nome")} />
                  <span className="err">{errors.nome?.message}</span>
                </label>
                <label className="lbl">
                  Cognome *<input className="in" autoComplete="family-name" {...register("cognome")} />
                  <span className="err">{errors.cognome?.message}</span>
                </label>
                <label className="lbl">
                  Genere *
                  <Controller
                    control={control}
                    name="genere"
                    render={({ field }) => (
                      <SelectField
                        options={GENDER_OPTIONS}
                        placeholder="Seleziona"
                        value={GENDER_OPTIONS.find((o) => o.value === field.value) ?? null}
                        onChange={(option) => field.onChange(option?.value ?? "")}
                      />
                    )}
                  />
                  <span className="err">{errors.genere?.message}</span>
                </label>
                <label className="lbl">
                  Data di nascita *
                  <Controller
                    control={control}
                    name="nascita"
                    render={({ field }) => (
                      <DatePicker
                        value={field.value || undefined}
                        options={{ dateFormat: "Y-m-d", altInput: true, altFormat: "d/m/Y", maxDate: "today" }}
                        onChange={(_dates, dateStr) => field.onChange(dateStr)}
                      />
                    )}
                  />
                  <span className="err">{errors.nascita?.message}</span>
                </label>
                <label className="lbl">
                  Cittadinanza *<input className="in" {...register("cittadinanza")} />
                  <span className="err">{errors.cittadinanza?.message}</span>
                </label>
                <label className="lbl">
                  Città di residenza *<input className="in" autoComplete="address-level2" {...register("citta")} />
                  <span className="err">{errors.citta?.message}</span>
                </label>
                <label className="lbl">
                  Email *<input className="in" type="email" autoComplete="email" {...register("email")} />
                  <span className="err">{errors.email?.message}</span>
                </label>
                <label className="lbl">
                  Telefono *<input className="in" type="tel" autoComplete="tel" {...register("telefono")} />
                  <span className="err">{errors.telefono?.message}</span>
                </label>
              </div>
            </fieldset>

            <fieldset className="sec">
              <legend>2 · Documenti</legend>
              <div className="field-group" role="radiogroup" aria-labelledby="l-pass">
                <span id="l-pass" className="field-group__label">
                  Hai il passaporto? *
                </span>
                <div className="pills">
                  <label className="pill">
                    <input type="radio" value="Sì" {...register("passaporto")} />
                    <span>Sì</span>
                  </label>
                  <label className="pill">
                    <input type="radio" value="No" {...register("passaporto")} />
                    <span>No</span>
                  </label>
                </div>
                <span className="err">{errors.passaporto?.message}</span>
              </div>
              <div className="field-group" role="radiogroup" aria-labelledby="l-valid">
                <span id="l-valid" className="field-group__label">
                  Il tuo documento di viaggio è valido per il paese del progetto? *
                </span>
                <div className="pills">
                  <label className="pill">
                    <input type="radio" value="Sì" {...register("valido")} />
                    <span>Sì</span>
                  </label>
                  <label className="pill">
                    <input type="radio" value="No" {...register("valido")} />
                    <span>No</span>
                  </label>
                  <label className="pill">
                    <input type="radio" value="Non lo so" {...register("valido")} />
                    <span>Non lo so</span>
                  </label>
                </div>
                <span className="err">{errors.valido?.message}</span>
              </div>
            </fieldset>

            <fieldset className="sec">
              <legend>3 · Motivazione</legend>
              <label className="lbl">
                Descrivi brevemente perché vuoi partecipare a questo progetto *
                <textarea className="in" {...register("motivazione")} />
                <span className="hint">
                  {motivLen} caratteri{motivLen < 200 ? " · bastano poche righe sincere" : ""}
                </span>
                <span className="err">{errors.motivazione?.message}</span>
              </label>
              <div className="field-group" role="radiogroup" aria-labelledby="l-first">
                <span id="l-first" className="field-group__label">
                  È la tua prima esperienza? *
                </span>
                <div className="pills">
                  <label className="pill">
                    <input type="radio" value="Sì" {...register("prima")} />
                    <span>Sì, è la prima</span>
                  </label>
                  <label className="pill">
                    <input type="radio" value="No" {...register("prima")} />
                    <span>No, ho già partecipato</span>
                  </label>
                </div>
                <span className="err">{errors.prima?.message}</span>
              </div>
              <label className="lbl lbl--narrow">
                Dove hai trovato informazioni su Youmore? *
                <Controller
                  control={control}
                  name="fonte"
                  render={({ field }) => (
                    <SelectField
                      options={SOURCE_OPTIONS}
                      placeholder="Seleziona"
                      value={SOURCE_OPTIONS.find((o) => o.value === field.value) ?? null}
                      onChange={(option) => field.onChange(option?.value ?? "")}
                    />
                  )}
                />
                <span className="err">{errors.fonte?.message}</span>
              </label>
            </fieldset>

            <fieldset className="sec">
              <legend>4 · Logistica e sicurezza</legend>
              <div className="field-grid--wide">
                <label className="lbl">
                  Contatto di emergenza (nome e numero) *<input className="in" {...register("emergenza")} />
                  <span className="err">{errors.emergenza?.message}</span>
                </label>
                <label className="lbl">
                  Esigenze particolari (alimentari, mediche, accessibilità) *
                  <input className="in" placeholder="Scrivi «nessuna» se non ne hai" {...register("bisogni")} />
                  <span className="err">{errors.bisogni?.message}</span>
                </label>
              </div>
              <div className="field-group" role="radiogroup" aria-labelledby="l-size">
                <span id="l-size" className="field-group__label">
                  Taglia T-shirt Youmore *
                </span>
                <div className="pills">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <label key={size} className="pill">
                      <input type="radio" value={size} {...register("taglia")} />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
                <span className="err">{errors.taglia?.message}</span>
              </div>
            </fieldset>

            <fieldset className="sec">
              <legend>5 · Consensi</legend>
              <label className="chk">
                <input type="checkbox" {...register("gruppo")} />
                <span>Autorizzo l&apos;inserimento della mia mail nel gruppo di Youmore APS Projects (youmoreprojects@googlegroups.com) per la ricezione delle informazioni inerenti ai progetti.</span>
              </label>
              <label className="chk">
                <input type="checkbox" {...register("privacy")} />
                <span>
                  Autorizzo il trattamento dei miei dati personali ai sensi del D.lgs. 196/2003 «Codice in materia di protezione dei dati personali», del Regolamento UE 2016/679 (GDPR) e dell&apos;
                  <Link href="/privacy-cookie">Informativa sul trattamento dei dati personali</Link> e sull&apos;<Link href="/privacy-cookie?tab=cookie">utilizzo dei cookie</Link> (Provvedimento del Garante della Privacy 229/2014). *
                </span>
              </label>
              <span className="err">{errors.privacy?.message}</span>
            </fieldset>

            <div className="application-form__footer">
              <span className="application-form__footer-note">* campo obbligatorio · data e ora dell&apos;invio vengono registrate automaticamente</span>
              <button type="submit" className="btn btn-blue btn-lg" disabled={submitting} aria-busy={submitting}>
                {submitting ? "Invio in corso…" : "Invia candidatura"}
                <ArrowRightIcon />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
