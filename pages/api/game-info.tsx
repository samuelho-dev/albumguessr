// import { getSearchItems } from "../../lib/spotify";
// import { getSession } from "next-auth/react";

// const handler = async (req, res: any) => {
//   const {
//     token: { accessToken },
//   } = await getSession({ req });

//   const response = await getSearchItems(accessToken);
//   const { items } = await response.json();

//   return res.status(200).json({ items });
// };

// export default handler;
