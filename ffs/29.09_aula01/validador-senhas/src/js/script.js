var validations = [
  {
    id: 'validation01',
    description: 'A senha contém pelo menos 8 caracteres.',
    validator: function validate(value) {
      return value.length >= 8;
    },
  },

  {
    id: 'validation02',
    description: 'A senha contém pelo menos um valor numérico.',
    validator: function validate(value) {
      var array = value.split('');

      for (var i = 0; i < array.length; i++) {
        var currentChar = array[i];

        if (!isNaN(currentChar)) {
          return true;
        }
      }

      return false;
    },
  },

  {
    id: 'validation03',
    description: 'A senha contém pelo menos um caractere minúsculo.',
    validator: function validate(value) {
      var array = value.split('');

      for (var i = 0; i < array.length; i++) {
        var currentChar = array[i];

        if (currentChar.toLowerCase() !== currentChar.toUpperCase()) {
          if (currentChar === currentChar.toLowerCase()) {
            return true;
          }
        }
      }

      return false;
    },
  },

  {
    id: 'validation04',
    description: 'A senha contém pelo menos um caractere maiúsculo.',
    validator: function validate(value) {
      var array = value.split('');

      for (var i = 0; i < array.length; i++) {
        var currentChar = array[i];

        if (currentChar.toLowerCase() !== currentChar.toUpperCase()) {
          if (currentChar === currentChar.toUpperCase()) {
            return true;
          }
        }
      }

      return false;
    },
  },

  {
    id: 'validation05',
    description: 'A senha contém pelo menos um símbolo.',
    validator: function validate(value) {
      var array = value.split('');

      for (var i = 0; i < array.length; i++) {
        var currentChar = array[i];

        if (currentChar.toLowerCase() === currentChar.toUpperCase()) {
          if (currentChar !== ' ') {
            return true;
          }
        }
      }

      return false;
    },
  },
];

var currentPassword = '';

function start() {
  var inputPassword = document.querySelector('#inputPassword');
  inputPassword.addEventListener('input', handlePasswordChange);

  calculate();
}

function handlePasswordChange(event) {
  currentPassword = event.target.value;
  calculate();
}

function calculate() {
  var divAnalysis = document.querySelector('#divAnalysis');
  divAnalysis.innerHTML = '';

  var ul = document.createElement('ul');

  for (var i = 0; i < validations.length; i++) {
    var currentValidation = validations[i];

    var li = document.createElement('li');
    var div = document.createElement('div');
    var label = document.createElement('label');
    var input = document.createElement('input');
    var span = document.createElement('span');

    span.textContent = currentValidation.description;

    input.type = 'checkbox';
    input.disabled = true;
    input.checked = currentValidation.validator(currentPassword);

    label.appendChild(input);
    label.appendChild(span);

    div.appendChild(label);
    li.appendChild(div);
    ul.appendChild(li);
  }

  var password = document.createElement('p');
  password.innerHTML =
    'Senha digitada: <strong>' + currentPassword + '</strong>';

  divAnalysis.appendChild(password);
  divAnalysis.appendChild(ul);
}

start();
