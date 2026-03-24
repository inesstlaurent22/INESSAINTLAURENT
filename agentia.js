document.addEventListener("DOMContentLoaded", () => {

  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotBox = document.getElementById("chatbot-box");
  const chatbotMessages = document.getElementById("chatbot-messages");

  if (!chatbotToggle || !chatbotBox || !chatbotMessages) return;

  /* ================= DATA ================= */

  const FAQ = {
    offre: {
      title: "🎯 Offre",
      questions: [
        {
          q: "Que proposes-tu ?",
          r: "J’aide les entreprises à développer leur chiffre d’affaires grâce au marketing et à l’IA."
        }
      ]
    },
    prix: {
      title: "💰 Prix",
      questions: [
        {
          q: "Combien ça coûte ?",
          r: "Les tarifs dépendent du projet. Contacte-moi pour une proposition adaptée."
        }
      ]
    },
    contact: {
      title: "📞 Contact",
      questions: [
        {
          q: "Comment te contacter ?",
          r: "Via LinkedIn ou email directement sur le portfolio."
        }
      ]
    }
  };

  /* ================= OUVERTURE ================= */

  chatbotToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = chatbotBox.classList.contains("active");

    chatbotBox.classList.toggle("active");

    if (!isOpen) showThemes();
  });

  /* fermeture extérieure */
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
      div.textContent = "👉 " + item.q;

      div.addEventListener("click", () => showAnswer(item.r));

      chatbotMessages.appendChild(div);
    });
  }

  /* ================= REPONSES ================= */

  function showAnswer(answer) {
    const div = document.createElement("div");
    div.className = "message-bot";
    div.textContent = answer;

    chatbotMessages.appendChild(div);
  }

});
