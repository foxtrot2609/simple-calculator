// constants

const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const dotBtn = document.querySelector(".dot");
const ceBtn = document.querySelector(".ce");
const cBtn = document.querySelector(".c");
const display = document.querySelector("#display");

let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = "";

// functions

const pressNumber = (number) => {
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else {
    if (display.value === "0") {
      display.value = number;
    } else {
      display.value += number;
    }
  }
};

const pressOperator = (operator) => {
  let localOperationMemory = display.value;

  if (memoryNewNumber && memoryPendingOperation !== "=") {
    memoryPendingOperation = operator;
    display.value = memoryCurrentNumber;
  } else {
    memoryNewNumber = true;
    switch (memoryPendingOperation) {
      case "+":
        memoryCurrentNumber += parseFloat(localOperationMemory);
        break;
      case "-":
        memoryCurrentNumber -= parseFloat(localOperationMemory);
        break;
      case "*":
        memoryCurrentNumber *= parseFloat(localOperationMemory);
        break;
      case "/":
        memoryCurrentNumber /= parseFloat(localOperationMemory);
        break;
      default:
        memoryCurrentNumber = parseFloat(localOperationMemory);
    }
    memoryPendingOperation = operator;
    display.value = memoryCurrentNumber;
  }
};

const pressDot = (dot) => {
  let localDotMemory = display.value;

  if (memoryNewNumber) {
    localDotMemory = "0.";
    memoryNewNumber = false;
  } else if (localDotMemory.indexOf(".") === -1) {
    localDotMemory += ".";
  }
  display.value = localDotMemory;
};

const pressCe = () => {
  display.value = "0";
  memoryNewNumber = true;
};

const pressC = () => {
  memoryCurrentNumber = 0;
  memoryNewNumber = false;
  memoryPendingOperation = "";
  display.value = memoryCurrentNumber;
};

// events

numberBtn.forEach((number) =>
  number.addEventListener("click", (e) => {
    pressNumber(e.target.textContent);
  })
);

operatorBtn.forEach((operator) =>
  operator.addEventListener("click", (e) => {
    pressOperator(e.target.textContent);
  })
);

dotBtn.addEventListener("click", (e) => {
  pressDot(e.target.textContent);
});

cBtn.addEventListener("click", pressC);

ceBtn.addEventListener("click", pressCe);
