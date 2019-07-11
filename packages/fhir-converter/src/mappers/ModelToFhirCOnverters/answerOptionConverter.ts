import * as Models from '@art-forms/models';

export const mapAnswerOptionFromModel = (answerOption: Models.IAnswerOption): any => {
    const newAnswerOption: any = {
        id: answerOption.id,
        valueString: answerOption.value
    }
    return newAnswerOption;
}

export default mapAnswerOptionFromModel;