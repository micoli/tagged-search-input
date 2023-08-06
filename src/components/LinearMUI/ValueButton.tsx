import { useRef, useState, useEffect } from 'react';
import { SmartTagField, SmartTagFieldValues } from '../SmartTagField';

import { Button, Popover } from '@mui/material';
import {
  createEditor,
  getDisplayRepresentation,
} from './InputField/Factory.ts';

const ValueButton = ({
  field,
  initialValue,
  onValueChange,
}: {
  field: SmartTagField;
  initialValue: SmartTagFieldValues;
  onValueChange: (_value: SmartTagFieldValues) => void;
}) => {
  const anchorEl = useRef<HTMLSpanElement>(null);
  const [valuesEditorOpen, setValuesEditorOpen] = useState<boolean>();
  const onClose = () => setValuesEditorOpen(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (initialValue === null && anchorEl !== null) {
        setValuesEditorOpen(true);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const component = createEditor(field.editorType, {
    field,
    initialValue,
    onValueChange,
    onClose,
  });

  return (
    <>
      <span ref={anchorEl}></span>
      <Button
        onClick={() => setValuesEditorOpen(true)}
        size={'small'}
        style={{ minWidth: 32 }}
      >
        {getDisplayRepresentation(field.editorType, initialValue)}
      </Button>

      {valuesEditorOpen && (
        <Popover
          open={valuesEditorOpen}
          anchorEl={anchorEl.current}
          onClose={onClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {component}
        </Popover>
      )}
    </>
  );
};

export default ValueButton;
