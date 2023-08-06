import { useState } from 'react';
import {
  EditorProps,
  EditorTypeEnum,
  SmartTagEditor,
  SmartTagFieldValues,
} from '../../SmartTagField';

import { TextFieldInput, TextFieldRoot } from '@radix-ui/themes';

const Component = ({ initialValue, onValueChange, onClose }: EditorProps) => {
  const [innerValue, setInnerValue] = useState<string>(
    initialValue?.at(0)?.value ?? '0',
  );

  const validateAndClose = () => {
    onValueChange([{ value: innerValue, label: innerValue }]);
    onClose();
  };

  return (
    <>
      <TextFieldRoot>
        <TextFieldInput
          type="number"
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
  type: EditorTypeEnum.numeric,
  component: Component,
  display: (value: SmartTagFieldValues) => <>{value?.at(0)?.value ?? 0}</>,
};

export default editor;
