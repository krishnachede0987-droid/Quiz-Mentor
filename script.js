/* =====================================================
   DATA & TOPICS
====================================================== */
const topics = [
  {icon:"🏗️",title:"HTML Fundamentals",desc:"Elements, semantics, forms, attributes and document structure.",level:"Beginner",time:"5 min",questions:[
   ["Which element is used for the largest heading?","<h1>","<heading>","<h6>","<head>"],["Which attribute provides alternative text for an image?","alt","src","title","href"],["Which element represents navigation links?","<nav>","<navigate>","<links>","<menu-nav>"],["Which input type is used for email addresses?","email","mail","text-email","address"]]},
  {icon:"🎨",title:"CSS Essentials",desc:"Selectors, box model, cascade, positioning and responsive styling.",level:"Beginner",time:"6 min",questions:[
   ["Which property changes text color?","color","font-color","text-color","foreground"],["What does display:flex enable?","Flexbox layout","Grid only","Animations","Media queries"],["Which unit is relative to the root font size?","rem","px","vh","pt"],["Which property controls spacing inside an element?","padding","margin","gap-only","space"]]},
  {icon:"📐",title:"Flexbox & Grid",desc:"Modern layouts, alignment, tracks, gaps and responsive interfaces.",level:"Intermediate",time:"7 min",questions:[
   ["Which property controls the main axis in flexbox?","flex-direction","flex-axis","main-direction","align-axis"],["CSS Grid columns are commonly defined with which property?","grid-template-columns","grid-columns","columns-grid","template-columns"],["What does justify-content control in a flex row?","Main-axis alignment","Cross-axis alignment","Font size","Element height"],["Which creates a gap between grid/flex items?","gap","spacing","item-gap","gutter-only"]]},
  {icon:"⚡",title:"JavaScript Core",desc:"Variables, functions, arrays, objects, scope and modern syntax.",level:"Intermediate",time:"8 min",questions:[
   ["Which keyword creates a block-scoped variable that can be reassigned?","let","varlet","const","define"],["What does === compare?","Value and type","Only value","Only type","References only"],["Which method adds an item to the end of an array?","push()","append()","add()","insertEnd()"],["What is an arrow function syntax?","() => {}","function => {}","-> function()","func() ->"]]},
  {icon:"⚛️",title:"React Basics",desc:"Components, props, state, hooks and rendering concepts.",level:"Intermediate",time:"8 min",questions:[
   ["What is a React component?","A reusable UI building block","A database","A CSS selector","A browser"],["Which hook manages local state?","useState","useLocal","useValue","stateHook"],["Props are primarily used to...","Pass data to components","Change CSS globally","Create databases","Start servers"],["React lists commonly require which prop?","key","idOnly","listKeyOnly","indexOnly"]]},
  {icon:"🌐",title:"Web APIs",desc:"HTTP, REST, JSON, fetch, status codes and browser APIs.",level:"Intermediate",time:"7 min",questions:[
   ["Which method is commonly used to retrieve data?","GET","PULL","FETCH","READ"],["What does HTTP status 404 mean?","Not Found","Unauthorized","Server Error","Created"],["JSON stands for...","JavaScript Object Notation","Java Source Object Network","JavaScript Online Nodes","Joined Script Object Names"],["Which API is commonly used for HTTP requests in modern browsers?","fetch()","requestWeb()","httpCall()","browserGet()"]]},
  {icon:"♿",title:"Accessibility",desc:"Semantic HTML, ARIA, keyboard navigation and inclusive UX.",level:"Beginner",time:"5 min",questions:[
   ["What is the purpose of alt text?","Describe meaningful images","Decorate images","Load images faster","Resize images"],["A semantic button should generally be represented by...","<button>","<div role=none>","<click>","<action>"],["Keyboard users commonly navigate interactive elements with...","Tab","Shift only","Space only","Arrow only"],["ARIA stands for...","Accessible Rich Internet Applications","Advanced Responsive Internet Attributes","Accessible React Interface API","Application Rich Interface Access"]]},
  {icon:"🔧",title:"Git & Dev Tools",desc:"Version control, branches, commits, debugging and developer workflow.",level:"Beginner",time:"6 min",questions:[
   ["Which command creates a Git repository?","git init","git start","git create","git repo"],["Which command records staged changes?","git commit","git save","git push","git record"],["Which command downloads remote changes?","git pull","git download","git sync-only","git fetchall"],["Browser DevTools can be used to...","Inspect and debug webpages","Only edit databases","Host websites","Compile Python"]]}
];

