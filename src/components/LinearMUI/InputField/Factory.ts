import Autocomplete from './Autocomplete';
import DateValue from './Date.tsx';
import NumericValue from './Numeric.tsx';
import TextValue from './Text.tsx';
import {
  EditorProps,
  EditorTypeEnum,
  SmartTagEditor,
  SmartTagFieldValues,
} from '../../SmartTagField';

const map = (type: EditorTypeEnum): SmartTagEditor => {
  switch (type) {
    case EditorTypeEnum.autocomplete:
      return Autocomplete;
    case EditorTypeEnum.date:
      return DateValue;
    case EditorTypeEnum.text:
      return TextValue;
    case EditorTypeEnum.numeric:
      return NumericValue;
  }
};

export const createEditor = (type: EditorTypeEnum, props: EditorProps) =>
  map(type).component(props);

export const getDisplayRepresentation = (
  type: EditorTypeEnum,
  value: SmartTagFieldValues,
) => map(type).display(value);
