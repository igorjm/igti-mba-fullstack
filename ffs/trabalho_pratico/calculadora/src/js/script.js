const components = {
  inputSoma: null,
  inputSub: null,
  inputDivisao: null,
  inputMultiplicacao: null,
};

window.addEventListener('load', start);

function start() {
  console.log('DOM');

  components.inputSoma = document.getElementById('inputSoma');
  components.inputSub = document.getElementById('inputSub');
  components.inputMultiplicacao = document.getElementById('inputMultiplicacao');
  components.inputDivisao = document.getElementById('inputDivisao');
}

var firstValue = '';

function calculate() {
  var val1 = document.getElementById('inputFirst').value;
  var val2 = document.getElementById('inputSecond').value;

  components.inputSoma.value = handleAddition(parseInt(val1), parseInt(val2));
  components.inputSub.value = handleSubtraction(parseInt(val1), parseInt(val2));
  components.inputMultiplicacao.value = handleMultiplication(
    parseInt(val1),
    parseInt(val2)
  );
  components.inputDivisao.value = handleDivision(
    parseInt(val1),
    parseInt(val2)
  );
}

function handleAddition(val1, val2) {
  if (checkIsNaN(val1, val2)) {
    return val1 + val2;
  } else {
    return 0;
  }
}

function handleSubtraction(val1, val2) {
  if (checkIsNaN(val1, val2)) {
    return val1 - val2;
  } else {
    return 0;
  }
}

function handleMultiplication(val1, val2) {
  if (checkIsNaN(val1, val2)) {
    return val1 * val2;
  } else {
    return 0;
  }
}

function handleDivision(val1, val2) {
  console.log(val1, val2);
  if (checkIsNaN(val1, val2) && val1 > 0 && val2 > 0) {
    return val1 / val2;
  } else {
    return 0;
  }
}

function checkIsNaN(val1, val2) {
  if (isNaN(val1) && isNaN(val2)) {
    return false;
  } else {
    return true;
  }
}
