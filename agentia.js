document.addEventListener("DOMContentLoaded", () => {

  /* ================= CHATBOT ================= */

  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotBox = document.getElementById("chatbot-box");
  const chatbotMessages = document.getElementById("chatbot-messages");

  // sécurité
  if (!chatbotToggle || !chatbotBox || !chatbotMessages) {
    console.error("Chatbot éléments introuvables");
    return;
  }

  console.log("Chatbot chargé");

  /* ================= DATA ================= */

  const FAQ = {

    offre: {
      title: "🎯 Offre & positionnement",
      questions: [
        {
          q: "Que proposes-tu exactement ?",
          r: "J’aide les entreprises à attirer plus de clients et augmenter leurs ventes grâce à des stratégies marketing et des systèmes automatisés avec l’IA."
        },
        {
          q: "À qui s’adressent tes services ?",
          r: "Aux entreprises qui veulent se développer, gagner du temps et améliorer leur rentabilité."
        },
        {
          q: "En quoi ton approche est différente ?",
          r: "Je combine stratégie, marketing et automatisation pour créer un système performant et continu."
        },
        {
          q: "Est-ce adapté à mon activité ?",
          r: "Oui, chaque stratégie est personnalisée selon ton activité et tes objectifs."
        }
      ]
    },

    prix: {
      title: "💰 Prix & modalités",
      questions: [
        {
          q: "Combien coûtent tes services ?",
          r: "Les tarifs varient selon les besoins. Chaque projet est personnalisé."
        },
        {
          q: "Puis-je avoir un devis ?",
          r: "Oui, après un échange rapide je te propose une solution adaptée."
        }
      ]
    },

    resultats: {
      title: "🚀 Résultats",
      questions: [
        {
          q: "Combien de temps pour voir des résultats ?",
          r: "Certains résultats sont rapides, mais une croissance solide se construit sur plusieurs semaines."
        },
        {
          q: "Garantis-tu des résultats ?",
          r: "Je garantis une méthode optimisée. Les résultats dépendent aussi de ton activité."
        }
      ]
    },

    ia: {
      title: "🤖 IA & automatisation",
      questions: [
        {
          q: "Comment fonctionne l’IA ?",
          r: "Elle automatise certaines tâches pour gagner du temps et améliorer l’efficacité."
        },
        {
          q: "Est-ce compliqué ?",
          r: "Non, tout est simple et accessible."
        }
      ]
    },

    contact: {
      title: "📞 Contact",
      questions: [
        {
          q: "Comment te contacter ?",
          r: "Via le portfolio, LinkedIn ou email."
        },
        {
          q: "Comment commencer ?",
          r: "Contacte-moi pour échanger sur ton projet."
        }
      ]
    }

  };

  /* ================= OUVERTURE / FERMETURE ================= */

  chatbotToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    console.log("CLICK OK");

    const isOpen = chatbotBox.classList.contains("active");

    chatbotBox.classList.toggle("active");

    if (!isOpen) {
      showThemes();
    }
  });

  /* ================= FERMETURE SI CLIC EXTÉRIEUR ================= */

  document.addEventListener("click", (e) => {
    if (!chatbotBox.contains(e.target) && !chatbotToggle.contains(e.target)) {
      chatbotBox.classList.remove("active");
    }
  });

  /* ================= THEMES ================= */

  function showThemes() {
    chatbotMessages.innerHTML = "";

    Object.keys(FAQ).forEach(key => {
      const div = document.createElement("div");
      div.className = "message-bot";
      div.style.cursor = "pointer";
      div.style.fontWeight = "700";
      div.textContent = FAQ[key].title;

      div.addEventListener("click", () => showQuestions(key));

      chatbotMessages.appendChild(div);
    });
  }

  /* ================= QUESTIONS ================= */

  function showQuestions(category) {
    chatbotMessages.innerHTML = "";

    FAQ[category].questions.forEach(item => {
      const div = document.createElement("div");
      div.className = "message-bot";
      div.style.cursor = "pointer";
      div.textContent = "👉 " + item.q;

      div.addEventListener("click", () => showAnswer(item.r));

      chatbotMessages.appendChild(div);
    });
  }

  /* ================= REPONSE ================= */

  function showAnswer(answer) {
    const div = document.createElement("div");
    div.className = "message-bot";
    div.textContent = answer;

    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

});
