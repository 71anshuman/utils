import React from 'react';
import { useLocation } from 'react-router-dom';
import TOOL_CONTENT from '../../constants/toolContent';

/**
 * Static "About / How to use / FAQ" block rendered under every tool.
 * Content lives in src/constants/toolContent.js and is pre-rendered at
 * build time, so crawlers see real text on each route.
 */
export default function ToolInfo() {
  const { pathname } = useLocation();
  const key = pathname.replace(/^\/+|\/+$/g, '');
  const content = TOOL_CONTENT[key];
  if (!content) return null;

  return (
    <section className="tool-info container-fluid py-2" aria-labelledby="tool-info-about">
      <div className="card p-4 mt-4">
        <h2 id="tool-info-about" className="h5 font-weight-bold mb-3">About the {content.name}</h2>
        <p className="text-secondary mb-4">{content.about}</p>

        <h2 className="h5 font-weight-bold mb-3">How to use the {content.name}</h2>
        <ol className="text-secondary mb-4 pl-4">
          {content.steps.map((step, i) => (
            <li key={i} className="mb-1">{step}</li>
          ))}
        </ol>

        <h2 className="h5 font-weight-bold mb-3">Frequently asked questions</h2>
        {content.faqs.map((faq, i) => (
          <div key={i} className="mb-3">
            <h3 className="h6 font-weight-bold mb-1">{faq.q}</h3>
            <p className="text-secondary mb-0">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
