import type {
  AttackEvent,
  Event,
  Player,
} from '../types';

import {EventTypeEnum, PlayerTypeEnum} from '../types';

type ProcessedState = {
  newEvents: Array<Event>
  updatedMyPlayer: Player
  updatedOtherPlayer: Player
}

// updates player state
export default function processEvent(
  event: Event,
  myPlayer: Player,
  otherPlayer: Player,
): ProcessedState {
  switch(event.type) {
    case EventTypeEnum.ATTACK_BEGIN:
      return processAttackBeginEvent(event as AttackEvent, myPlayer, otherPlayer);
    case EventTypeEnum.ATTACK_IMPACT:
      return processAttackImpactEvent(event as AttackEvent, myPlayer, otherPlayer);
    case EventTypeEnum.ATTACK_END:
      return processAttackEndEvent(event as AttackEvent, myPlayer, otherPlayer);
    case EventTypeEnum.SUMMON:
      return processSummonEvent(event, myPlayer, otherPlayer);
    default:
      throw new Error(`Unknown EventType: ${event.type}`);
  }
}

/**
 * No state change. There for UI purpose only
 */
function processAttackBeginEvent(
  event: AttackEvent,
  myPlayer: Player,
  otherPlayer: Player,
): ProcessedState {
  return {
    newEvents: [],
    updatedMyPlayer: myPlayer,
    updatedOtherPlayer: otherPlayer,
  };
}

/**
 * Responsible for updating player states, specifically minion states
 */
function processAttackImpactEvent(
  event: AttackEvent,
  myPlayer: Player,
  otherPlayer: Player,
): ProcessedState {
  const {attackingMinion, attackedMinion} = event;
  const myMinion = [attackingMinion, attackedMinion].find(minion => minion.ownerType === PlayerTypeEnum.ME);
  const otherMinion = [attackingMinion, attackedMinion].find(minion => minion.ownerType === PlayerTypeEnum.OTHER);
  const updatedMyPlayer: Player = {
    ...myPlayer,
    minions: myPlayer.minions.map(minion => {
      if (minion.id === myMinion?.id) {
        return {
          ...myMinion,
          attackCount: myMinion.attackCount + 1,
          health: myMinion.health - (otherMinion?.attack ?? 0),
        };
      }
      return minion;
    })
  };
  const updatedOtherPlayer: Player = {
    ...otherPlayer,
    minions: otherPlayer.minions.map(minion => {
      if (minion.id === otherMinion?.id) {
        return {
          ...otherMinion,
          attackCount: otherMinion.attackCount + 1,
          health: otherMinion.health - (myMinion?.attack ?? 0),
        };
      }
      return minion;
    })
  }
  return {
    newEvents: [],
    updatedMyPlayer,
    updatedOtherPlayer,
  };
}

/**
 * Responsible for enqueuing new events such as
 * HP went 0 -> Death event
 * Death Rattle -> Summon Event
 * Lastly, queue next attack
 */
function processAttackEndEvent(
  event: AttackEvent,
  myPlayer: Player,
  otherPlayer: Player,
): ProcessedState {
  return {
    newEvents: [],
    updatedMyPlayer: myPlayer,
    updatedOtherPlayer: otherPlayer,
  };
}

function processSummonEvent(
  event: Event,
  myPlayer: Player,
  otherPlayer: Player,
): ProcessedState {
  return {
    newEvents: [],
    updatedMyPlayer: myPlayer,
    updatedOtherPlayer: otherPlayer,
  };
}