import { useState } from 'react';
import {
  getSmartTagFieldByLabel,
  SmartTagFieldValues,
  SmartTagOption,
} from '../SmartTagField.ts';

import { SmartTag } from '../index.ts';
import { Flex } from '@radix-ui/themes';

const Tag = ({ option }: { option: SmartTagOption }) => {
  const { smartTags, updateAt, deleteAt } = SmartTag.useSmartTagSearch();
  const [innerOperator, setInnerOperator] = useState<string>(option.operator);
  const [innerValue, setInnerValue] = useState<SmartTagFieldValues>(
    option.value,
  );
  const field = getSmartTagFieldByLabel(smartTags, option.field);

  return (
    <Flex
      style={{ borderRadius: 5, marginLeft: 5, marginTop: 2, marginBottom: 2 }}
      className={'chip'}
    >
      <div className={'chip-content'}>
        {option.field}
        &nbsp;
        {'['}
        <SmartTag.Operator
          field={field}
          initialValue={innerOperator}
          onOperatorChange={(newOperator) => {
            setInnerOperator(newOperator);
            updateAt(option.id, newOperator, innerValue);
          }}
        />
        {']'}&nbsp;
        <SmartTag.Value
          field={field}
          initialValue={option.value}
          onValueChange={(newValue) => {
            setInnerValue(newValue);
            updateAt(option.id, innerOperator, newValue);
          }}
        />
      </div>
      <div onClick={() => deleteAt(option.id)} className="chip-close-svg">
        <svg
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ width: 24, height: 24 }}
        >
          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
        </svg>
      </div>
    </Flex>
  );
};

export default Tag;
