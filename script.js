function showTrivia(){
  const facts = [
    "Julius Caesar famously divided tasks clearly to avoid overwhelm. Try the same today!",
    "Benjamin Franklin structured his day meticulously—morning, noon, and night routines!",
    "Churchill used short naps and structured breaks to stay alert. Have you taken a break today?"
  ];

  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  document.getElementById('trivia').innerText = randomFact;
}