import { useState } from 'react';
import {
  getSmartTagFieldByLabel,
  SmartTagFieldValues,
  SmartTagOption,
} from '../SmartTagField';

import { Chip } from '@mui/material';
import { SmartTag } from './index.ts';

const Tag = ({ index, option }: { index: number; option: SmartTagOption }) => {
  const { smartTags, updateAt, deleteAt } = SmartTag.useSmartTagSearch();
  const [innerOperator, setInnerOperator] = useState<string>(option.operator);
  const [innerValue, setInnerValue] = useState<SmartTagFieldValues>(
    option.value,
  );
  const field = getSmartTagFieldByLabel(smartTags, option.field);

  return (
    <Chip
      style={{ borderRadius: 5, marginLeft: 5, marginTop: 2, marginBottom: 2 }}
      label={
        <span>
          {option.field}
          <SmartTag.OperatorButton
            field={field}
            initialValue={innerOperator}
            onOperatorChange={(newOperator) => {
              setInnerOperator(newOperator);
              updateAt(index, newOperator, innerValue);
            }}
          />
          <SmartTag.ValueButton
            field={field}
            initialValue={option.value}
            onValueChange={(newValue) => {
              setInnerValue(newValue);
              updateAt(index, innerOperator, newValue);
            }}
          />
        </span>
      }
      onDelete={() => deleteAt(index)}
    />
  );
};

export default Tag;
