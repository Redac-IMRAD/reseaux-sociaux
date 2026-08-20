(() => {
  const site = window.REDAC_CONFIG || {};

  const DEFAULT_REMOTE_CONFIG = {
    title: "Audrey — Redac'IMRAD",
    tagline: "Accompagnement mémoire en kinésithérapie, de la K4 à la soutenance.",
    sections: [
      {
        id: "reservation",
        label: "Réserver",
        order: 10,
        visible: true,
        buttons: [
          {
            id: "point-memoire",
            label: "Réserver mon Point Mémoire (60 min)",
            url: "",
            style: "primary",
            badge: "",
            order: 10,
            visible: true
          }
        ]
      },
      {
        id: "guides",
        label: "Guides gratuits",
        order: 20,
        visible: true,
        buttons: [
          {
            id: "guide-k4",
            label: "Guide — 10 clés & 3 exercices (K4)",
            url: "",
            style: "secondary",
            badge: "",
            order: 10,
            visible: true
          },
          {
            id: "guide-k5",
            label: "Guide — Statistiques & soutenance (K5)",
            url: "",
            style: "secondary",
            badge: "",
            order: 20,
            visible: true
          }
        ]
      },
      {
        id: "campagne",
        label: "Campagne en cours",
        order: 30,
        visible: true,
        buttons: [
          {
            id: "questionnaire-k4-k5",
            label: "Questionnaire — Appel à témoins K4 & K5",
            url: "https://forms.gle/EUYME1qzySRP5L7Y8",
            style: "primary",
            badge: "temporaire",
            order: 10,
            visible: true
          }
        ]
      }
    ],
    instagram: {
      visible: true,
      handle: "@audrey_redac_imrad",
      url: "https://www.instagram.com/audrey_redac_imrad"
    }
  };

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && typeof value === "string") el.textContent = value;
  };

  const safeUrl = (url) => {
    if (!url) return "#";
    try {
      const parsed = new URL(url, window.location.href);
      return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : "#";
    } catch (_) {
      return "#";
    }
  };

  const renderStaticDesign = () => {
    setText("brand-name", site.brand || "Redac'IMRAD");
    setText("footer-brand", site.brand || "Redac'IMRAD");
    setText("hero-eyebrow", site.hero?.eyebrow || "");
    setText("hero-title", site.hero?.title || "");
    setText("hero-text", site.hero?.text || "");
    setText("final-title", site.finalCta?.title || "");
    setText("final-text", site.finalCta?.text || "");

    const finalCta = document.getElementById("final-cta");
    if (finalCta) {
      finalCta.textContent = site.finalCta?.label || "Découvrir les ressources";
      finalCta.href = site.finalCta?.url || "#ressources";
    }

    const features = document.getElementById("features");
    if (features) {
      features.innerHTML = "";
      (site.features || []).forEach((feature) => {
        const article = document.createElement("article");
        article.className = "card";
        const title = document.createElement("h3");
        title.textContent = feature.title || "";
        const text = document.createElement("p");
        text.textContent = feature.text || "";
        article.append(title, text);
        features.appendChild(article);
      });
    }

    const faq = document.getElementById("faq-list");
    if (faq) {
      faq.innerHTML = "";
      (site.faq || []).forEach((item) => {
        const article = document.createElement("article");
        article.className = "faq-item";
        const title = document.createElement("h3");
        title.textContent = item.question || "";
        const text = document.createElement("p");
        text.textContent = item.answer || "";
        article.append(title, text);
        faq.appendChild(article);
      });
    }
  };

  const renderRemoteConfig = (remoteConfig) => {
    const cfg = remoteConfig && typeof remoteConfig === "object" ? remoteConfig : DEFAULT_REMOTE_CONFIG;

    setText("remote-title", cfg.title || "Ressources et accompagnements");
    setText("remote-tagline", cfg.tagline || "");

    const content = document.getElementById("dynamic-content");
    if (content) {
      content.innerHTML = "";
      const sections = Array.isArray(cfg.sections) ? [...cfg.sections] : [];
      let visibleButtonCount = 0;

      sections
        .filter((section) => section.visible !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .forEach((section) => {
          const buttons = Array.isArray(section.buttons)
            ? [...section.buttons]
                .filter((button) => button.visible !== false)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
            : [];

          if (!buttons.length) return;
          visibleButtonCount += buttons.length;

          const group = document.createElement("section");
          group.className = "dynamic-group";

          const heading = document.createElement("h3");
          heading.className = "dynamic-group-title";
          heading.textContent = section.label || "Ressources";
          group.appendChild(heading);

          const grid = document.createElement("div");
          grid.className = "dynamic-links-grid";

          buttons.forEach((button) => {
            const link = document.createElement("a");
            link.className = "resource-link" + (button.style === "secondary" ? " secondary" : "");
            link.href = safeUrl(button.url);
            link.target = "_blank";
            link.rel = "noopener";

            if (!button.url) {
              link.setAttribute("aria-disabled", "true");
              link.addEventListener("click", (event) => event.preventDefault());
            }

            const label = document.createElement("span");
            label.className = "resource-label";
            label.textContent = button.label || "Lien";
            link.appendChild(label);

            if (button.badge) {
              const badge = document.createElement("span");
              badge.className = "badge";
              badge.textContent = button.badge;
              link.appendChild(badge);
            }

            grid.appendChild(link);
          });

          group.appendChild(grid);
          content.appendChild(group);
        });

      if (!visibleButtonCount) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = "Les ressources seront publiées prochainement.";
        content.appendChild(empty);
      }
    }

    const footer = document.getElementById("dynamic-footer");
    if (footer) {
      footer.innerHTML = "";
      if (cfg.instagram && cfg.instagram.visible !== false) {
        footer.appendChild(document.createTextNode("Instagram "));
        const link = document.createElement("a");
        link.href = safeUrl(cfg.instagram.url);
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = cfg.instagram.handle || "Instagram";
        footer.appendChild(link);
      }
    }
  };

  window.redacImradApplyConfig = (config) => renderRemoteConfig(config);

  const loadRemoteConfig = () => {
    const endpoint = site.configEndpoint;
    if (!endpoint) {
      renderRemoteConfig(DEFAULT_REMOTE_CONFIG);
      return;
    }

    const script = document.createElement("script");
    script.src = endpoint + (endpoint.includes("?") ? "&" : "?") + "mode=config&callback=redacImradApplyConfig&t=" + Date.now();
    script.async = true;
    script.onerror = () => renderRemoteConfig(DEFAULT_REMOTE_CONFIG);
    document.head.appendChild(script);
  };

  renderStaticDesign();
  loadRemoteConfig();
})();
