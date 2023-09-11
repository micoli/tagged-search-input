import { useState } from 'react';
import {
  getSmartTagOperatorOptionByLabel,
  SmartTagField,
} from '../SmartTagField.ts';
import * as Menubar from '@radix-ui/react-menubar';

const Operator = ({
  field,
  initialValue,
  onOperatorChange,
}: {
  field: SmartTagField;
  initialValue: string;
  onOperatorChange: (_value: string) => void;
}) => {
  const [operatorValue, setOperatorValue] = useState<string>(initialValue);
  if (field.operators.length === 2) {
    return (
      <button
        className={'tag-action tag-action-operator'}
        onClick={() => {
          const value = field.operators.filter(
            (_operatorOption) => _operatorOption.value !== operatorValue,
          )[0].value;
          setOperatorValue(value);
          onOperatorChange(value);
          return;
        }}
      >
        {getSmartTagOperatorOptionByLabel(field.operators, operatorValue)
          ?.label ?? '-'}
      </button>
    );
  }
  return (
    <>
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger
            disabled={field.operators.length === 1}
            className={'tag-action tag-action-operator'}
          >
            {getSmartTagOperatorOptionByLabel(field.operators, operatorValue)
              ?.label ?? '-'}
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="MenubarContent"
              align="start"
              sideOffset={5}
              alignOffset={-3}
            >
              {field.operators.map((operator) => (
                <Menubar.Item
                  className="MenubarItem"
                  key={operator.label}
                  onClick={() => {
                    setOperatorValue(operator.value);
                    onOperatorChange(operator.value);
                  }}
                >
                  {operator.label}
                </Menubar.Item>
              ))}
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      </Menubar.Root>
    </>
  );
};

export default Operator;
