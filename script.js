// 🌸 Chime sound (hosted)
const chime = new Audio("https://cdn.pixabay.com/audio/2023/02/15/audio_3e9c7c6d2e.mp3");

// 🎲 Randomised memory word sets
function getRandomWordSet() {
  const wordSets = [
    ["Olive", "Stream", "Sparrow", "Breeze", "Moss"],
    ["Scroll", "Candle", "Cathedral", "Chalice", "Abbey"],
    ["Knight", "Tunic", "Pilgrim", "Prayer", "Herb"],
    ["Papyrus", "Anchor", "Monk", "Stone", "Lily"],
    ["Lantern", "Fountain", "Meadow", "Saint", "Vine"]
  ];
  return wordSets[Math.floor(Math.random() * wordSets.length)];
}

// 📝 Renders memory words and tracks if all are clicked
function renderWordList() {
  const words = getRandomWordSet();
  const list = document.getElementById("wordList");
  const reward = document.getElementById("rewardArea");

  reward.style.display = "none"; // Reset reward
  list.innerHTML = "";
  let hiddenCount = 0;

  words.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    li.style.cursor = "pointer";
    
    li.onclick = () => {
      li.style.display = "none";
      hiddenCount++;
      if (hiddenCount === words.length) {
        reward.style.display = "block";
        chime.play();
      }
    };

    list.appendChild(li);
  });
}

// ✅ Save Daily Plan
function savePlan(){
  const planText = document.getElementById('plan').value;
  localStorage.setItem('dailyPlan', planText);
  document.getElementById('planMessage').innerText = "Great! Your plan is saved.";
}

// ✅ Save Memory Attempt
function saveMemory(){
  const memory = document.getElementById('memoryAttempt').value;
  localStorage.setItem('memoryActivity', memory);
  document.getElementById('memoryMessage').innerText = "Well done! Your memory has been saved.";
}

// ✅ Save Contemplation Check-in (with "Other" options)
function saveContemplation(){
  const physicalSelect = document.getElementById('physicalFeeling').value;
  const emotionalSelect = document.getElementById('emotionalFeeling').value;
  const spiritualSelect = document.getElementById('spiritualFeeling').value;

  const physical = physicalSelect === 'Other' ? document.getElementById('physicalOther').value : physicalSelect;
  const emotional = emotionalSelect === 'Other' ? document.getElementById('emotionalOther').value : emotionalSelect;
  const spiritual = spiritualSelect === 'Other' ? document.getElementById('spiritualOther').value : spiritualSelect;

  const contemplation = { physical, emotional, spiritual };
  localStorage.setItem('dailyContemplation', JSON.stringify(contemplation));
  document.getElementById('contemplationMessage').innerText = "Check-in complete! Well done.";
}

// ✅ Show/hide "Other" text input
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

// ✅ Restore Saved Data on Load
window.onload = function(){
  if(localStorage.getItem('dailyPlan')){
    document.getElementById('plan').value = localStorage.getItem('dailyPlan');
  }

  if(localStorage.getItem('dailyContemplation')){
    const contemplation = JSON.parse(localStorage.getItem('dailyContemplation'));
    ['physical', 'emotional', 'spiritual'].forEach(type => {
      const select = document.getElementById(type + 'Feeling');
      const other = document.getElementById(type + 'Other');
      if (Array.from(select.options).some(o => o.value === contemplation[type])) {
        select.value = contemplation[type];
        other.style.display = 'none';
      } else {
        select.value = 'Other';
        other.style.display = 'block';
        other.value = contemplation[type];
      }
    });
  }

  if(localStorage.getItem('memoryActivity')){
    document.getElementById('memoryAttempt').value = localStorage.getItem('memoryActivity');
  }

  renderWordList(); // load new word set
};
