export enum EventTypeEnum {
  /** Attacking minion animates toward target minion. No update to player states */
  ATTACK_BEGIN,

  /** Attacking minion and target minion came into contact. Update their health */
  ATTACK_IMPACT,

  /** Attack is done. Attacking minion animates back to its position, and if HP is zero, dies */
  ATTACK_END,
  SUMMON,
}

export enum EventStatusEnum {
  READY,
  DONE,
}

export enum PlayerTypeEnum {
  ME,
  OTHER,
}

export interface Event {
  type: EventTypeEnum
  status: EventStatusEnum
}

export interface AttackEvent extends Event {
  type: EventTypeEnum.ATTACK_BEGIN | EventTypeEnum.ATTACK_IMPACT | EventTypeEnum.ATTACK_END
  attackingMinion: Minion
  attackedMinion: Minion
}

export type Minion = {
  id: string
  name: string
  attack: number
  health: number
  attackCount: number
  ownerType: PlayerTypeEnum
}

export type Hero = {
  name: string
}

export type Player = {
  type: PlayerTypeEnum
  hero: Hero
  minions: Array<Minion>
}