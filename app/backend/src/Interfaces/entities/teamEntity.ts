import { Identifiable } from '..';

export interface TeamEntity extends Identifiable {
  teamName: string;
}

export type TeamReponse = TeamEntity;
