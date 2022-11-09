const COUNTRIES = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",
};

const formText = document.getElementById("from-text");
const intoText = document.getElementById("into-text");
const exchangeBtn = document.getElementById("exchange-values-btn");
const selectTag = document.querySelectorAll(".translator__select");
const translateBtn = document.getElementById("translate-btn");
const controlBtns = document.querySelectorAll(".translator__control-btn");

selectTag.forEach((tag, id) => {
  for (const country_code in COUNTRIES) {
    // selecting English by default as a 'FROM language' and Russian as an 'INTO language'
    let selected;
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "ru-RU") {
      selected = "selected";
    }

    let option = `<option class="translator__option" value="${country_code}" ${selected}>${COUNTRIES[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

exchangeBtn.addEventListener("click", () => {
  let tempText = formText.value;
  let tempLang = selectTag[0].value;

  formText.value = intoText.value;
  intoText.value = tempText;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () => {
  let text = formText.value;
  let translateFrom = selectTag[0].value;
  let translateInto = selectTag[1].value;
  if (!text) return;

  intoText.setAttribute("placeholder", "Translating...");
  let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateInto}`;
  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      intoText.value = data.responseData.translatedText;
      intoText.setAttribute("placeholder", "Translation");
    });
});

controlBtns.forEach((btn) => {
  btn.addEventListener("click", ({ target }) => {
    let utterance;

    if (target.dataset.id === "from-listen-btn") {
      utterance = new SpeechSynthesisUtterance(formText.value);
      utterance.lang = selectTag[0].value;
      speechSynthesis.speak(utterance);
    }
    if (target.dataset.id === "from-copy-btn") {
      navigator.clipboard.writeText(formText.value);
    }
    if (target.dataset.id === "into-listen-btn") {
      utterance = new SpeechSynthesisUtterance(intoText.value);
      utterance.lang = selectTag[1].value;
      speechSynthesis.speak(utterance);
    }
    if (target.dataset.id === "into-copy-btn") {
      navigator.clipboard.writeText(intoText.value);
    }
  });
});
