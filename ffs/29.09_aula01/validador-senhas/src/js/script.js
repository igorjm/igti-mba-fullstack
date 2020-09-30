function isNumber(value) {
  return !isNaN(value) && value !== ' ';
}

function isLetter(value) {
  return value.toLowerCase() !== value.toUpperCase();
}

function isLowerCaseLetter(value) {
  return isLetter(value) && value == value.toLowerCase();
}

function isUpperCaseLetter(value) {
  return isLetter(value) && value == value.toLowerCase();
}

function isSymbol(value) {}

var validations = [
  {
    id: 'v1',
    description: 'A senha contém pelo menos 8 caracteres',
    validationsFunction: function validate(value) {
      return value.length >= 8;
    },
  },
  {
    id: 'v2',
    description: 'A senha contém pelo menos 1 caractere numérico',
    validationsFunction: function validate(value) {
      var array = value.split('');

      for (var i = 0; i < array.length; i++) {
        var currentNumber = array[i];

        if (isNumber(currentNumber)) {
          return true;
        }
      }

      return false;
    },
  },
  {
    id: 'v3',
    description: 'A senha contém pelo menos 1 caractere minúsculo',
    validationsFunction: function validate(value) {
      var array = value.split('');

      for (var i = 0; i < array.length; i++) {
        var currentValue = array[i];

        if (isLowerCaseLetter(currentValue)) {
          return true;
        }
      }

      return false;
    },
  },
  {
    id: 'v4',
    description: 'A senha contém pelo menos 1 caractere maiúscula',
    validationsFunction: function validate(value) {
      var array = value.split('');

      for (var i = 0; i < array.length; i++) {
        var currentValue = array[i];

        if (isUpperCaseLetter(currentValue)) {
          return true;
        }
      }

      return false;
    },
  },
  {
    id: 'v5',
    description: 'A senha contém pelo menos 1 caractere especial',
    validationsFunction: function validate(value) {
      var array = value.split('');

      for (var i = 0; i < array.length; i++) {
        var currentValue = array[i];

        if (isSymbol(currentValue)) {
          return true;
        }
      }

      return false;
    },
  },
  {
    id: 'v6',
    description: 'A senha não pode conter espaços em branco',
    validationsFunction: function validate(value) {
      var array = value.split('');

      for (var i = 0; i < array.length; i++) {
        var currentValue = array[i];

        if (currentValue === ' ') {
          return false;
        }
      }

      return true;
    },
  },
  {
    id: 'v7',
    description: 'A senha não pode conter sequência de 3 números consecutivos',
    validationsFunction: function validate(value) {
      var array = value.split('');

      for (var i = 0; i < array.length; i++) {
        var currentValue = array[i];

        if (isNumber(currentValue)) {
          var next1 = array[i + 1];
          var next2 = array[i + 2];

          var number1 = parseInt(currentValue, 10);
          var number2 = parseInt(next1, 10);
          var number3 = parseInt(next2, 10);

          if (number2) {
            return false;
          }
        }
      }

      return true;
    },
  },
];

window.addEventListener('load', start);

function start() {
  var inputPassword = document.querySelector('#inputPassword');
  inputPassword.addEventListener('input', handleInputChange);

  validatePasswod('');
}

function handleInputChange(event) {
  var password = event.target.value;

  var typedPassowrd = document.querySelector('typedPassword');
  typedPassowrd.textContent = password;

  validatePassword(password);
}

function validatePasswod(password) {
  var divValidations = document.querySelector('#divValidations');
  divValidations.innerHTML = '';

  for (var i = 0; i < validations.length; i++) {
    var currentValidation = validations[i];

    var div = document.createElement('div');
    var label = document.createElement('label');
    var input = document.createElement('input');
    var span = document.createElement('span');

    input.type = 'checkbox';
    input.disabled = true;
    input.checked = currentValidation.validationsFunction(password);

    span.textContent = currentValidation.description;

    label.appendChild(input);
    label.appendChild(span);

    div.appendChild(label);

    divValidations.appendChild(div);
  }

  // var inputSize = document.querySelector('#inputSize');
  // inputSize.checked = password.length >= 8;
}

start();
