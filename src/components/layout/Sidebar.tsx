import { useQuery } from '@tanstack/react-query';

function SideBar() {
  const { data, isLoading } = useQuery(
    ['leaderboard'],
    () => {
      return fetch(`/api/leaderboards`)
        .then((res) => res.json())
        .catch((err) => console.error(err));
    },
    {
      refetchInterval: 10000, // refetch every 10 seconds
    },
  );
  // console.log(isLoading, 'leader data');

  return (
    <div id="sidebar">
      <h2>Leaderboard</h2>
      <div className="leaderboard-container">
        {!isLoading ? <Leaderboard data={data} /> : <div>Loading ...</div>}
      </div>
    </div>
  );
}

export default SideBar;

function Leaderboard({ data }: any) {
  return (
    <>
      {data?.map((user: any, i: number) => (
        <div key={i} className="leaderboard-user">
          <ins>
            <p>{i + 1}</p>
          </ins>

          {user.user.image ? (
            <img
              src={user.user.image}
              alt="/"
              className="leaderboard-user-image"
            />
          ) : null}
          <p>{user.user.name}</p>
          <p>{user.score}</p>
        </div>
      ))}
    </>
  );
}