/* =====================================================
   DOM ELEMENTS & INITIAL SETUP
====================================================== */
const authPage = document.getElementById("authPage");
const onboardingPage = document.getElementById("onboardingPage");
const app = document.getElementById("app");

let currentEmail = "Guest";
let currentUserName = "Developer";

/* =====================================================
   PASSWORD TOGGLE & SOCIAL UTILS
====================================================== */
function togglePassword(inputId, button) {
  const input = document.getElementById(inputId);
  const icon = button.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
    button.setAttribute("aria-label", "Hide password");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
    button.setAttribute("aria-label", "Show password");
  }
}

document.querySelectorAll(".password-toggle").forEach(function(button) {
  button.addEventListener("click", function() {
    togglePassword(this.dataset.target, this);
  });
});

document.querySelector(".forgot")?.addEventListener("click", function(e) {
  e.preventDefault();
  alert("Password reset link will be sent to your email.");
});

document.querySelectorAll(".social-btn").forEach(function(button) {
  button.addEventListener("click", function() {
    const provider = this.dataset.provider || "Social";
    alert(provider + " authentication successful!");
    startOnboarding("user@gmail.com", "User");
  });
});

/* =====================================================
   AUTHENTICATION FORM HANDLERS
====================================================== */
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  startOnboarding(email, email.split("@")[0]);
});

document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("registerEmail").value;
  startOnboarding(email, name);
});

function startOnboarding(email, name) {
  currentEmail = email;
  currentUserName = name;
  document.getElementById("avatar").textContent = name.charAt(0).toUpperCase();

  authPage.classList.add("hidden");
  onboardingPage.classList.remove("hidden");
  goProfileStep(1);
}

/* =====================================================
   ONBOARDING STEPPER
====================================================== */
let profileStep = 1;
function goProfileStep(step) {
  profileStep = step;
  document.querySelectorAll(".profile-step").forEach(s => s.classList.toggle("active", +s.dataset.step === step));
  document.getElementById("profileStepLabel").textContent = `STEP ${step} OF 3`;
  document.getElementById("profileProgress").style.width = `${(step / 3) * 100}%`;
  document.getElementById("profileBack").style.visibility = step === 1 ? "hidden" : "visible";
  document.getElementById("profileNext").textContent = step === 3 ? "Build my dashboard →" : "Continue →";
  if (step === 3) updateProfileSummary();
}

function updateProfileSummary() {
  const interests = [...document.querySelectorAll('input[name="interest"]:checked')].map(x => x.parentElement.querySelector(".choice-title").textContent.trim());
  const level = document.querySelector('input[name="class"]:checked')?.parentElement.querySelector(".choice-title").textContent.trim();
  const types = [...document.querySelectorAll('input[name="qtype"]:checked')].map(x => x.parentElement.querySelector(".choice-title").textContent.trim());
  document.getElementById("profileSummary").innerHTML =
    `<b>Almost ready, ${currentUserName}!</b> ${interests.length ? `You chose ${interests.length} interest${interests.length > 1 ? "s" : ""}.` : " You can still continue without selecting an interest."}
     ${level ? ` Study level: ${level}.` : ""} ${types.length ? ` Question styles: ${types.join(", ")}.` : ""}`;
}

function finishProfile() {
  const profile = {
    name: currentUserName,
    email: currentEmail,
    interests: [...document.querySelectorAll('input[name="interest"]:checked')].map(x => x.value),
    classLevel: document.querySelector('input[name="class"]:checked')?.value || "other",
    questionTypes: [...document.querySelectorAll('input[name="qtype"]:checked')].map(x => x.value)
  };
  localStorage.setItem("quizMentorProfile", JSON.stringify(profile));
  onboardingPage.classList.add("hidden");
  app.classList.remove("hidden");
  applyPersonalization(profile);
}

