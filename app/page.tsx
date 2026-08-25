"use client";

import { FormEvent, useEffect, useState } from "react";
import { contentStorageKey, defaultContent, SiteContent } from "./content";

const competencies = [
  ["Farm planning", "Practical recommendations based on crop, soil, season, water, and the farmer's goals."],
  ["Field operations", "Timely support from plantation through harvest, with attention to productivity and crop health."],
  ["Tools that enable work", "We design and manufacture dependable tools and equipment for everyday agricultural tasks."],
  ["Value after harvest", "Better handling, quality, packaging, and market connections help reduce waste and improve returns."],
];

const journey = [
  ["01", "Plan", "Understand the crop, land, resources, and market before the first seed goes into the soil."],
  ["02", "Grow", "Support the crop and the people growing it with timely knowledge, tools, and field action."],
  ["03", "Harvest value", "Protect quality after harvest and connect the finished produce to the right destination."],
];

export default function Home() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(contentStorageKey);
    if (saved) window.requestAnimationFrame(() => setContent({ ...defaultContent, ...JSON.parse(saved) }));
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Agriwerk LLP home">
          <span className="logo-mark">A</span>
          Agriwerk LLP
        </a>
        <nav className="nav" aria-label="Main navigation">
          <a href="#company">Our work</a>
          <a href="#lifecycle">Farm lifecycle</a>
          <a href="#tools">Tools</a>
          <a className="nav-cta" href="#contact">Reach us</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">Supporting every stage of farming</span>
            <h1>From soil preparation to market-ready produce.</h1>
            <p>Agriwerk LLP works across the farming cycle, helping people plan better, grow stronger, harvest carefully, and use the right tools along the way.</p>
            <a className="button" href="#company">Explore our work</a>
          </div>
        </section>

        <section className="section" id="company">
          <div className="section-intro">
            <div>
              <span className="eyebrow">{content.companyEyebrow}</span>
              <h2>{content.companyTitle}</h2>
            </div>
            <p>{content.companyText}</p>
          </div>
          <div className="services" id="lifecycle">
            {content.products.map(({ number, title, description }) => (
              <article className="service" key={number}>
                <span className="service-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="competency-band" id="tools">
          <div className="section">
            <div className="section-intro light">
              <div><span className="eyebrow">Our capabilities</span><h2>Knowledge, action, and tools that work in the real world.</h2></div>
              <p>Our work connects farm decisions with practical execution, including the manufacture of tools and equipment that support agricultural activities.</p>
            </div>
            <div className="competency-grid">
              {competencies.map(([title, description], index) => <article key={title}><span className="service-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section journey-section">
          <div className="section-intro"><div><span className="eyebrow">Our operating model</span><h2>Every season starts with a plan.</h2></div><p>We follow the crop through its full cycle, so support arrives when it can make the greatest difference.</p></div>
          <div className="journey-grid">
            {journey.map(([number, title, description]) => <article key={number}><div className="journey-number">{number}</div><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </section>

        <section className="audience-band" id="farmers">
          <div className="section audience-grid"><div className="audience-image farmer-image" /><div className="audience-copy"><span className="eyebrow">For farmers</span><h2>Support that stays with the crop.</h2><p>Plan the season with confidence, access dependable tools, and get practical support from plantation through harvest and beyond.</p><a className="text-link" href="#contact">Work with Agriwerk <span aria-hidden="true">-&gt;</span></a></div></div>
        </section>

        <section className="section audience-grid customer-section" id="customers"><div className="audience-copy"><span className="eyebrow">For buyers and partners</span><h2>Quality that carries through.</h2><p>We help businesses source, handle, process, and move agricultural produce with more consistency and less avoidable waste.</p><a className="text-link" href="#contact">Discuss a requirement <span aria-hidden="true">-&gt;</span></a></div><div className="audience-image customer-image" /></section>

        <section className="about-band" id="about">
          <div className="section about-grid">
            <p className="about-quote">“The best agricultural work leaves something stronger behind.”</p>
            <div className="about-copy">
              <span className="eyebrow">About Agriwerk</span>
              <h2>Agriculture is a system, not a single season.</h2>
              <p>Agriwerk LLP brings together pre-plantation planning, crop-cycle support, post-harvest activities, and the manufacture of tools that make farm work more efficient. We build practical relationships across the agricultural ecosystem and measure progress in stronger operations, better quality, and lasting value.</p>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section contact-grid">
            <div className="contact-copy">
              <span className="eyebrow">Contact Agriwerk</span>
              <h2>Let&apos;s grow something worthwhile.</h2>
              <p>Tell us a little about what you are working on. We will get back to you within two business days.</p>
              <div className="contact-details">
                <small>Email</small>
                <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
                <small>Based in</small>
                <span>{content.contactLocation}</span>
              </div>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" required placeholder="Asha Mehta" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <input id="email" name="email" type="email" required placeholder="asha@example.com" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="interest">I am interested in</label>
                <select id="interest" name="interest" defaultValue="">
                  <option value="" disabled>Select a service</option>
                  <option>For farmers</option>
                  <option>For customers</option>
                  <option>Agri partnerships</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">How can we help?</label>
                <textarea id="message" name="message" required placeholder="A few words about your project..." />
              </div>
              <button className="button" type="submit">Send enquiry</button>
              {sent && <p className="success" role="status">Thank you. Your enquiry is ready for us to review.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#top"><span className="logo-mark">A</span> Agriwerk LLP</a>
        <p>Practical agriculture. Shared progress. © 2026 Agriwerk LLP</p>
      </footer>
    </>
  );
}
