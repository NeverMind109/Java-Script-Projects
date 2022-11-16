const textareaEl = document.getElementById("converter-textarea");
const voiceListEl = document.querySelector(".converter__voice-select");
const convertBtn = document.querySelector(".converter__convert-btn");

let synth = speechSynthesis;
let isSpeaking = true;

voices();

function voices() {
  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = `<option class="converter__voice-option" ${selected} value="${voice.name}">${voice.name} ${voice.lang}</option>`;
    voiceListEl.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);

  for (let voice of synth.getVoices()) {
    if (voice.name === voiceListEl.value) {
      utterance.voice = voice;
    }
  }
  synth.speak(utterance);
}

convertBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textareaEl.value !== "") {
    if (!synth.speaking) {
      textToSpeech(textareaEl.value);
    }
    if (textareaEl.value.length > 80) {
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        convertBtn.innerText = "Pause Speech";
      } else {
        synth.pause();
        isSpeaking = true;
        convertBtn.innerText = "Resume Speech";
      }

      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          convertBtn.innerText = "Convert To Speech";
        }
      });
    } else {
      convertBtn.innerText = "Convert To Speech";
    }
  }
});
