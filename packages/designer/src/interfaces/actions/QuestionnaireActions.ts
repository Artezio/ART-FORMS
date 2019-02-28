import { Action } from "./Action";
import * as Models from "@art-forms/models";
import { ADD_DISPLAY_ITEM, SET_TITLE, SET_DESCRIPTION, UPDATE_QUESTIONNAIRE, CREATE_QUESTIONNAIRE } from "../../constants/actions";


export type AddDisplayItem = (displayItem?: Omit<Models.DisplayItem, 'id' | 'type'>) => Action<ADD_DISPLAY_ITEM, Models.DisplayItem>;
export type SetTitle = (title?: string) => Action<SET_TITLE, string | undefined>;
export type SetDescription = (description?: string) => Action<SET_DESCRIPTION, string | undefined>;
export type UpdateQuestionnaire = (questionnaire: Partial<Models.Questionnaire>) => Action<UPDATE_QUESTIONNAIRE, Partial<Models.Questionnaire>>;
export type CreateQuestionnaire = (questionnaire?: Omit<Models.Questionnaire, 'id'>) => Action<CREATE_QUESTIONNAIRE, Models.Questionnaire>