
function displayDate() {
    const dateBox = document.getElementById("date-box");
    const today = new Date();

    const dayNames = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    dateBox.textContent =
        `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()} · ${dayNames[today.getDay()]}`;
}

const defaultImage = "images/lgh.jpg";
const jdhImage = "images/jdh.jpg";


const keywordDB_default = {
    "help": { value: "사용 가능 키워드 👉 이름 / 직업 / 생일 / mbti / 좋아하는색" },
    "이름": { value: "이경현" },
    "직업": { value: "학생" },
    "생일": { value: "2003년 12월 27일" },
    "mbti": { value: "ISFJ" },
    "좋아하는색": { value: "파란색" }
};

const keywordDB_JDH = {
    "help": { value: "사용 가능 키워드 👉 이름 / 직업 / 나이 / 생일 / mbti / 특징" },
    "이름": { value: "정동효" },
    "직업": { value: "학생" },
    "나이": { value: "23살" },
    "생일": { value: "2003년 5월 30일" },
    "mbti": { value: "INFP" },
    "특징": { value: "귀여움 + 착함 + 바보미" }
};

let currentDB = keywordDB_default;


function addUserMessage(text) {
    const chatBox = document.getElementById("chat-box");
    const msg = document.createElement("div");
    msg.className = "chat-user";
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}


let typingQueue = [];
let isTyping = false;

function addAIMessageTyping(text) {
    typingQueue.push(text);
    if (!isTyping) processTypingQueue();
}

function processTypingQueue() {
    if (typingQueue.length === 0) {
        isTyping = false;
        return;
    }

    isTyping = true;
    const text = typingQueue.shift();

    const chatBox = document.getElementById("chat-box");
    const msg = document.createElement("div");
    msg.className = "chat-ai";
    chatBox.appendChild(msg);

    let i = 0;
    const speed = 40;

    const timer = setInterval(() => {
        msg.textContent += text[i];
        i++;
        chatBox.scrollTop = chatBox.scrollHeight;

        if (i >= text.length) {
            clearInterval(timer);
            setTimeout(processTypingQueue, 300);
        }
    }, speed);
}

function changeImage(src) {
    document.querySelector("#image-box img").src = src;
}


function handleUserInput() {
    const input = document.getElementById("user-input");
    const value = input.value.trim();
    if (!value) return;

    const key = value.replace(/\s/g, "").toLowerCase();
    addUserMessage(value);


    if (key === "정동효") {
        changeImage(jdhImage);
        currentDB = keywordDB_JDH;

        addAIMessageTyping("정동효입니다!");
        addAIMessageTyping("정동효 모드로 전환되었습니다.");

        input.value = "";
        return;
    }

 
    if (key === "이경현") {
        changeImage(defaultImage);
        currentDB = keywordDB_default;

        addAIMessageTyping("이경현입니다!");
        addAIMessageTyping("기본 프로필로 돌아왔습니다 😊");

        input.value = "";
        return;
    }


    const data = currentDB[key];
    data
        ? addAIMessageTyping(data.value)
        : addAIMessageTyping("해당 정보는 없습니다!");

    input.value = "";
}

document.getElementById("send-btn")
    .addEventListener("click", handleUserInput);

document.getElementById("user-input")
    .addEventListener("keypress", e => {
        if (e.key === "Enter") handleUserInput();
    });

document.getElementById("bg-in-btn")
    .addEventListener("click", () => {
        const colors = ["#ffffff","#f8f5ff","#fff6f6","#f6fff6","#f0faff","#f7f7f7"];
        document.getElementById("container").style.background =
            colors[Math.floor(Math.random() * colors.length)];
    });


displayDate();
changeImage(defaultImage);
addAIMessageTyping("안녕하세요!");
addAIMessageTyping("help를 입력해보세요 😊");
