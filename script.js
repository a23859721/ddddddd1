// =======================
// 날짜 표시
// =======================
function displayDate() {
    const dateBox = document.getElementById("date-box");
    const today = new Date();

    const dayNames = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    const text = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()} · ${dayNames[today.getDay()]}`;
    dateBox.textContent = text;
}

// =======================
// 이미지 URL (원본 전체 주소)
// =======================
const defaultImage = "https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/593974025_2045441352886518_4403626673989411462_n.jpg?stp=c0.225.1365.1365a_dst-jpg_s565x565_tt6&_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Kqm_wHcSedcQ7kNvwGAGYAF&_nc_oc=AdmYwptgN1XTMECIkaFT0Gmhv8BPeMe3o5y7reMDI3kC0UXZjWSIS1jwmPMOsDDDr4o&_nc_zt=23&_nc_ht=scontent-ssn1-1.xx&_nc_gid=XPAFpe1867_47dMlaSXkZg&oh=00_AfnJfAH09DeDRDD65kyP44zR99wvmR6t5fAZI2ypCESDuQ&oe=69360FDB";

const jdhImage = "https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/593250956_2045463929550927_1440551001475027068_n.jpg?stp=c0.39.413.413a_dst-jpg_s413x413_tt6&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=S5t9_1vW_oUQ7kNvwGdTzEz&_nc_oc=AdluC4dqFrjIjMN7zTAQvNr4RtD222DYY0ygff3Oa9FIe_ruZOekpIomvAb05VqliII&_nc_zt=23&_nc_ht=scontent-ssn1-1.xx&_nc_gid=RGANrMvjcP1zo3yc9EqAhA&oh=00_Afn7HPTTYUZHA5ObojQQ2rgQz8wuMsM1OeMYko3eEkOe-A&oe=693606B2";

// =======================
// 키워드 DB
// =======================
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

// 현재 DB
let currentDB = keywordDB_default;

// =======================
// 사용자 메시지
// =======================
function addUserMessage(text) {
    const chatBox = document.getElementById("chat-box");
    const msg = document.createElement("div");
    msg.className = "chat-user";
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// =======================
// AI 메시지 타이핑 큐 (🔥 핵심)
// =======================
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
            setTimeout(processTypingQueue, 300); // 다음 메시지 딜레이
        }
    }, speed);
}

// =======================
// 이미지 변경
// =======================
function changeImage(src) {
    document.querySelector("#image-box img").src = src;
}

// =======================
// 입력 처리
// =======================
function handleUserInput() {
    const input = document.getElementById("user-input");
    const value = input.value.trim();
    const key = value.replace(/\s/g, "").toLowerCase();
    if (!value) return;

    addUserMessage(value);

    // 정동효 모드
    if (key === "정동효") {
        changeImage(jdhImage);
        currentDB = keywordDB_JDH;

        addAIMessageTyping("정동효입니다!");
        addAIMessageTyping("정동효 모드로 전환되었습니다.");

        input.value = "";
        return;
    }

    // 이경현 모드
    if (key === "이경현") {
        changeImage(defaultImage);
        currentDB = keywordDB_default;

        addAIMessageTyping("이경현입니다!");
        addAIMessageTyping("기본 프로필로 돌아왔습니다 😊");

        input.value = "";
        return;
    }

    // 일반 키워드
    const data = currentDB[key];
    data
        ? addAIMessageTyping(data.value)
        : addAIMessageTyping("해당 정보는 없습니다!");

    input.value = "";
}

// =======================
// 이벤트
// =======================
document.getElementById("send-btn").addEventListener("click", handleUserInput);
document.getElementById("user-input").addEventListener("keypress", e => {
    if (e.key === "Enter") handleUserInput();
});

document.getElementById("bg-in-btn").addEventListener("click", () => {
    const colors = ["#ffffff","#f8f5ff","#fff6f6","#f6fff6","#f0faff","#f7f7f7"];
    document.getElementById("container").style.background =
        colors[Math.floor(Math.random() * colors.length)];
});

// =======================
// 초기 실행
// =======================
displayDate();
changeImage(defaultImage);
addAIMessageTyping("안녕하세요!");
addAIMessageTyping("help를 입력해보세요 😊");
