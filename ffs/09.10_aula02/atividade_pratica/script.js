const getGroupMembers = () => {
  const members = [
    { id: 1, nome: 'Jefferson Diefenbach' },
    { id: 2, nome: 'Gabriele Gonzales' },
    { id: 3, nome: 'Luiz Carlos Fraga Júnior' },
    { id: 4, nome: 'Igor Melo' },
    { id: 5, nome: 'Fabienne Reis' },
    { id: 6, nome: 'Tiago Santos' },
  ];

  return members.sort((a, b) => {
    return a.nome.localeCompare(b.nome);
  });
};

function getFullName(...name) {
  return name.join(' ');
}

function transform(array) {
  const newMap = array.map((item) => {
    return item / 10 + 1;
  });

  return newMap;
}

function onlyNumbersFrom(value) {
  const formattedStr = value
    .split('')
    .filter((n) => !isNaN(n) && n != ' ')
    .join('');

  const strWithoutBlankSpace = formattedStr.split(' ').join('');

  return strWithoutBlankSpace;
}

console.log(getGroupMembers());
console.log(getFullName('Igor', 'José', 'Melo'));
console.log(transform([10, 20, 30, 40, 50]));
console.log(transform([61, 72, 83, 94]));
console.log(onlyNumbersFrom('1234.3423 2423.233 Ab$x 09 l; .. j '));
