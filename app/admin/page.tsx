"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { contentStorageKey, defaultContent, SiteContent } from "../content";

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(contentStorageKey);
    if (stored) window.requestAnimationFrame(() => setContent({ ...defaultContent, ...JSON.parse(stored) }));
  }, []);

  function updateField(field: keyof SiteContent, value: string) {
    setContent((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function updateProduct(index: number, field: "title" | "description", value: string) {
    setContent((current) => ({
      ...current,
      products: current.products.map((product, productIndex) => productIndex === index ? { ...product, [field]: value } : product),
    }));
    setSaved(false);
  }

  function saveContent() {
    window.localStorage.setItem(contentStorageKey, JSON.stringify(content));
    setSaved(true);
  }

  function resetContent() {
    window.localStorage.removeItem(contentStorageKey);
    setContent(defaultContent);
    setSaved(false);
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div><span className="admin-kicker">Agriwerk LLP</span><h1>Page editor</h1><p>Update the words your visitors see on the public website.</p></div>
        <Link className="admin-preview" href="/">View live page <span aria-hidden="true">-&gt;</span></Link>
      </header>
      <div className="admin-layout">
        <section className="admin-panel">
          <div className="admin-section-heading"><span>01</span><h2>Hero section</h2></div>
          <EditorField label="Eyebrow" value={content.heroEyebrow} onChange={(event) => updateField("heroEyebrow", event.target.value)} />
          <EditorField label="Main heading" value={content.heroTitle} onChange={(event) => updateField("heroTitle", event.target.value)} textarea />
          <EditorField label="Introduction" value={content.heroText} onChange={(event) => updateField("heroText", event.target.value)} textarea />
        </section>
        <section className="admin-panel">
          <div className="admin-section-heading"><span>02</span><h2>Company section</h2></div>
          <EditorField label="Section label" value={content.companyEyebrow} onChange={(event) => updateField("companyEyebrow", event.target.value)} />
          <EditorField label="Heading" value={content.companyTitle} onChange={(event) => updateField("companyTitle", event.target.value)} textarea />
          <EditorField label="Description" value={content.companyText} onChange={(event) => updateField("companyText", event.target.value)} textarea />
        </section>
        <section className="admin-panel admin-products">
          <div className="admin-section-heading"><span>03</span><h2>Products</h2></div>
          {content.products.map((product, index) => <div className="admin-product" key={product.number}><span className="admin-number">{product.number}</span><EditorField label="Product name" value={product.title} onChange={(event) => updateProduct(index, "title", event.target.value)} /><EditorField label="Description" value={product.description} onChange={(event) => updateProduct(index, "description", event.target.value)} textarea /></div>)}
        </section>
        <section className="admin-panel">
          <div className="admin-section-heading"><span>04</span><h2>Contact details</h2></div>
          <EditorField label="Email address" value={content.contactEmail} onChange={(event) => updateField("contactEmail", event.target.value)} type="email" />
          <EditorField label="Location or service area" value={content.contactLocation} onChange={(event) => updateField("contactLocation", event.target.value)} />
        </section>
      </div>
      <footer className="admin-actions"><button className="button" type="button" onClick={saveContent}>Save changes</button><button className="admin-reset" type="button" onClick={resetContent}>Reset to default</button>{saved && <span className="admin-saved" role="status">Saved. Open the live page to see your updates.</span>}</footer>
    </main>
  );
}

function EditorField({ label, value, onChange, textarea = false, type = "text" }: { label: string; value: string; onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; textarea?: boolean; type?: string }) {
  return <label className="admin-field"><span>{label}</span>{textarea ? <textarea value={value} onChange={onChange} rows={3} /> : <input type={type} value={value} onChange={onChange} />}</label>;
}
