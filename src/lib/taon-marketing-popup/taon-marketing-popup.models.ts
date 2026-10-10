export enum TaonMarketingPopupType {
  Dialog = 'dialog',
  Bottom = 'bottom',
}

export interface TaonMarketingPopupFields {
  name: string;
  enabled: boolean;
  type: TaonMarketingPopupType;
  title: string | null;
  content: string | null;
  imageKey: string | null;
  buttonText: string | null;
  buttonUrl: string | null;
  delaySeconds: number;
  displayOnPaths: string[] | null;
  excludePaths: string[] | null;
  startAt: Date | string | null;
  endAt: Date | string | null;
  maxDisplaysPerVisitor: number | null;
  oncePerSession: boolean;
}

export interface TaonMarketingPopupEvent {
  name: 'popup-impression' | 'popup-click' | 'popup-close';
  category: 'marketing';
  path: string;
  data: { popupId: number; type: TaonMarketingPopupType };
  createdAt: Date;
}

export type TaonMarketingPopupImageResolver = (key: string) => string;