//selectors DOM
const resEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const genrateEl = document.getElementById("generate");
const clipEl = document.getElementById("clipboard");

genrateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const isLower = lowercaseEl.checked;
  const isUpper = uppercaseEl.checked;
  const isSymbols = symbolsEl.checked;
  const isNumber = numberEl.checked;

  resEl.innerText = generatePassword(
    length,
    isLower,
    isUpper,
    isSymbols,
    isNumber
  );
});

//clip board
clipEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resEl.innerText;
  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Sucessfully Copied");
});

function generatePassword(length, lower, upper, symbols, number) {
  let pass = "";

  const typeCount = lower + upper + symbols + number;
  console.log(typeCount);
  const typeArr = [{ lower }, { upper }, { symbols }, { number }].filter(
    (item) => Object.values(item)[0]
  );
  console.log(typeArr);

  if (typeCount === 0) {
    return;
  }
  for (let i = 0; i < length; i += typeCount) {
    typeArr.forEach((type) => {
      const funcname = Object.keys(type)[0];

      pass += randomFunc[funcname]();
    });
  }
  const finalpass = pass.slice(0, length);
  return finalpass;
}

const randomFunc = {
  lower: getRandomlower,
  upper: getRandomUpper,
  number: getRandomNumbers,
  symbols: getRandomSymbols,
};

//functions for generating random characters
function getRandomlower() {
  const res = Math.floor(Math.random() * 26) + 96;
  const letter = String.fromCharCode(res);
  return letter;
}

function getRandomUpper() {
  const res = Math.floor(Math.random() * 26) + 65;
  const letter = String.fromCharCode(res);
  return letter;
}

function getRandomNumbers() {
  const res = Math.floor(Math.random() * 10) + 48;
  const number = String.fromCharCode(res);
  return number;
}

function getRandomSymbols() {
  const symbols = "!@#$%^&*()";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

document.getElementById("me").innerText = getRandomNumbers();

console.log(getRandomSymbols());
