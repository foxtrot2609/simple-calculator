// constants

const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const dotBtn = document.querySelector(".dot");
const ceBtn = document.querySelector(".ce");
const cBtn = document.querySelector(".c");
const display = document.querySelector("#display");

let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = "";

// functions

const pressNumber = (number) => {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
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
  
  if (MemoryNewNumber && MemoryPendingOperation !== "=") {
    MemoryPendingOperation = operator;
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === "+") {
      MemoryCurrentNumber += parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === "-") {
      MemoryCurrentNumber -= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === "*") {
      MemoryCurrentNumber *= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === "/") {
      MemoryCurrentNumber /= parseFloat(localOperationMemory);
    } else {
      MemoryCurrentNumber = parseFloat(localOperationMemory);
    }
    MemoryPendingOperation = operator;
    display.value = MemoryCurrentNumber;
  }
};

const pressDot = (dot) => {
  let localDotMemory = display.value;

  if (MemoryNewNumber) {
    localDotMemory = "0.";
    MemoryNewNumber = false;
  } else {
    if (localDotMemory.indexOf(".") === -1) {
      localDotMemory += ".";
    }
  }
  display.value = localDotMemory;
};

const pressCe = () => {
  display.value = "0";
  MemoryNewNumber = true;
};

const pressC = () => {
  MemoryCurrentNumber = 0;
  MemoryNewNumber = false;
  MemoryPendingOperation = "";
  display.value = MemoryCurrentNumber;
};

// events

for (let i = 0; i < numberBtn.length; i++) {
  let number = numberBtn[i];
  number.addEventListener("click", (e) => {
    pressNumber(e.target.outerText);
  });
}

for (let i = 0; i < operatorBtn.length; i++) {
  let operator = operatorBtn[i];
  operator.addEventListener("click", (e) => {
    pressOperator(e.target.outerText);
  });
}

dotBtn.addEventListener("click", (e) => {
  pressDot(e.target.outerText);
});

cBtn.addEventListener("click", pressC);

ceBtn.addEventListener("click", pressCe);
