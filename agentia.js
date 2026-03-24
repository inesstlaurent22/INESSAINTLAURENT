document.addEventListener("DOMContentLoaded", () => {

  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotBox = document.getElementById("chatbot-box");
  const chatbotMessages = document.getElementById("chatbot-messages");

  if (!chatbotToggle || !chatbotBox || !chatbotMessages) return;

  let hasNavigated = false;

  /* ================= DATA ================= */

  const FAQ = {

    offre: {
      title: "🎯 Offre & positionnement",
      questions: [
        { q: "Que proposes-tu exactement ?", r: "J’aide les entreprises à attirer plus de clients et augmenter leurs ventes grâce à des stratégies marketing et des systèmes automatisés avec l’IA." },
        { q: "À qui s’adressent tes services ?", r: "Aux entreprises qui veulent se développer, gagner du temps et améliorer leur rentabilité." },
        { q: "En quoi ton approche est différente ?", r: "Je combine stratégie, marketing et automatisation pour créer un système performant et continu." },
        { q: "Est-ce adapté à mon activité ?", r: "Oui, chaque stratégie est personnalisée selon ton activité et tes objectifs." }
      ]
    },

    prix: {
      title: "💰 Prix & modalités",
      questions: [
        { q: "Combien coûtent tes services ?", r: "Les tarifs varient selon les besoins. Chaque projet est personnalisé." },
        { q: "Puis-je avoir un devis ?", r: "Oui, après un échange rapide je te propose une solution adaptée." }
      ]
    },

    resultats: {
      title: "🚀 Résultats",
      questions: [
        { q: "Combien de temps pour voir des résultats ?", r: "Certains résultats sont rapides, mais une croissance solide se construit sur plusieurs semaines." },
        { q: "Garantis-tu des résultats ?", r: "Je garantis une méthode optimisée. Les résultats dépendent aussi de ton activité." }
      ]
    },

    ia: {
      title: "🤖 IA & automatisation",
      questions: [
        { q: "Comment fonctionne l’IA ?", r: "Elle automatise certaines tâches pour gagner du temps et améliorer l’efficacité." },
        { q: "Est-ce compliqué ?", r: "Non, tout est simple et accessible." }
      ]
    },

    contact: {
      title: "📞 Contact",
      questions: [
        { q: "Comment te contacter ?", r: "Via le portfolio, LinkedIn ou email." },
        { q: "Comment commencer ?", r: "Contacte-moi pour échanger sur ton projet." }
      ]
    }

  };

  /* ================= OPEN ================= */

  chatbotToggle.addEventListener("click", () => {
    const isOpen = chatbotBox.classList.contains("active");
    chatbotBox.classList.toggle("active");

    if (!isOpen) showThemes();
  });

  /* ================= BOUTON TOP (X / ←) ================= */

  function createTopButton(type = "close") {

    let btn = document.querySelector(".chatbot-back-top");

    if (!btn) {
      btn = document.createElement("div");
      btn.className = "chatbot-back-top";
      chatbotBox.appendChild(btn);
    }

    // reset events
    const newBtn = btn.cloneNode(true);
    btn.replaceWith(newBtn);
    btn = newBtn;

    if (type === "close") {
      btn.textContent = "✕";

      btn.addEventListener("click", () => {
        chatbotBox.classList.remove("active");
      });

    } else {
      btn.textContent = "←";

      btn.addEventListener("click", () => {
        hasNavigated = false;
        showThemes();
      });
    }
  }

  /* ================= THEMES ================= */

  function showThemes() {
    chatbotMessages.innerHTML = "";
    hasNavigated = false;

    createTopButton("close"); // 🔥 X

    addMessage("Bonjour 👋 Choisis un sujet :", "intro");

    Object.keys(FAQ).forEach(key => {
      const div = createClickable(FAQ[key].title, () => {
        hasNavigated = true;
        showQuestions(key);
      });
      chatbotMessages.appendChild(div);
    });
  }

  /* ================= QUESTIONS ================= */

  function showQuestions(category) {
    chatbotMessages.innerHTML = "";

    createTopButton("back"); // 🔥 ←

    addMessage("Voici les questions disponibles :", "section");

    FAQ[category].questions.forEach(item => {
      const div = createClickable("👉 " + item.q, () => showAnswer(item));
      chatbotMessages.appendChild(div);
    });
  }

  /* ================= ANSWER ================= */

  async function showAnswer(item) {

  // 1. afficher la question (à gauche)
  const userDiv = document.createElement("div");
  userDiv.className = "message-bot";
  userDiv.textContent = item.q;
  chatbotMessages.appendChild(userDiv);

  // 2. loader (optionnel)
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "message-answer";
  loadingDiv.textContent = "...";
  chatbotMessages.appendChild(loadingDiv);

  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  try {
    const response = await fetch("https://eorgzwur78kxob1.m.pipedream.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: item.q + " / Contexte : " + item.r
      })
    });

    const data = await response.json();

    // 3. remplacer loader par vraie réponse
    loadingDiv.textContent = data.reply || "Erreur de réponse IA";

  } catch (error) {
    loadingDiv.textContent = "Erreur de connexion à l'IA";
  }

}

  /* ================= HELPERS ================= */

  function addMessage(text, type) {
    const div = document.createElement("div");

    if (type === "intro") div.className = "message-intro";
    else if (type === "section") div.className = "message-section";
    else div.className = "message-bot";

    div.textContent = text;
    chatbotMessages.appendChild(div);
  }

  function createClickable(text, action) {
    const div = document.createElement("div");
    div.className = "message-bot";
    div.textContent = text;
    div.style.cursor = "pointer";

    div.addEventListener("click", action);

    return div;
  }

});
