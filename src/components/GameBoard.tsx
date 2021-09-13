import type {
  Event,
  Player,
} from '../types';

import React from 'react';
import Minion from './Minion';
import animateEvent from '../utils/EventAnimator';

type Props = {
  myPlayer: Player
  otherPlayer: Player
  currentEvent: Event
  onAnimationDone: () => void
}

function GameBoard({
  myPlayer,
  otherPlayer,
  currentEvent,
  onAnimationDone,
}: Props) {
  React.useEffect(() => {
    if (currentEvent != null) {
      animateEvent(currentEvent).then(onAnimationDone);
    }
  }, [currentEvent])
  return (
    <div className="battle-field">
      <div className="player-field">
        {otherPlayer.minions.map((minion, index) => (
          <Minion
            key={`${minion.name}_${index}`}
            id={minion.id}
            name={minion.name}
            attack={minion.attack}
            health={minion.health}
          />
        ))}
      </div>
      <div className="player-field">
        {myPlayer.minions.map((minion, index) => (
          <Minion
            key={`${minion.name}_${index}`}
            id={minion.id}
            name={minion.name}
            attack={minion.attack}
            health={minion.health}
          />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
