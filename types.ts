
export interface StitchResult {
  projectName: string;
  primaryStitches: string[];
  secondaryStitches: string[];
  stitchName: string;
  explanation: string;
  confidence: number;
  hookSize: string;
  difficulty: string;
  yarnWeight: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
