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

  return randomSearch;
}
