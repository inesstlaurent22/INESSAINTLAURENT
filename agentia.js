document.addEventListener("DOMContentLoaded", () => {

  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotBox = document.getElementById("chatbot-box");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotSend = document.getElementById("chatbot-send");
  const chatbotInput = document.getElementById("chatbot-input");

  if (!chatbotToggle || !chatbotBox || !chatbotMessages) return;

  let hasNavigated = false;

  /* ================= DATA ================= */

  const FAQ = {

    offre: {
      title: "🎯 Offre & positionnement",
      questions: [
        { q: "Que proposes-tu exactement ?", r: "J’aide les entreprises (restaurants, hôtels, marques…) à attirer plus de clients et augmenter leurs ventes grâce à des stratégies marketing et des systèmes automatisés avec l’IA." },
        { q: "À qui s’adressent tes services ?", r: "Aux entreprises qui veulent se développer, gagner du temps et améliorer leur rentabilité." },
        { q: "En quoi ton approche est différente ?", r: "Je combine stratégie, marketing et automatisation pour créer un système performant et continu." },
        { q: "Est-ce adapté à mon activité ?", r: "Oui, chaque stratégie est personnalisée selon ton activité et tes objectifs." }
      ]
    },

    prix: {
      title: "💰 Prix & modalités",
      questions: [
        { q: "Combien coûtent tes services ?", r: "Les tarifs varient selon tes besoins. Chaque projet est personnalisé." },
        { q: "Proposes-tu plusieurs offres ?", r: "Oui, il existe plusieurs formats selon ton besoin : accompagnement, stratégie ou mise en place complète." },
        { q: "Puis-je avoir un devis personnalisé ?", r: "Oui, après un échange rapide je te propose une solution adaptée." },
        { q: "Y a-t-il un engagement ?", r: "Cela dépend de la formule choisie. Certaines sont ponctuelles, d’autres incluent un suivi." }
      ]
    },

    resultats: {
      title: "🚀 Résultats",
      questions: [
        { q: "Combien de temps pour voir des résultats ?", r: "Certains résultats peuvent être visibles rapidement, mais une croissance solide se construit sur plusieurs semaines." },
        { q: "Est-ce que tu garantis des résultats ?", r: "Je garantis une méthode optimisée. Les résultats dépendent aussi de ton activité et de ton implication." },
        { q: "As-tu des exemples de résultats ?", r: "Oui, je peux te partager des cas concrets lors d’un échange." },
        { q: "Comment mesures-tu les performances ?", r: "Grâce à des indicateurs précis : trafic, conversion, ventes, engagement, etc." }
      ]
    },

    ia: {
      title: "🤖 IA & automatisation",
      questions: [
        { q: "Comment fonctionne ton système d’IA ?", r: "Il permet d’automatiser certaines tâches pour gagner du temps et améliorer l’efficacité." },
        { q: "Est-ce compliqué à utiliser ?", r: "Non, tout est simple et accessible même sans compétences techniques." },
        { q: "Est-ce que l’IA remplace mon travail ?", r: "Non, elle t’aide à aller plus vite et à te concentrer sur l’essentiel." },
        { q: "Est-ce personnalisable ?", r: "Oui, chaque système est adapté à ton business." },
        { q: "Est-ce sécurisé ?", r: "Oui, les solutions respectent les standards de sécurité actuels." }
      ]
    },

    mise: {
      title: "🛠️ Mise en place",
      questions: [
        { q: "Comment se passe l’accompagnement ?", r: "On analyse ton activité puis je mets en place une stratégie adaptée." },
        { q: "Est-ce que tu t’occupes de tout ?", r: "Oui, je peux gérer toute la partie technique et stratégique." },
        { q: "Dois-je fournir quelque chose ?", r: "Principalement des infos sur ton activité et tes objectifs." },
        { q: "Combien de temps pour lancer ?", r: "La mise en place est généralement rapide selon le projet." },
        { q: "Y a-t-il un suivi ?", r: "Oui, un suivi est possible selon l’offre choisie." }
      ]
    },

    marketing: {
      title: "📈 Marketing & acquisition",
      questions: [
        { q: "Comment attires-tu des clients ?", r: "Grâce à stratégie digitale, contenu et automatisation." },
        { q: "Est-ce que ça fonctionne avec Instagram ?", r: "Oui, c’est un levier puissant s’il est bien utilisé." },
        { q: "Est-ce adapté aux restaurants et hôtels ?", r: "Oui, ces secteurs sont très adaptés." },
        { q: "Dois-je faire de la publicité ?", r: "Pas obligatoire mais cela accélère les résultats." },
        { q: "Gères-tu les réseaux sociaux ?", r: "Oui selon l’offre choisie." }
      ]
    },

    objections: {
      title: "🧠 Questions fréquentes",
      questions: [
        { q: "Je n’ai pas beaucoup de budget", r: "Il existe des solutions adaptées à différents budgets." },
        { q: "Je n’ai pas le temps", r: "Justement, tout est pensé pour t’en faire gagner." },
        { q: "J’ai déjà essayé et ça n’a pas marché", r: "Le problème vient souvent du manque de stratégie globale." },
        { q: "Est-ce trop technique ?", r: "Non, tout est simplifié et accompagné." },
        { q: "Pourquoi toi plutôt qu’une agence ?", r: "Accompagnement personnalisé et orienté résultats." }
      ]
    },

    contact: {
      title: "📞 Contact",
      questions: [
        { q: "Comment te contacter ?", r: "Via le portfolio, LinkedIn ou email." },
        { q: "Peut-on échanger ?", r: "Oui, je propose un échange pour comprendre ton projet." },
        { q: "Est-ce gratuit ?", r: "Le premier échange permet de voir si je peux t’aider." },
        { q: "Comment commencer ?", r: "Contacte-moi pour discuter de ton projet." }
      ]
    }

  };

  /* ================= OPEN ================= */

  chatbotToggle.addEventListener("click", () => {
    const isOpen = chatbotBox.classList.contains("active");
    chatbotBox.classList.toggle("active");

    if (!isOpen) showThemes();
  });

  /* ================= TOP BUTTON ================= */

  function createTopButton(type = "close") {
    let btn = document.querySelector(".chatbot-back-top");

    if (!btn) {
      btn = document.createElement("div");
      btn.className = "chatbot-back-top";
      chatbotBox.appendChild(btn);
    }

    const newBtn = btn.cloneNode(true);
    btn.replaceWith(newBtn);
    btn = newBtn;

    if (type === "close") {
      btn.textContent = "✕";
      btn.onclick = () => chatbotBox.classList.remove("active");
    } else {
      btn.textContent = "←";
      btn.onclick = () => showThemes();
    }
  }

  /* ================= THEMES ================= */

  function showThemes() {
    chatbotMessages.innerHTML = "";
    createTopButton("close");

    addMessage("Bonjour 👋 Choisis un sujet :", "intro");

    Object.keys(FAQ).forEach(key => {
      chatbotMessages.appendChild(
        createClickable(FAQ[key].title, () => showQuestions(key))
      );
    });
  }

  /* ================= QUESTIONS ================= */

  function showQuestions(category) {
    chatbotMessages.innerHTML = "";
    createTopButton("back");

    addMessage("Voici les questions disponibles :", "section");

    FAQ[category].questions.forEach(item => {
      chatbotMessages.appendChild(
        createClickable("👉 " + item.q, () => showAnswer(item))
      );
    });
  }

  /* ================= ANSWER ================= */

  function showAnswer(item) {
    const div = document.createElement("div");
    div.className = "message-answer";
    div.textContent = item.r;

    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  /* ================= IA ================= */

  /* ================= IA ================= */

async function sendToAI(text) {

  const userDiv = document.createElement("div");
  userDiv.className = "message-user";
  userDiv.textContent = text;
  chatbotMessages.appendChild(userDiv);

  const loading = document.createElement("div");
  loading.className = "message-answer";
  loading.textContent = "...";
  chatbotMessages.appendChild(loading);

  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  try {

    const res = await fetch("https://eorgzwur78kxob1.m.pipedream.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    // 🔥 IMPORTANT : vérifier réponse HTTP
    if (!res.ok) {
      loading.textContent = "Erreur serveur (endpoint)";
      return;
    }

    const data = await res.json();

    console.log("DEBUG IA:", data);

    // 🔥 sécurité
    if (!data || typeof data !== "object") {
      loading.textContent = "Réponse invalide";
      return;
    }

    if (data.error) {
      loading.textContent = "Erreur IA (quota ou clé)";
      return;
    }

    loading.textContent = data.reply || "Aucune réponse";

  } catch (err) {
    console.error("FETCH ERROR:", err);
    loading.textContent = "Erreur connexion serveur";
  }
}

  /* ================= INPUT EVENTS ================= */

  chatbotSend.addEventListener("click", () => {
    const text = chatbotInput.value.trim();
    if (!text) return;

    chatbotInput.value = "";
    sendToAI(text);
  });

  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const text = chatbotInput.value.trim();
      if (!text) return;

      chatbotInput.value = "";
      sendToAI(text);
    }
  });

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
    div.onclick = action;
    return div;
  }

});
