import { useState, useRef, useEffect } from 'react';
import {
  EditorProps,
  EditorTypeEnum,
  SmartTagEditor,
} from '../../SmartTagField';

import { Button, TextField } from '@mui/material';

const Component = ({ initialValue, onValueChange, onClose }: EditorProps) => {
  const [innerValue, setInnerValue] = useState<string>(
    initialValue?.at(0)?.value ?? '',
  );
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function validateAndClose() {
    onValueChange([{ value: innerValue, label: innerValue }]);
    onClose();
  }

  return (
    <>
      <TextField
        inputRef={inputRef}
        value={innerValue}
        onChange={(event) => setInnerValue(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.code === 'Enter') {
            event.preventDefault();
            validateAndClose();
          }
        }}
      />
      <Button onClick={validateAndClose}>Ok</Button>
    </>
  );
};

const editor: SmartTagEditor = {
  type: EditorTypeEnum.text,
  component: Component,
  display: (value) => <>{value?.at(0)?.value ?? ''}</>,
};

export default editor;
