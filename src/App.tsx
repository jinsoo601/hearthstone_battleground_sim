import type {
  AttackEvent,
  Event,
  Player,
} from './types';

import React from 'react';
import DeckTracker from './components/DeckTracker';
import GameBoard from './components/GameBoard';
import EventQueueViewer from './components/EventQueueViewer';
import {EventStatusEnum, EventTypeEnum, PlayerTypeEnum} from './types';
import processEvent from './utils/EventProcessor';
import './App.css';

function App() {
  const [currentEventIndex, setCurrentEventIndex] = React.useState<number>(0);
  const [eventQueue, setEventQueue] = React.useState<Array<Event>>([]);
  const [myPlayer, setMyPlayer] = React.useState<Player>({
    type: PlayerTypeEnum.ME,
    hero: {name: ""},
    minions: [
      {id: "my-player-minion-0", name: "Murloc", attack: 2, health: 3, attackCount: 0, ownerType: PlayerTypeEnum.ME},
    ],
  });
  const [otherPlayer, setOtherPlayer] = React.useState<Player>({
    type: PlayerTypeEnum.OTHER,
    hero: {name: ""},
    minions: [
      {id: "other-player-minion-0", name: "Spirit", attack: 1, health: 4, attackCount: 0, ownerType: PlayerTypeEnum.OTHER},
    ],
  });

  React.useEffect(() => {
    const eventToProcess = eventQueue[currentEventIndex];
    if (eventToProcess == null) {
      return;
    }
    const {
      newEvents,
      updatedMyPlayer,
      updatedOtherPlayer,
    } = processEvent(eventToProcess, myPlayer, otherPlayer);
    setEventQueue(prevEvents => {
      const newEventQueue = [...prevEvents, ...newEvents];
      newEventQueue[currentEventIndex].status = EventStatusEnum.DONE;
      return newEventQueue;
    });
    setMyPlayer(updatedMyPlayer);
    setOtherPlayer(updatedOtherPlayer);
  }, [currentEventIndex]);

  const startBattle = () => {
    const [attackingPlayer, attackedPlayer] = Math.random() > 0.5 ? [myPlayer, otherPlayer] : [otherPlayer, myPlayer];
    const attackingMinion = attackingPlayer.minions[0];
    const attackedMinion = attackedPlayer.minions[Math.floor(Math.random() * attackedPlayer.minions.length)];
    const attackBeginEvent: AttackEvent = {
      type: EventTypeEnum.ATTACK_BEGIN,
      status: EventStatusEnum.READY,
      attackingMinion: attackingMinion,
      attackedMinion: attackedMinion,
    };
    const attackImpactEvent: AttackEvent = {
      type: EventTypeEnum.ATTACK_IMPACT,
      status: EventStatusEnum.READY,
      attackingMinion: attackingMinion,
      attackedMinion: attackedMinion,
    };
    const attackEndEvent: AttackEvent = {
      type: EventTypeEnum.ATTACK_END,
      status: EventStatusEnum.READY,
      attackingMinion: attackingMinion,
      attackedMinion: attackedMinion,
    };

    setEventQueue([attackBeginEvent, attackImpactEvent, attackEndEvent]);
    setCurrentEventIndex(0);
  }
  return (
    <div className="app">
      <EventQueueViewer eventQueue={eventQueue} />
      <GameBoard
        myPlayer={myPlayer}
        otherPlayer={otherPlayer}
        currentEvent={eventQueue[currentEventIndex]}
        onAnimationDone={() => setCurrentEventIndex(idx => idx + 1)}
      />
      <DeckTracker />
      <button onClick={startBattle}>Start</button>
    </div>
  );
}

export default App;
