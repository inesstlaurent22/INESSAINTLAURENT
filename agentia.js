document.addEventListener("DOMContentLoaded", () => {

  /* ================= CHATBOT ================= */

  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotBox = document.getElementById("chatbot-box");
  const chatbotSend = document.getElementById("chatbot-send");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");

  // sécurité si éléments absents
  if (!chatbotToggle || !chatbotBox) return;

  /* ===== OUVERTURE / FERMETURE ===== */
  chatbotToggle.addEventListener("click", () => {
    chatbotBox.style.display =
      chatbotBox.style.display === "flex" ? "none" : "flex";
  });

  /* ===== ENVOI MESSAGE ===== */
  chatbotSend?.addEventListener("click", sendMessage);

  chatbotInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = chatbotInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatbotInput.value = "";

    fakeAIResponse(text);
  }

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = type === "user" ? "message-user" : "message-bot";
    div.textContent = text;

    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  /* ================= IA SIMPLIFIÉE ================= */
  function fakeAIResponse(text) {
    let response = "Je n’ai pas compris ta question.";

    const t = text.toLowerCase();

    if (t.includes("offre")) {
      response = "Je propose un accompagnement stratégique en 3 étapes : diagnostic, stratégie et pilotage.";
    }

    else if (t.includes("prix") || t.includes("tarif")) {
      response = "Les tarifs dépendent du projet. Contacte-moi via LinkedIn ou email.";
    }

    else if (t.includes("contact")) {
      response = "Tu peux me contacter via LinkedIn ou email directement sur le portfolio.";
    }

    else if (t.includes("formation")) {
      response = "Une formation en création d’entreprise sera bientôt disponible.";
    }

    setTimeout(() => {
      addMessage(response, "bot");
    }, 500);
  }

});
