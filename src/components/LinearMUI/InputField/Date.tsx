import { useState } from 'react';
import {
  EditorProps,
  EditorTypeEnum,
  SmartTagEditor,
  SmartTagFieldValues,
} from '../../SmartTagField';

import { Button, TextField } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Component = ({ initialValue, onValueChange, onClose }: EditorProps) => {
  const [innerValue, setInnerValue] = useState<string | null>(
    initialValue?.at(0)?.value ?? '',
  );

  const validateAndClose = () => {
    if (innerValue === null) {
      return;
    }
    onValueChange([{ value: innerValue, label: innerValue }]);
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={innerValue}
        onChange={(newValue) => {
          setInnerValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <Button disabled={innerValue === null} onClick={validateAndClose}>
        Ok
      </Button>
    </LocalizationProvider>
  );
};

const editor: SmartTagEditor = {
  type: EditorTypeEnum.date,
  component: Component,
  // display: (value: SmartTagFieldValues) => value?(value?[0]?.value):'-',
  display: (value: SmartTagFieldValues) => <>{value?.at(0)?.value ?? ''}</>,
};

export default editor;
