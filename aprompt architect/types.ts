
import { ReactNode } from 'react';

export enum StepKey {
  CoreIdentity = 'CoreIdentity',
  Context = 'Context',
  Constraints = 'Constraints',
  Canon = 'Canon',
  Command = 'Command',
}

export type PromptData = {
  [key in StepKey]: string;
};

export interface Step {
  key: StepKey;
  title: string;
  description: string;
  placeholder: string;
  icon: ReactNode;
}
