const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TokenEndpoint = `https://accounts.spotify.com/api/token`;
const DefaultSearchEndpoint = "https://api.spotify.com/v1/search?";

const getAccessToken = async (refresh_token) => {
  const response = await fetch(TokenEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getSearchItems = async (refresh_token) => {
  const { accessToken } = await getAccessToken(refresh_token);

  function getRandomSearch() {
    // A list of all characters that can be chosen.
    const characters = "abcdefghijklmnopqrstuvwxyz";

    // Gets a random character from the characters string.
    const randomCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    let randomSearch = "";

    // Places the wildcard character at the beginning, or both beginning and end, randomly.
    switch (Math.round(Math.random())) {
      case 0:
        randomSearch = randomCharacter;
        break;
      case 1:
        randomSearch = randomCharacter;
        break;
    }

    return randomSearch;
  }

  //API PARAMS
  let searchquery = `q=${getRandomSearch()}`;
  const type = "type=track,type,album&";
  const include_external = "include_external=audio&";
  const limit = "limit=4&";
  const market = "market=US&";
  let offset = `offest=${Math.floor(Math.random() * 20)}`;

  let UpdatedSearchEndpoint = DefaultSearchEndpoint.concat(
    searchquery,
    type,
    include_external,
    limit,
    market,
    offset
  );
  console.log(UpdatedSearchEndpoint);
  return fetch(UpdatedSearchEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