document.getElementById("profileNext").addEventListener("click", () => {
  if (profileStep < 3) goProfileStep(profileStep + 1);
  else finishProfile();
});

document.getElementById("profileBack").addEventListener("click", () => {
  if (profileStep > 1) goProfileStep(profileStep - 1);
});

function applyPersonalization(profile) {
  const map = {
    web: ["HTML Fundamentals", "CSS Essentials", "Accessibility"],
    frontend: ["CSS Essentials", "Flexbox & Grid", "Accessibility"],
    javascript: ["JavaScript Core"],
    react: ["React Basics"],
    apis: ["Web APIs"],
    tools: ["Git & Dev Tools"]
  };
  const wanted = [...new Set(profile.interests.flatMap(x => map[x] || []))];
  const badge = document.getElementById("personalBadge");
  badge.style.display = "block";
  badge.textContent = wanted.length ? `✨ Personalized for ${profile.classLevel === "college" ? "college-level" : profile.classLevel === "other" ? "self-learning" : `Class ${profile.classLevel}`} • ${wanted.length} recommended topics` : "✨ Your personalized learning dashboard";
  if (wanted.length) {
    const sorted = [...topics].sort((a, b) => (wanted.includes(b.title) ? 1 : 0) - (wanted.includes(a.title) ? 1 : 0));
    render("", sorted);
  } else render();
}

document.getElementById("editProfile").addEventListener("click", () => {
  const p = JSON.parse(localStorage.getItem("quizMentorProfile") || "null");
  if (p) {
    document.querySelectorAll('input[name="interest"]').forEach(x => x.checked = p.interests.includes(x.value));
    document.querySelectorAll('input[name="qtype"]').forEach(x => x.checked = p.questionTypes.includes(x.value));
    const cls = document.querySelector(`input[name="class"][value="${p.classLevel}"]`);
    if (cls) cls.checked = true;
  }
  app.classList.add("hidden");
  onboardingPage.classList.remove("hidden");
  goProfileStep(1);
});

/* =====================================================
   PROGRESS & HISTORY TRACKING ENGINE
====================================================== */
function getQuizLogs() {
  return JSON.parse(localStorage.getItem("quizMentorLogs") || "[]");
}

function saveQuizAttempt(topicTitle, score, total, accuracy, durationSec) {
  const logs = getQuizLogs();
  const newAttempt = {
    id: Date.now(),
    topic: topicTitle,
    score: score,
    total: total,
    accuracy: accuracy,
    duration: durationSec,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
  };
  logs.unshift(newAttempt);
  localStorage.setItem("quizMentorLogs", JSON.stringify(logs));
  renderAnalytics();
}

function renderAnalytics() {
  const logs = getQuizLogs();
  const totalCompleted = logs.length;
  const totalQuestions = logs.reduce((acc, curr) => acc + curr.total, 0);
  const totalCorrect = logs.reduce((acc, curr) => acc + curr.score, 0);
  const avgAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  let improvementText = "0%";
  if (logs.length >= 2) {
    const recentAccuracy = logs.slice(0, 3).reduce((a, b) => a + b.accuracy, 0) / Math.min(logs.length, 3);
    const olderAccuracy = logs.slice(3).length > 0 
      ? logs.slice(3).reduce((a, b) => a + b.accuracy, 0) / logs.slice(3).length 
      : logs[logs.length - 1].accuracy;

    const diff = Math.round(recentAccuracy - olderAccuracy);
    improvementText = diff >= 0 ? `+${diff}%` : `${diff}%`;
  }

  let mastery = "Beginner";
  if (totalCompleted >= 5 && avgAccuracy >= 85) mastery = "Master 🚀";
  else if (totalCompleted >= 3 && avgAccuracy >= 70) mastery = "Intermediate ⚡";
  else if (totalCompleted > 0) mastery = "Learner 🌱";

  document.getElementById("completed").textContent = totalCompleted;
  document.getElementById("totalQuestionsSolved").textContent = totalQuestions;
  document.getElementById("overallAccuracy").textContent = `${avgAccuracy}%`;
  document.getElementById("statQuestions").textContent = totalQuestions;
  document.getElementById("improvementBadge").textContent = improvementText;
  document.getElementById("masteryStatus").textContent = mastery;

  const container = document.getElementById("historyTableContainer");
  if (!logs.length) {
    container.innerHTML = '<div class="noresults">No quizzes taken yet. Complete your first quiz to see history logs!</div>';
    return;
  }

  container.innerHTML = `
    <div class="history-list">
      ${logs.map(log => `
        <div class="history-item">
          <div>
            <strong>${log.topic}</strong>
            <span class="history-date">${log.date} • ⏱ ${formatTime(log.duration)}</span>
          </div>
          <div class="history-score-badge ${log.accuracy >= 75 ? 'high' : log.accuracy >= 50 ? 'med' : 'low'}">
            ${log.score}/${log.total} (${log.accuracy}%)
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

document.getElementById("clearHistoryBtn")?.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear your quiz history and progress?")) {
    localStorage.removeItem("quizMentorLogs");
    renderAnalytics();
  }
});

