import { useEffect, useState } from 'react';
import {
  EditorProps,
  EditorTypeEnum,
  generateFieldValues,
  SmartTagEditor,
  SmartTagFieldValue,
  SmartTagFieldValues,
} from '../SmartTagField.ts';
import { TextFieldInput, TextFieldRoot } from '@radix-ui/themes';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import type { GridListProps, ItemProps } from 'react-aria-components';
import { Button, Checkbox, GridList, Item } from 'react-aria-components';
import type { Selection } from 'react-aria-components';

const InnerCheckbox = () => {
  return (
    <Checkbox slot="selection">
      <svg viewBox="0 0 18 18" aria-hidden="true">
        <polyline points="1 9 7 14 15 4" />
      </svg>
    </Checkbox>
  );
};
const InnerItem = ({
  item,
  ...props
}: ItemProps & { item: SmartTagFieldValue }) => {
  return (
    <Item key={item.value} id={item.value} textValue={item.label} {...props}>
      {({ selectionMode, selectionBehavior, allowsDragging }) => (
        <>
          {allowsDragging && <Button slot="drag">≡</Button>}
          {selectionMode === 'multiple' && selectionBehavior === 'toggle' && (
            <InnerCheckbox />
          )}
          {item.label}
        </>
      )}
    </Item>
  );
};

function InnerGridList<T extends object>({
  children,
  ...props
}: GridListProps<T>) {
  return <GridList {...props}>{children}</GridList>;
}

const Component = ({
  field,
  initialValue,
  onValueChange,
  onClose,
}: EditorProps) => {
  const initialList = Array.isArray(initialValue) ? initialValue : [];
  const [valueIds, setValueIds] = useState<Selection>(
    new Set(initialList.map((item) => item.value)),
  );
  const [textValue, setTextValue] = useState<string>('');
  const [items, setItems] = useState<(SmartTagFieldValue & { id: string })[]>(
    [],
  );

  useEffect(() => {
    generateFieldValues(field, textValue).then((items) =>
      setItems((items ?? []).map((item) => ({ id: item.value, ...item }))),
    );
  }, [textValue]);

  const validateAndClose = () => {
    onValueChange(
      items.filter((value) => valueIds === 'all' || valueIds.has(value.value)),
    );
    onClose();
  };

  return (
    <>
      <TextFieldRoot>
        <TextFieldInput
          placeholder="Refine…"
          onChange={(event) => setTextValue(event.currentTarget.value)}
        />
      </TextFieldRoot>
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <InnerGridList
            aria-label="tags"
            selectionMode="multiple"
            items={items ?? []}
            defaultSelectedKeys={valueIds}
            onSelectionChange={setValueIds}
          >
            {Array.isArray(items) &&
              items
                .filter(
                  (item) => textValue == '' || item.label.includes(textValue),
                )
                .map((item) => (
                  <InnerItem key={item.value} item={item}></InnerItem>
                ))}
          </InnerGridList>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
      <button
        disabled={valueIds === 'all' || valueIds.size === 0}
        className={'popover-ok'}
        onClick={validateAndClose}
      >
        Ok
      </button>
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
