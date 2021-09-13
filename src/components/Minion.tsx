import React from 'react';

type Props = {
  id: string
  name: string
  attack: number
  health: number
}

function Minion({
  id,
  name,
  attack,
  health,
}: Props) {
  return (
    <div className="minion-container" id={id}>
      <p>{name}</p>
      <p>Attack: {attack}</p>
      <p>Health: {health}</p>
    </div>
  );
}

export default Minion;