import type {
  AttackEvent,
  Event,
  Player,
} from '../types';

import anime from 'animejs';
import {EventTypeEnum} from '../types';

export default function animateEvent(event: Event): Promise<void> {
  switch(event.type) {
    case EventTypeEnum.ATTACK_BEGIN:
      return animateAttackBeginEvent(event as AttackEvent);
    case EventTypeEnum.ATTACK_IMPACT:
      return animateAttackImpactEvent(event as AttackEvent);
    case EventTypeEnum.ATTACK_END:
      return animateAttackEndEvent(event as AttackEvent);
    case EventTypeEnum.SUMMON:
      return animateSummonEvent(event);
    default:
      throw new Error(`Unknown EventType: ${event.type}`);
  }
}

function animateAttackBeginEvent(event: AttackEvent): Promise<void> {
  const {attackingMinion, attackedMinion} = event;
 return anime({
    targets: `#${attackingMinion.id}`,
    translateY: -200,
  }).finished;
}

function animateAttackImpactEvent(event: AttackEvent): Promise<void> {
  const {attackingMinion, attackedMinion} = event;
  return anime({
    targets: `#${attackedMinion.id}`,
    rotate: '1turn'
  }).finished;
}

function animateAttackEndEvent(event: AttackEvent): Promise<void> {
  const {attackingMinion, attackedMinion} = event;
 return anime({
    targets: `#${attackingMinion.id}`,
    translateY: 0,
  }).finished;
}

function animateSummonEvent(event: Event): Promise<void> {
  return Promise.resolve();
}