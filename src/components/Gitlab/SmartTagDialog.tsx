import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  getSmartTagFieldByLabel,
  SmartTagField,
  SmartTagOperatorOption,
  SmartTagOption,
} from './Linear/SmartTagField.tsx';
import { useEffect, useState } from 'react';
import { Autocomplete, MenuItem, Select, TextField } from '@mui/material';

export default function SmartTagDialog({
  field,
  close,
  smartTags,
}: {
  smartTags: SmartTagField[];
  field: string | null;
  close: () => void;
}) {
  const [operators, setOperators] = useState<SmartTagOperatorOption[]>([]);
  const [values, setValues] = useState<SmartTagOption[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<string>('');
  const [selectedValues, setSelectedValues] = useState<SmartTagOption[]>([]);

  useEffect(() => {
    if (field === null) {
      return;
    }
    const smartTagField = getSmartTagFieldByLabel(smartTags, field);
    if (Array.isArray(smartTagField.operators)) {
      setOperators(smartTagField.operators);
    } else {
      smartTagField.operators('').then(setOperators);
    }
    if (Array.isArray(smartTagField.values)) {
      setValues(smartTagField.values);
    } else {
      smartTagField.values('').then(setValues);
    }
  }, [field]);

  useEffect(() => {
    if (operators.length === 0) {
      return;
    }
    setSelectedOperator(operators[0].label);
  }, [operators]);

  return (
    <Dialog open={field !== null} onClose={close}>
      <DialogTitle>Add {field}</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Stack spacing={2}>
          <Select variant={'standard'} autoWidth value={selectedOperator}>
            {operators.map((operator) => (
              <MenuItem key={operator.label} value={operator.label}>
                {operator.label}
              </MenuItem>
            ))}
          </Select>
          <Autocomplete
            multiple
            options={values}
            value={selectedValues}
            // disableCloseOnSelect={disableCloseOnSelect}
            filterOptions={(x) => x}
            onChange={(_event, newValue) => setSelectedValues(newValue)}
            // onInputChange={(_event, inputValue) => {
            //   if (optionsGenerator.current === null) {
            //     return;
            //   }
            //   optionsGenerator.current(inputValue).then(setOptions);
            // }}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.label
            }
            renderInput={(params) => (
              <TextField {...params} label="Filters" fullWidth />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()} color={'primary'} variant={'contained'}>
          Ok
        </Button>
        <Button onClick={close} color={'secondary'} variant={'contained'}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
