import { JSX } from 'react';

export type SmartTagOptionsGenerator<T> = (inputValue: string) => Promise<T>;

export interface EditorProps {
  field: SmartTagField;
  initialValue: SmartTagFieldValues;
  onValueChange: (value: SmartTagFieldValues) => void;
  onClose: () => void;
}

export interface SmartTagEditor {
  type: EditorTypeEnum;
  component: (props: EditorProps) => JSX.Element;
  display: (value: SmartTagFieldValues) => JSX.Element;
}

export enum EditorTypeEnum {
  text,
  numeric,
  autocomplete,
  date,
}
export interface SmartTagField {
  field: string;
  editorType: EditorTypeEnum;
  label: string;
  operators: SmartTagOperatorOption[];
  values:
    | null
    | SmartTagOptionsGenerator<SmartTagFieldValues>
    | SmartTagFieldValue[];
}

export type SmartTagOptionType = string;

export type SmartTagFieldValues = SmartTagFieldValue[] | null;

export interface SmartTagOptionArgument {
  field: SmartTagOptionType;
  operator: string;
  value: SmartTagFieldValues;
}

export interface SmartTagOption extends SmartTagOptionArgument {
  id: string;
}

export interface SmartTagFieldValue {
  field?: SmartTagOptionType;
  label: string;
  value: string;
}

export interface SmartTagOperatorOption {
  label: string;
  value: string;
  multiple?: boolean;
  noValue?: boolean;
}

export const getSmartTagFieldByLabel = (
  smartTags: SmartTagField[],
  fieldName: string,
): SmartTagField => smartTags.filter((tag) => tag.field === fieldName)[0];

export const getSmartTagOperatorOptionByLabel = (
  operators: SmartTagOperatorOption[],
  value: string,
) => operators.filter((operator) => operator.value === value)[0];

export const generateFieldValues = (
  smartTagField: SmartTagField,
  filter: string | null = null,
): Promise<SmartTagFieldValues> => {
  if (smartTagField.values === null) {
    return Promise.resolve(null);
  }
  if (Array.isArray(smartTagField.values)) {
    return Promise.resolve(smartTagField.values);
  }
  return smartTagField.values(filter ?? '');
};

export const FieldOffset = {
  field: 0,
  operators: 1,
  values: 2,
};

export const getFieldGenerator = (
  smartTags: SmartTagField[],
  values: SmartTagFieldValue[],
) => {
  const getSmartTag = (type: 'operators' | 'values') => {
    return {
      type,
      generator: getSmartTagFieldByLabel(
        smartTags,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        values[values.length - FieldOffset[type]].value,
      )[type],
    };
  };

  if (values[values.length - FieldOffset.operators]?.field === 'field') {
    return getSmartTag('operators');
  }

  if (values[values.length - FieldOffset.values]?.field === 'field') {
    return getSmartTag('values');
  }

  return {
    type: 'field' as keyof SmartTagField,
    generator: async (_inputValue: string) =>
      new Promise<SmartTagFieldValue[]>((resolve) => {
        resolve(
          [
            {
              type: 'free' as SmartTagOptionType,
              //operator: '=',
              label: _inputValue,
              value: _inputValue,
            },
            ...smartTags.map((smartTag) => ({
              type: 'field' as SmartTagOptionType,
              //operator: '=',
              label: smartTag.field,
              value: smartTag.field,
            })),
          ].filter((x) => x.value),
        );
      }),
  };
};
