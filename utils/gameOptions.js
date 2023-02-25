import getRandomSearch from './getRandom';

export default function gameOptions(options) {
  const gameOptions = options.map((item) => {
    const gameOption = {
      artists: item.artists,
      id: item.id,
      external_url: item.external_urls,
      images: item.images,
      name: item.name,
      release_date: item.release_date,
      uri: item.uri,
      answer: false,
    };
    return gameOption;
  });
  const answerIndex = getRandomSearch(1, gameOptions.length - 1, false);
  // console.log('game index', answerIndex, gameOptions[answerIndex]);
  gameOptions[answerIndex].answer = true;
  return gameOptions;
}
