

let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";  // Change to "en-GB" for English, if needed
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon sir");
    } else {
        speak("Good Evening sir");
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());  // Fixed `toLowerCase` function
};

btn.addEventListener("click", () => {
    recognition.start();
    console.log("Recognition started")
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } 
    else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Pranto Dutta Sir.");
    } 
    else if (message.includes("what is your name")) {
        speak("my name is chiku.");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com/", "_blank");
    } 
    else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com/", "_blank");
    } 
    else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com/", "_blank");
    } 
    else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com/", "_blank");
    } 
    else if (message.includes("open x") || message.includes("open twitter")) {
        speak("Opening X (formerly Twitter)");
        window.open("https://www.twitter.com/", "_blank");
    } 
    else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn");
        window.open("https://www.linkedin.com/", "_blank");
    } 
    else if (message.includes("set timer for")) {
        let time = message.split("set timer for")[1].trim();
        speak(`Setting a timer for ${time}`);
        setTimeout(() => {
            speak(`Your timer for ${time} is up.`);
        }, convertToMilliseconds(time));
    } 
    else if (message.includes("tell me a joke")) {
        tellJoke();
    } 
    else if (message.includes("play music")) {
        speak("Playing music");
        window.open("https://www.spotify.com/", "_blank");  // Or another music source
    } 
    else if (message.includes("what's the weather")) {
        speak("Checking the weather for you");
        window.open("https://www.weather.com/", "_blank");
    } 
    else if(message.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else {
        speak(`This is what I found on the internet regarding ${message}`);
        window.open(`https://www.google.com/search?q=${message}`);
    }
}

function convertToMilliseconds(time) {
    let [value, unit] = time.split(" ");
    value = parseInt(value);

    switch (unit) {
        case "second":
        case "seconds":
            return value * 1000;
        case "minute":
        case "minutes":
            return value * 60 * 1000;
        case "hour":
        case "hours":
            return value * 60 * 60 * 1000;
        default:
            speak("Sorry, I couldn't understand the time format.");
            return 0;
    }
}

function tellJoke() {
    let jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "I'm reading a book about anti-gravity. It's impossible to put down!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!"
    ];
    let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    speak(randomJoke);
}
