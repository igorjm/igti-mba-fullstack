const componentsMath = {
  inputSoma: null,
  inputSub: null,
  inputDivisao: null,
  inputMultiplicacao: null,
};

const componentsIMC = {
  inputAltura: null,
  inputPeso: null,
  inputIMC: null,
  inputResultadoIMC: null,
};

window.addEventListener('load', start);

function start() {
  console.log('DOM');

  componentsMath.inputSoma = document.getElementById('inputSoma');
  componentsMath.inputSub = document.getElementById('inputSub');
  componentsMath.inputMultiplicacao = document.getElementById(
    'inputMultiplicacao'
  );
  componentsMath.inputDivisao = document.getElementById('inputDivisao');

  componentsIMC.inputAltura = document.getElementById('inputAltura');
  componentsIMC.inputPeso = document.getElementById('inputPeso');
  componentsIMC.inputIMC = document.getElementById('inputIMC');
  componentsIMC.inputResultadoIMC = document.getElementById(
    'inputResultadoIMC'
  );

  componentsIMC.inputAltura.addEventListener('input', handleCalculateIMC);
}

function handleCalculateIMC() {
  var peso = document.querySelector('#inputPeso').value;
  var alturaCentimetro = document.querySelector('#inputAltura').value;

  var alturaMetros = alturaCentimetro / 100;

  var imc = peso / (alturaMetros * alturaMetros);

  console.log(imc);
  console.log(typeof imc);

  if (imc < 18.5) {
    componentsIMC.inputResultadoIMC.value = 'Você está abaixo do peso ideal.';
    componentsIMC.inputResultadoIMC.setAttribute('style', 'color: lightblue');
  } else if (imc > 18.5 && imc < 25) {
    componentsIMC.inputResultadoIMC.value = 'Você está com o peso normal.';
    componentsIMC.inputResultadoIMC.setAttribute('style', 'color: blue');
  } else if (imc > 25 && imc < 30) {
    componentsIMC.inputResultadoIMC.value = 'Você está acima do peso ideal.';
    componentsIMC.inputResultadoIMC.setAttribute('style', 'color: orange');
  } else if (imc > 30) {
    componentsIMC.inputResultadoIMC.value = 'Você está com obesidade.';
    componentsIMC.inputResultadoIMC.setAttribute('style', 'color: red');
  } else {
    componentsIMC.inputResultadoIMC.componentsIMC.inputResultadoIMC.value =
      'Valor não reconhecido.';
  }

  componentsIMC.inputIMC.value = imc + ' Kg/m2';
}

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
