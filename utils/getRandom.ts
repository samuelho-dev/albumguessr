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

  let randomSearch = '';

  // Generate a random string with a length between min and max
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  for (let i = 0; i < length; i++) {
    // Gets a random character from the characters string and appends it to the randomSearch string.
    randomSearch += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  return randomSearch;
}
