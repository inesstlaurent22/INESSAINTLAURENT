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

  /* ================= HELPERS ================= */

  function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "message-bot";
    div.textContent = text;

    chatbotMessages.appendChild(div);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "message-user";
    div.textContent = text;

    chatbotMessages.appendChild(div);
    scrollToBottom();
  }

  /* ================= THEMES ================= */

  function showThemes() {
    chatbotMessages.innerHTML = "";

    addBotMessage("Bonjour 👋 Choisis un sujet :");

    Object.keys(FAQ).forEach(key => {
      const div = document.createElement("div");
      div.className = "message-bot";
      div.textContent = FAQ[key].title;

      div.addEventListener("click", () => {
        addUserMessage(FAQ[key].title);
        showQuestions(key);
      });

      chatbotMessages.appendChild(div);
    });

    scrollToBottom();
  }

  /* ================= QUESTIONS ================= */

  function showQuestions(category) {

    addBotMessage("Voici les questions disponibles :");

    FAQ[category].questions.forEach(item => {
      const div = document.createElement("div");
      div.className = "message-bot";
      div.textContent = "👉 " + item.q;

      div.addEventListener("click", () => {
        showAnswer(item.q, item.r);
      });

      chatbotMessages.appendChild(div);
    });

    scrollToBottom();
  }

  /* ================= REPONSES ================= */

  function showAnswer(question, answer) {

    // message utilisateur
    addUserMessage(question);

    // simulation délai réponse
    setTimeout(() => {
      addBotMessage(answer);
    }, 400);
  }

});
