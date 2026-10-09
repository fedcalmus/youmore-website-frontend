"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CheckIcon } from "./icons";

type FormValues = {
  nome: string;
  cognome: string;
  email: string;
  pw: string;
  privacy: boolean;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  nome: yup.string().trim().required("Campo obbligatorio"),
  cognome: yup.string().trim().required("Campo obbligatorio"),
  email: yup.string().trim().email("Inserisci un indirizzo email valido").required("Inserisci un indirizzo email valido"),
  pw: yup.string().min(8, "La password deve avere almeno 8 caratteri").required("La password deve avere almeno 8 caratteri"),
  privacy: yup.boolean().oneOf([true], "Serve il consenso per creare l’account").required(),
});

export function RegistrationForm() {
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState<{ nome: string; email: string } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { privacy: false },
  });

  function onSubmit(data: FormValues) {
    /* Qui il backend crea l'account: es. fetch('/api/registrazione', { method: 'POST', body: JSON.stringify(data) }) */
    setDone({ nome: data.nome.trim(), email: data.email.trim() });
  }

  if (done) {
    return (
      <div role="status" className="success-panel success-panel--start registration-form__success">
        <span className="okmark success-icon success-icon--sm">
          <CheckIcon size={32} />
        </span>
        <h2 className="disp registration-form__success-title">Benvenuto, {done.nome}!</h2>
        <p className="registration-form__success-text">Ti abbiamo mandato un&apos;email a {done.email} per confermare l&apos;account.</p>
        <Link className="btn btn-ink" href="/projects">
          Scopri i progetti
        </Link>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="form-stack form-stack--tight registration-form">
      <h2 className="disp registration-form__title">Crea il tuo account</h2>
      <div className="field-grid--tight">
        <label className="lbl">
          Nome
          <input className="in" autoComplete="given-name" {...register("nome")} />
          <span className="err">{errors.nome?.message}</span>
        </label>
        <label className="lbl">
          Cognome
          <input className="in" autoComplete="family-name" {...register("cognome")} />
          <span className="err">{errors.cognome?.message}</span>
        </label>
      </div>
      <label className="lbl">
        Email
        <input className="in" type="email" autoComplete="email" {...register("email")} />
        <span className="err">{errors.email?.message}</span>
      </label>
      <label className="lbl">
        Password
        <span className="password-field">
          <input className="in" type={showPw ? "text" : "password"} autoComplete="new-password" minLength={8} {...register("pw")} />
          <button type="button" aria-pressed={showPw} className="password-toggle" onClick={() => setShowPw((v) => !v)}>
            {showPw ? "Nascondi" : "Mostra"}
          </button>
        </span>
        <span className="hint">Almeno 8 caratteri</span>
        <span className="err">{errors.pw?.message}</span>
      </label>
      <label className="chk">
        <input type="checkbox" {...register("privacy")} />
        <span>
          Ho letto l&apos;<Link href="/privacy-cookie">informativa privacy</Link> e acconsento al trattamento dei miei dati (Reg. UE 2016/679).
        </span>
      </label>
      <span className="err">{isSubmitted ? errors.privacy?.message : ""}</span>
      <button type="submit" className="btn btn-blue registration-form__submit">
        Crea account
      </button>
      <p className="registration-form__footnote">
        Hai già un account?{" "}
        <a href="#" className="registration-form__link">
          Accedi
        </a>
      </p>
    </form>
  );
}
