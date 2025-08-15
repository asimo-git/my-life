export type DateItem = {
  id: string;
  timestamp: number;
  description: string;
  color: string;
};

export type PeriodItem = {
  id: string;
  timestamp: number[];
  description: string;
  color: string;
};

export interface DatesState {
  dateOfBirth: number | null;
  events: DateItem[];
  periods: PeriodItem[];
}

export interface EventPosition {
  pointPos: number;
  descPos: number;
}

export interface PeriodPosition {
  startPos: number;
  endPos: number;
  widthOffset: number;
  shiftDescription?: boolean;
}
