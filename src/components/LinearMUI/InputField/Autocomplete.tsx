import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  EditorProps,
  EditorTypeEnum,
  generateFieldValues,
  SmartTagEditor,
  SmartTagFieldValue,
  SmartTagFieldValues,
} from '../../SmartTagField';

import {
  Button,
  Checkbox,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';

const Component = ({
  field,
  initialValue,
  onValueChange,
  onClose,
}: EditorProps) => {
  const initialList = Array.isArray(initialValue) ? initialValue : [];
  const [values, setValues] = useState<SmartTagFieldValue[]>(initialList);
  const [valueIds, setValueIds] = useState<string[]>(
    initialList.map((item) => item.value),
  );
  const [textValue, setTextValue] = useState<string>('');
  const [items, setItems] = useState<SmartTagFieldValues>([]);
  const inputRef = React.useRef<HTMLInputElement>();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    generateFieldValues(field, textValue).then(setItems);
  }, [textValue]);

  const validateAndClose = () => {
    onValueChange(values);
    onClose();
  };

  return (
    <>
      <TextField
        inputRef={inputRef}
        value={textValue}
        onChange={(event) => setTextValue(event.currentTarget.value)}
      />
      <List>
        {Array.isArray(items) &&
          items
            .filter((item) => textValue == '' || item.label.includes(textValue))
            .map((item) => {
              return (
                <ListItem key={item.value}>
                  <Checkbox
                    checked={valueIds.includes(item.value)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setValues([...values, item]);
                        setValueIds([...valueIds, item.value]);
                        return;
                      }
                      setValues(
                        values.filter((value) => value.value !== item.value),
                      );
                      setValueIds(
                        valueIds.filter((valueId) => valueId !== item.value),
                      );
                    }}
                    sx={{ color: 'inherit' }}
                  />
                  <Typography sx={{ ml: 'auto' }}>{item.label}</Typography>
                </ListItem>
              );
            })}
      </List>
      <Button disabled={valueIds.length === 0} onClick={validateAndClose}>
        Ok
      </Button>
    </>
  );
};

const editor: SmartTagEditor = {
  type: EditorTypeEnum.autocomplete,
  component: Component,
  display: (value: SmartTagFieldValues) => (
    <>{value?.map((item) => item.label).join(',')}</>
  ),
};

export default editor;
