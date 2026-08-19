(() => {
  const config = window.REDAC_CONFIG || {};
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && typeof value === 'string') el.textContent = value;
  };
  const setLink = (id, label, url) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (label) el.textContent = label;
    if (url) el.href = url;
  };

  setText('brand-name', config.brand || "Redac'IMRAD");
  setText('footer-brand', config.brand || "Redac'IMRAD");
  setText('hero-eyebrow', config.hero?.eyebrow || '');
  setText('hero-title', config.hero?.title || '');
  setText('hero-text', config.hero?.text || '');
  setLink('primary-cta', config.hero?.ctaLabel, config.hero?.ctaUrl);
  setText('offers-intro', config.offersIntro || '');
  setText('final-title', config.finalCta?.title || '');
  setText('final-text', config.finalCta?.text || '');
  setLink('final-cta', config.finalCta?.label, config.finalCta?.url);
  setText('footer-note', config.footerNote || '');

  const features = document.getElementById('features');
  (config.features || []).forEach((feature) => {
    const article = document.createElement('article');
    article.className = 'card';
    const title = document.createElement('h3');
    title.textContent = feature.title || '';
    const text = document.createElement('p');
    text.textContent = feature.text || '';
    article.append(title, text);
    features?.appendChild(article);
  });

  const offers = document.getElementById('offers');
  const offerList = config.offers || [];
  if (!offerList.length && offers) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Les offres seront publiées prochainement.';
    offers.appendChild(empty);
  }

  offerList.forEach((offer) => {
    const article = document.createElement('article');
    article.className = 'offer-card';

    const title = document.createElement('h3');
    title.textContent = offer.name || '';
    article.appendChild(title);

    if (offer.price) {
      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = offer.price;
      article.appendChild(price);
    }

    if (offer.description) {
      const description = document.createElement('p');
      description.textContent = offer.description;
      article.appendChild(description);
    }

    if (Array.isArray(offer.bullets) && offer.bullets.length) {
      const list = document.createElement('ul');
      offer.bullets.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
      article.appendChild(list);
    }

    if (offer.buttonUrl) {
      const link = document.createElement('a');
      link.className = 'button button-primary';
      link.href = offer.buttonUrl;
      link.textContent = offer.buttonLabel || 'Choisir';
      article.appendChild(link);
    }

    offers?.appendChild(article);
  });

  const faq = document.getElementById('faq-list');
  (config.faq || []).forEach((item) => {
    const article = document.createElement('article');
    article.className = 'faq-item';
    const title = document.createElement('h3');
    title.textContent = item.question || '';
    const text = document.createElement('p');
    text.textContent = item.answer || '';
    article.append(title, text);
    faq?.appendChild(article);
  });
})();
