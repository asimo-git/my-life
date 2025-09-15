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
  singles: SingleEventPosition[];
  clusters: ClusterEventPosition[];
}
export interface SingleEventPosition {
  pointPosition: number;
  descriptionPosition: number;
  event: DateItem;
}
export interface ClusterEventPosition {
  position: number;
  events: DateItem[];
}

export interface PeriodPosition {
  id: string;
  startPos: number;
  endPos: number;
  widthOffset: number;
  labelTop: number;
}
