import { useState } from 'react';
import {
  EditorProps,
  EditorTypeEnum,
  SmartTagEditor,
  SmartTagFieldValues,
} from '../SmartTagField.ts';

import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading,
} from 'react-aria-components';
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date';

const getInitialDate = (initialValue: SmartTagFieldValues) => {
  try {
    return parseDate(initialValue?.at(0)?.value ?? '');
  } catch (error) {
    return today(getLocalTimeZone());
  }
};

const Component = ({ initialValue, onValueChange, onClose }: EditorProps) => {
  const [innerValue, setInnerValue] = useState<CalendarDate>(
    getInitialDate(initialValue),
  );

  const validateAndClose = () => {
    if (innerValue === null) {
      return;
    }
    onValueChange([
      { value: innerValue.toString(), label: innerValue.toString() },
    ]);
    onClose();
  };

  return (
    <>
      <Calendar
        aria-label="Appointment date"
        value={innerValue}
        onChange={(newValue) => {
          setInnerValue(newValue);
        }}
      >
        <header>
          <Button slot="previous">◀</Button>
          <Heading />
          <Button slot="next">▶</Button>
        </header>
        <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
      </Calendar>
      <button disabled={innerValue === null} onClick={validateAndClose}>
        Ok
      </button>
    </>
  );
};

const editor: SmartTagEditor = {
  type: EditorTypeEnum.date,
  component: Component,
  // display: (value: SmartTagFieldValues) => value?(value?[0]?.value):'-',
  display: (value: SmartTagFieldValues) => <>{value?.at(0)?.value ?? '---'}</>,
};

export default editor;