/* =====================================================
   TOPIC RENDER & SEARCH
====================================================== */
const grid = document.getElementById("grid"), search = document.getElementById("search");
function render(filter = "", source = topics) {
  grid.innerHTML = "";
  const list = source.filter(t => (t.title + " " + t.desc + " " + t.level).toLowerCase().includes(filter.toLowerCase()));
  if (!list.length) {
    grid.innerHTML = '<div class="noresults">No topics found. Try another keyword.</div>';
    return;
  }
  list.forEach(t => {
    const c = document.createElement("article");
    c.className = "card-topic";
    c.innerHTML = `<div class="icon">${t.icon}</div><h3>${t.title}</h3><p>${t.desc}</p><div class="meta"><span class="tag">${t.level}</span><span class="tag">⏱ ${t.time}</span><span class="tag">${t.questions.length} Qs</span></div><button class="start">Start quiz →</button>`;
    c.querySelector(".start").onclick = () => startQuiz(t);
    grid.appendChild(c);
  });
}
search.addEventListener("input", e => render(e.target.value));
render();

/* =====================================================
   QUIZ ENGINE
====================================================== */
const modal = document.getElementById("quizModal"), body = document.getElementById("quizBody"), bar = document.getElementById("bar");
let current = null, index = 0, score = 0, quizStart = 0, questionStart = 0, elapsed = 0, timerId = null, answerLog = [];
function formatTime(sec) { sec = Math.max(0, Math.floor(sec)); const m = Math.floor(sec / 60), s = sec % 60; return `${m}m ${String(s).padStart(2, "0")}s`; }

function startQuiz(topic) {
  current = { ...topic };
  index = 0; score = 0; answerLog = []; elapsed = 0;
  clearInterval(timerId);

  quizStart = Date.now(); questionStart = Date.now();
  timerId = setInterval(() => {
    elapsed = Math.floor((Date.now() - quizStart) / 1000);
    const t = document.getElementById("quizTimer");
    if (t) t.textContent = `⏱ ${formatTime(elapsed)}`;
  }, 250);

  document.getElementById("quizTitle").textContent = topic.title;
  document.getElementById("quizCategory").textContent = topic.level.toUpperCase();
  modal.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  questionStart = Date.now();
  const q = current.questions[index];
  bar.style.width = `${(index / current.questions.length) * 100}%`;

  let answers = q.slice(1).map((text, i) => ({ text, isCorrect: i === 0 }));
  answers = answers.sort(() => Math.random() - 0.5);

  body.innerHTML = `
    <div class="quiz-top">
      <span id="quizTimer">⏱ ${formatTime(elapsed)}</span>
      <span>Question ${index + 1} of ${current.questions.length}</span>
    </div>
    <div class="q">${index + 1}. ${q[0]}</div>
    <div class="answers">
      ${answers.map((a) => `<button class="answer" data-correct="${a.isCorrect}">${a.text}</button>`).join("")}
    </div>
  `;

  body.querySelectorAll(".answer").forEach((b) => {
    b.onclick = () => processAnswer(b, q);
  });
}

