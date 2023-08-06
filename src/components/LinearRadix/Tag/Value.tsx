import { useState } from 'react';
import { SmartTagField, SmartTagFieldValues } from '../../SmartTagField.ts';

import {
  createEditor,
  getDisplayRepresentation,
} from '../InputField/Factory.ts';
import * as Popover from '@radix-ui/react-popover';

const Value = ({
  field,
  initialValue,
  onValueChange,
}: {
  field: SmartTagField;
  initialValue: SmartTagFieldValues;
  onValueChange: (_value: SmartTagFieldValues) => void;
}) => {
  const [valuesEditorOpen, setValuesEditorOpen] = useState<boolean>(
    initialValue === null,
  );
  const onClose = () => setValuesEditorOpen(false);

  return (
    <Popover.Root
      open={valuesEditorOpen}
      onOpenChange={(open) => {
        if (!open) {
          setValuesEditorOpen(false);
        }
      }}
    >
      <Popover.Trigger asChild>
        <button
          className={'tag-action tag-action-value'}
          onClick={() => setValuesEditorOpen(!valuesEditorOpen)}
          aria-label="Update values"
        >
          {getDisplayRepresentation(field.editorType, initialValue) ?? 'undef'}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          {createEditor(field.editorType, {
            field,
            initialValue,
            onValueChange,
            onClose,
          })}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Value;
