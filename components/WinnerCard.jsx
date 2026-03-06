export default function WinnerCard({ winner }) {
  const medals = { "1st": "🥇", "2nd": "🥈" };
  const medal = medals[winner.position] || "🏆";
  const posNum = winner.position.replace("st", "").replace("nd", "").replace("rd", "");

  return (
    <div className={`winner-card glass-card winner-pos-${posNum}`}>
      <div className="winner-card-medal">{medal}</div>
      <div className="winner-card-position">{winner.position} Place</div>
      <div className="winner-card-name">{winner.participantName}</div>
      <div className="winner-card-college">{winner.college}</div>
    </div>
  );
}
