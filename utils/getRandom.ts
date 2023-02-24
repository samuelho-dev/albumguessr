export default function getRandomSearch(
  min: number,
  max: number,
  getString = true,
) {
  // If getString is false, return a random number within the range.
  if (!getString) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // A list of all characters that can be chosen.
  const characters = 'abcdefghijklmnopqrstuvwxyz';

  // Gets a random character from the characters string.
  const randomCharacter = characters.charAt(
    Math.floor(Math.random() * characters.length),
  );
  let randomSearch = '';

  // Places the wildcard character at the beginning, or both beginning and end, randomly.
  switch (Math.round(Math.random())) {
    case 0:
      randomSearch = randomCharacter + 'f';
      break;
    case 1:
      randomSearch = 'g' + randomCharacter + 'h';
      break;
  }

  return randomSearch;
}
