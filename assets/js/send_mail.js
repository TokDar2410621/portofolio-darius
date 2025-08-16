(() => {
  const FORM_ID = "mwpqazen";                 // <= remplace par le tien
  const ENDPOINT = `https://formspree.io/f/${FORM_ID}`;

  const form   = document.getElementById("contactForm");
  const status = document.getElementById("status");
  const btn    = document.getElementById("sendBtn");

  const successModal = document.getElementById("successModal");
  const errorModal   = document.getElementById("errorModal");
  const errorText    = document.getElementById("errorText");
  const closeModal   = document.getElementById("closeModal");
  const closeError   = document.getElementById("closeError");

  if (!form) return;

  const setStatus = (msg) => status && (status.textContent = msg || "");

  closeModal?.addEventListener("click", () => successModal.close());
  closeError?.addEventListener("click", () => errorModal.close());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // honeypot anti-spam
    if (form.elements._gotcha?.value.trim()) return;

    const data = {
      name:    form.elements.name?.value.trim(),
      email:   form.elements.email?.value.trim(),
      message: form.elements.message?.value.trim(),
      _subject: "Nouveau message — Portfolio Tokam Darius",
      _source:  "portfolio-contact"
    };

    // validation minimale
    if (!data.name || !data.email || !data.message) {
      setStatus("Veuillez remplir tous les champs.");
      return;
    }

    btn.disabled = true;
    btn.textContent = "Envoi…";
    setStatus("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      // Debug utile pendant tes tests
      console.log("Formspree status:", res.status);
      let payload = null;
      try { payload = await res.json(); } catch {}

      if (res.ok) {
        form.reset();
        setStatus("Message envoyé. Merci !");
        successModal?.showModal();
      } else {
        const msg = payload?.errors?.[0]?.message || "Échec de l’envoi. Réessayez.";
        setStatus(msg);
        if (errorText) errorText.textContent = msg;
        errorModal?.showModal();
      }

    } catch (err) {
      console.error(err);
      setStatus("Erreur réseau. Désactive éventuellement Brave Shields / adblock et réessayez.");
      if (errorText) errorText.textContent = "Erreur réseau. Vérifiez votre connexion ou désactivez le bloqueur.";
      errorModal?.showModal();
    } finally {
      btn.disabled = false;
      btn.textContent = "Envoyer";
    }
  });
})();
