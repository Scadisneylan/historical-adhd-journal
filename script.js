// 🌸 Chime sound (hosted)
const chime = new Audio("https://cdn.pixabay.com/audio/2023/02/15/audio_3e9c7c6d2e.mp3");

// Memory word state
let currentWords = [];

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
  currentWords = getRandomWordSet();
  const list = document.getElementById("wordList");
  const reward = document.getElementById("rewardArea");
  const revealButton = document.getElementById("revealWordsBtn");

  reward.style.display = "none";
  revealButton.style.display = "none";
  list.innerHTML = "";

  let hiddenCount = 0;

  currentWords.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    li.style.cursor = "pointer";

    li.onclick = () => {
      li.style.display = "none";
      hiddenCount++;
      if (hiddenCount === currentWords.length) {
        reward.style.display = "block";
        chime.play();
      }
    };

    list.appendChild(li);
  });
}

// 📅 Get today's date key
function getTodayKey() {
  const today = new Date().toISOString().split("T")[0];
  return `entry-${today}`;
}

// 💾 Save all entries together
function saveAllTodayEntries() {
  const plan = document.getElementById('plan').value;
  const memory = document.getElementById('memoryAttempt').value;

  const physicalSelect = document.getElementById('physicalFeeling').value;
  const emotionalSelect = document.getElementById('emotionalFeeling').value;
  const spiritualSelect = document.getElementById('spiritualFeeling').value;

  const physical = physicalSelect === 'Other' ? document.getElementById('physicalOther').value : physicalSelect;
  const emotional = emotionalSelect === 'Other' ? document.getElementById('emotionalOther').value : emotionalSelect;
  const spiritual = spiritualSelect === 'Other' ? document.getElementById('spiritualOther').value : spiritualSelect;

  const entry = {
    plan,
    memory,
    contemplation: { physical, emotional, spiritual }
  };

  localStorage.setItem(getTodayKey(), JSON.stringify(entry));
  document.getElementById('planMessage').innerText = "Plan saved!";
  document.getElementById('memoryMessage').innerText = "Memory saved!";
  document.getElementById('contemplationMessage').innerText = "Contemplation saved!";
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

// 📂 Review past entries
function showSavedEntryHistory() {
  const entryLog = document.getElementById('entryLog');
  entryLog.innerHTML = "";

  const keys = Object.keys(localStorage).filter(k => k.startsWith('entry-')).sort().reverse();

  if (keys.length === 0) {
    entryLog.innerHTML = "<p>No past entries yet.</p>";
    return;
  }

  keys.forEach(key => {
    const date = key.replace('entry-', '');
    const data = JSON.parse(localStorage.getItem(key));

    const section = document.createElement("div");
    section.style.marginBottom = "20px";

    section.innerHTML = `
      <h3>${date}</h3>
      <p><strong>Plan:</strong> ${data.plan || "(none)"}</p>
      <p><strong>Memory:</strong> ${data.memory || "(none)"}</p>
      <p><strong>Contemplation:</strong><br>
         <em>Physical:</em> ${data.contemplation?.physical || "N/A"}<br>
         <em>Emotional:</em> ${data.contemplation?.emotional || "N/A"}<br>
         <em>Spiritual:</em> ${data.contemplation?.spiritual || "N/A"}
      </p>
      <hr>
    `;
    entryLog.appendChild(section);
  });
}

// ✅ Show original words and match against attempt
function revealWords() {
  const revealButton = document.getElementById("revealWordsBtn");
  const list = document.getElementById("wordList");
  const attempt = document.getElementById("memoryAttempt").value.toLowerCase();
  const attemptWords = attempt.split(/[\s,.\n]+/).map(w => w.trim());

  list.innerHTML = "";
  currentWords.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    li.style.backgroundColor = attemptWords.includes(word.toLowerCase()) ? "#aed581" : "#ffcdd2";
    list.appendChild(li);
  });

  revealButton.style.display = "none";
}

// ✅ Restore Today's Entry on Load
window.onload = function(){
  const saved = localStorage.getItem(getTodayKey());

  if (saved) {
    const entry = JSON.parse(saved);
    document.getElementById('plan').value = entry.plan || '';
    document.getElementById('memoryAttempt').value = entry.memory || '';

    const contemplation = entry.contemplation || {};
    ['physical', 'emotional', 'spiritual'].forEach(type => {
      const select = document.getElementById(type + 'Feeling');
      const other = document.getElementById(type + 'Other');
      if (Array.from(select.options).some(o => o.value === contemplation[type])) {
        select.value = contemplation[type];
        other.style.display = 'none';
      } else {
        select.value = 'Other';
        other.style.display = 'block';
        other.value = contemplation[type] || '';
      }
    });
  }

  renderWordList();
};
