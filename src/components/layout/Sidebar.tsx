import { useQuery } from '@tanstack/react-query';

function SideBar() {
  const { data, isLoading } = useQuery(
    ['leaderboard'],
    async () => {
      const res = await fetch(`/api/leaderboards`);
      const data = await res.json();
      return data;
    },
    {
      refetchInterval: 10000, // refetch every 10 seconds
    },
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div id="sidebar">
      <h2>Leaderboard</h2>
      <Leaderboard data={data} />
    </div>
  );
}

export default SideBar;

function Leaderboard({ data }: any) {
  console.log('leader', data);
  return (
    <div className="leaderboard-container">
      {data.map((user: any, i: number) => (
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
    </div>
  );
}
