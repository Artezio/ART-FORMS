export const GROUP = 'GROUP';
export type GROUP = typeof GROUP;

export const DISPLAY = 'DISPLAY';
export type DISPLAY = typeof DISPLAY;

export const BOOLEAN = 'BOOLEAN';
export type BOOLEAN = typeof BOOLEAN;

export const DECIMAL = 'DECIMAL';
export type DECIMAL = typeof DECIMAL;

export const DATE = 'DATE';
export type DATE = typeof DATE;

export const DATE_TIME = 'DATE_TIME';
export type DATE_TIME = typeof DATE_TIME;

export const TIME = 'TIME';
export type TIME = typeof TIME;

export const TEXT = 'TEXT';
export type TEXT = typeof TEXT;

export const CHOICE = 'CHOICE';
export type CHOICE = typeof CHOICE;

export const OPEN_CHOICE = 'OPEN_CHOICE';
export type OPEN_CHOICE = typeof OPEN_CHOICE;

export const MULTI_CHOICE = 'MULTI_CHOICE';
export type MULTI_CHOICE = typeof MULTI_CHOICE;

export const ATTACHMENT = 'ATTACHMENT';
export type ATTACHMENT = typeof ATTACHMENT;

export const STRING = 'STRING';
export type STRING = typeof STRING;

export type QUESTION_TYPE = STRING | ATTACHMENT | OPEN_CHOICE | CHOICE | TEXT | TIME | DATE_TIME | DATE | DECIMAL | BOOLEAN | MULTI_CHOICE;

export type ITEM_TYPE = DISPLAY | GROUP | QUESTION_TYPE;