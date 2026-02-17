let messageIndex = 0;

const savedIndex = localStorage.getItem("bookOfSandIndex");
if (savedIndex !== null) {
  messageIndex = parseInt(savedIndex, 10);
}

// allows javascript to run after the html page has loaded
document.addEventListener("DOMContentLoaded", () => {

  // text from the book of sand
  const personA = [
    "I sell Bibles",
    "I don’t only sell Bibles. I can show you a holy book I came across on the outskirts of Bikaner. It may interest you. an infinite number of lines;",
    "I don’t know. I’ve never found out.",
    "No, unquestionably this is not—more geometrico—the best way of beginning my story.",
    "To claim that it is true is nowadays the convention of every made-up story.",
    "Mine, however, is true."
  ];

  const personB = [
    "In this house are several English Bibles, including the first—John Wiclif’s. I also have Cipriano de Valera’s, Luther’s—which, from a literary viewpoint, is the worst—and a Latin copy of the Vulgate. As you see, it’s not exactly Bibles I stand in need of.",
    "Nineteenth-century, probably,",
    "",
    "",
  ];

  let charIndex = 0;
  // enter button is prohibited while message is being typed out. true=message is being typed, false=message is done typing.
  let isTyping = false;

  // allows javascript to get text from html
const typeA = document.getElementById("personA");
const typeB = document.getElementById("personB");
  const inputEl = document.getElementById("searchInput");

  // typing animation
function typeMessage(text, element, callback) {
    // locks input
    isTyping = true;
    // clears previous text
    element.textContent = "";
    charIndex = 0;

    // types one letter at a time with animation
    function typeChar() {
if (charIndex < text.length) {
  element.textContent += text[charIndex];
  charIndex++;
      setTimeout(typeChar, 60);
    } else {
      isTyping = false;
      if (callback) callback();
    }
  }

    typeChar();
  }

  // ignores capitalization, punctuation, extra space when user typed.
  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[—–]/g, "-")
      .replace(/[^\w\s]/g, "")
      .trim();
  }

typeMessage(personA[messageIndex], typeA, () => {
  setTimeout(() => {
    typeMessage(personB[messageIndex], typeB);
  }, 500);
});

  // listens to every key pressed, but only react to "enter". 
  inputEl.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (isTyping) return;

    // reads what user typed.
    const userText = inputEl.value;

if (normalize(userText) === normalize(personA[messageIndex])) {
  messageIndex++;
  inputEl.value = "";
  

  // save progress
  localStorage.setItem("bookOfSandIndex", messageIndex);

if (messageIndex < personA.length) {
  typeMessage(personA[messageIndex], typeA, () => {
    setTimeout(() => {
      typeMessage(personB[messageIndex], typeB);
    }, 500);
  });
  } else {
    typeB.textContent = "Done.";
    inputEl.disabled = true;
    localStorage.removeItem("bookOfSandIndex"); // optional
  }

      // else=if user typed wrong.
    } else {
      // stays on the same message of error.
    const currentMessage = personA[messageIndex];

      typeA.textContent = "Try again.";

      setTimeout(() => {
        typeMessage(currentMessage, typeA);
      }, 1200);
    }
  });

  document.getElementById("reset").addEventListener("click", () => {
  localStorage.removeItem("bookOfSandIndex");
  location.reload();
});

});