const questions = [
  {
    sentence: "媽媽在___房裏煮晚餐。",
    keyword: "晚餐",
    choices: ["睡", "廚", "書", "吃"],
    answer: "廚"
  },
  {
    sentence: "刷牙後，妹妹在___房睡覺。",
    keyword: "睡覺",
    choices: ["睡", "廚", "書", "吃"],
    answer: "睡"
  },
  {
    sentence: "新年到了，我吃了很多___糕。",
    keyword: "新年",
    choices: ["蛋", "雪", "年", "大"],
    answer: "年"
  },
  {
    sentence: "我最愛在夏天吃冰凍的___糕。",
    keyword: "夏天、冰凍",
    choices: ["蛋", "雪", "年", "大"],
    answer: "雪"
  },
  {
    sentence: "爸爸用刀___蘋果。",
    keyword: "刀",
    choices: ["洗", "切", "喝", "吃"],
    answer: "切"
  },
  {
    sentence: "我用叉___蘋果。",
    keyword: "叉",
    choices: ["洗", "切", "喝", "吃"],
    answer: "吃"
  },
  {
    sentence: "爸爸把碗碟洗得很___。",
    keyword: "洗",
    choices: ["大", "圓", "乾淨", "髒"],
    answer: "乾淨"
  },
  {
    sentence: "我不小心把衣服弄得很___，所以放進洗衣機清洗。",
    keyword: "洗衣機",
    choices: ["大", "圓", "乾淨", "髒"],
    answer: "髒"
  }
];

let current = 0;
let score = 0;

function loadQuestion() {
  const q = questions[current];

  document.getElementById("sentence").innerText = q.sentence;
  document.getElementById("keyword").innerText = `（提示：${q.keyword}）`;
  document.getElementById("keyword").classList.remove("red-line");

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach(word => {
    const choice = document.createElement("div");
    choice.className = "choice";

    choice.innerHTML = `
      <div class="word-box">${word}</div>
      <img class="picture" src="images/${word}.png">
    `;

    choice.onclick = () => handleChoice(choice, word);

    choicesDiv.appendChild(choice);
  });
}

function handleChoice(choiceElement, word) {

  // First tap: reveal picture
  if (!choiceElement.classList.contains("revealed")) {
    document.querySelectorAll(".choice").forEach(c =>
      c.classList.remove("revealed")
    );
    choiceElement.classList.add("revealed");
    return;
  }

  // Second tap: submit answer
  checkAnswer(word);
}

function checkAnswer(word) {
  if (word === questions[current].answer) {
    score++;
    document.getElementById("celebration").classList.remove("hidden");

    setTimeout(() => {
      document.getElementById("celebration").classList.add("hidden");
      current++;

      if (current < questions.length) {
        loadQuestion();
      } else {
        showScoreScreen();
      }
    }, 2000);

  } else {
    document.getElementById("keyword").classList.add("red-line");
  }
}

function showScoreScreen() {
  document.getElementById("question").style.display = "none";
  document.getElementById("choices").style.display = "none";

  document.getElementById("score-screen").classList.remove("hidden");

  const starContainer = document.getElementById("star-container");
  starContainer.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    if (i < score) {
      starContainer.innerHTML += "⭐";
    } else {
      starContainer.innerHTML += "☆";
    }
  }
}

function restartGame() {
  current = 0;
  score = 0;

  document.getElementById("score-screen").classList.add("hidden");
  document.getElementById("question").style.display = "block";
  document.getElementById("choices").style.display = "flex";

  loadQuestion();
}

loadQuestion();
