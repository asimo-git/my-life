export type DateItem = {
  id: string;
  timestamp: number[];
  description: string;
  color: string;
};

export interface DatesState {
  dateOfBirth: number | null;
  events: DateItem[];
  periods: DateItem[];
}

export interface EventPosition {
  singles: { position: number; event: DateItem }[];
  clusters: { position: number; events: DateItem[] }[];
}

export interface PeriodPosition {
  startPos: number;
  endPos: number;
  widthOffset: number;
  labelTop: number;
}
