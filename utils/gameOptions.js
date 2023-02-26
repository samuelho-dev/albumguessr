import getRandomSearch from './getRandom';

export default function gameOptions(options) {
  const gameOptions = options.albums.items.map((item) => {
    const gameOption = {
      artists: item.artists,
      external_urls: item.external_urls,
      href: item.href,
      id: item.id,
      images: item.images,
      name: item.name,
      release_date: item.release_date,
      uri: item.uri,
      answer: false,
    };
    return gameOption;
  });
  const answerIndex = getRandomSearch(1, gameOptions.length - 1, false);

  gameOptions[answerIndex].answer = true;
  return gameOptions;
}