function processAnswer(clickedBtn, qTextArray) {
  const buttons = [...body.querySelectorAll(".answer")];
  const isCorrect = clickedBtn.dataset.correct === "true";
  
  answerLog.push({
    question: qTextArray[0], 
    selected: clickedBtn.textContent, 
    correct: qTextArray[1], 
    isCorrect: isCorrect, 
    time: Math.max(1, Math.round((Date.now() - questionStart) / 1000))
  });

  buttons.forEach((b) => {
    b.disabled = true;
    if (b.dataset.correct === "true") b.classList.add("correct");
    else if (b === clickedBtn) b.classList.add("wrong");
  });

  if (isCorrect) score++;
  
  setTimeout(() => {
    index++;
    if (index < current.questions.length) showQuestion();
    else finish();
  }, 800); 
}

function finish() {
  clearInterval(timerId);
  elapsed = Math.floor((Date.now() - quizStart) / 1000);
  bar.style.width = "100%";
  
  const total = current.questions.length;
  const accuracy = Math.round((score / total) * 100);
  const wrong = total - score;
  const avg = Math.round(elapsed / total);

  const message = accuracy === 100 ? "Perfect score! 🎉" : accuracy >= 75 ? "Excellent work! 🚀" : accuracy >= 50 ? "Good progress! Keep going. 💡" : "Keep practicing — you’re building the skill. 💪";

  const breakdown = answerLog.map((x, n) => {
    return `
      <div class="review-row ${x.isCorrect ? "is-correct" : "is-wrong"}">
        <div>
          <b>${n + 1}. ${x.isCorrect ? "Correct" : "Needs review"}</b>
          <span>${x.question}</span>
        </div>
        <div>
          ${x.isCorrect ? "✓" : "✕"} 
          <small>${x.isCorrect ? x.correct : `Your answer: ${x.selected}<br>Correct:${x.correct}`}</small>
        </div>
      </div>
    `;
  }).join("");

  body.innerHTML = `
    <div class="result">
      <div class="result-hero">
        <div class="result-label">QUIZ COMPLETE</div>
        <div class="score">${score}/${total}</div>
        <h2>${message}</h2>
        <p>Here’s your performance breakdown for ${current.title}.</p>
      </div>
      <div class="result-grid">
        <div class="result-stat"><strong>${accuracy}%</strong><span>Accuracy</span></div>
        <div class="result-stat"><strong>${formatTime(elapsed)}</strong><span>Time taken</span></div>
        <div class="result-stat"><strong>${formatTime(avg)}</strong><span>Avg. / question</span></div>
        <div class="result-stat"><strong>${wrong}</strong><span>To review</span></div>
      </div>
      <div class="meter">
        <div class="meter-head"><b>Accuracy meter</b><b>${accuracy}%</b></div>
        <div class="meter-track"><i style="width:${accuracy}%"></i></div>
      </div>
      <div class="insight">
        <b>🧠 Result analyser</b>
        <p>${accuracy >= 75 
          ? `You have a strong grasp of ${current.title}. Review any missed questions below.` 
          : `Focus on the ${wrong} missed${wrong === 1 ? "question" : "questions"} below to strengthen your understanding.`}</p>
      </div>
      <div class="review">
        <div class="review-title">
          <b>Question-by-question review</b>
          <span>${score} correct • ${wrong} to review</span>
        </div>
        ${breakdown}
      </div>
      <div class="result-actions">
        <button class="btn" onclick="startQuiz(current)">↻ Retake quiz</button>
        <button class="btn secondary" onclick="modal.classList.add('hidden')">Back to topics</button>
      </div>
    </div>
  `;

  saveQuizAttempt(current.title, score, total, accuracy, elapsed);
}

document.getElementById("close").onclick = () => modal.classList.add("hidden");
modal.addEventListener("click", e => { if (e.target === modal) modal.classList.add("hidden"); });
document.getElementById("randomBtn").onclick = () => startQuiz(topics[Math.floor(Math.random() * topics.length)]);

document.addEventListener("DOMContentLoaded", renderAnalytics);