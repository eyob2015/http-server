// randomNumber.js
function random() {
  const min = -100;
  const max = 100;
  const randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
  return randomInteger;
}
console.log(random());

module.exports = {
  random,
};
