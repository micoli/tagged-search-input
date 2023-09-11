import { useState } from 'react';
import {
  EditorProps,
  EditorTypeEnum,
  SmartTagEditor,
} from '../SmartTagField.ts';
import { TextFieldInput, TextFieldRoot } from '@radix-ui/themes';

const Component = ({ initialValue, onValueChange, onClose }: EditorProps) => {
  const [innerValue, setInnerValue] = useState<string>(
    initialValue?.at(0)?.value ?? '',
  );
  const validateAndClose = () => {
    onValueChange([{ value: innerValue, label: innerValue }]);
    onClose();
  };

  return (
    <>
      <TextFieldRoot>
        <TextFieldInput
          placeholder="Refine…"
          value={innerValue}
          onChange={(event) => setInnerValue(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.code === 'Enter') {
              event.preventDefault();
              validateAndClose();
            }
          }}
        />
      </TextFieldRoot>

      <button onClick={validateAndClose}>Ok</button>
    </>
  );
};

const editor: SmartTagEditor = {
  type: EditorTypeEnum.text,
  component: Component,
  display: (value) => <>{value?.at(0)?.value ?? ''}</>,
};

export default editor;
