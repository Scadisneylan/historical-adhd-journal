function showTrivia(){
  const facts = [
    "Julius Caesar famously divided tasks clearly to avoid overwhelm. Try the same today!",
    "Benjamin Franklin structured his day meticulously—morning, noon, and night routines!",
    "Churchill used short naps and structured breaks to stay alert. Have you taken a break today?"
  ];

  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  document.getElementById('trivia').innerText = randomFact;
}
// Toggle 'Other' text fields visibility
function toggleOther(type) {
  const select = document.getElementById(type + 'Feeling');
  const otherInput = document.getElementById(type + 'Other');
  
  if (select.value === 'Other') {
    otherInput.style.display = 'block';
  } else {
    otherInput.style.display = 'none';
    otherInput.value = '';
  }
}

// Updated Save contemplation check-in
function saveContemplation(){
  const physicalSelect = document.getElementById('physicalFeeling').value;
  const emotionalSelect = document.getElementById('emotionalFeeling').value;
  const spiritualSelect = document.getElementById('spiritualFeeling').value;

  const physical = physicalSelect === 'Other' 
    ? document.getElementById('physicalOther').value 
    : physicalSelect;

  const emotional = emotionalSelect === 'Other' 
    ? document.getElementById('emotionalOther').value 
    : emotionalSelect;

  const spiritual = spiritualSelect === 'Other' 
    ? document.getElementById('spiritualOther').value 
    : spiritualSelect;

  const contemplation = {physical, emotional, spiritual};
  localStorage.setItem('dailyContemplation', JSON.stringify(contemplation));

  document.getElementById('contemplationMessage').innerText = "Check-in complete! Well done.";
}

// Load saved data with 'Other' fields considered
window.onload = function(){
  if(localStorage.getItem('dailyPlan')){
    document.getElementById('plan').value = localStorage.getItem('dailyPlan');
  }
  if(localStorage.getItem('dailyContemplation')){
    const contemplation = JSON.parse(localStorage.getItem('dailyContemplation'));

    const types = ['physical', 'emotional', 'spiritual'];
    types.forEach(type => {
      const selectEl = document.getElementById(type + 'Feeling');
      const otherEl = document.getElementById(type + 'Other');
      
      if (Array.from(selectEl.options).some(option => option.value === contemplation[type])) {
        selectEl.value = contemplation[type];
        otherEl.style.display = 'none';
      } else {
        selectEl.value = 'Other';
        otherEl.style.display = 'block';
        otherEl.value = contemplation[type];
      }
    });
  }
}
