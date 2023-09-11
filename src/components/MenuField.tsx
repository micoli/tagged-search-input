import { SmartTag } from './index.ts';
import * as Menubar from '@radix-ui/react-menubar';
import { Command } from 'cmdk';
import { useState } from 'react';
import { SmartTagField } from './SmartTagField.ts';
import * as Popover from '@radix-ui/react-popover';
import './style/linear.scss';

const MenuField = () => {
  const asMenu = false;
  const { smartTags, addField } = SmartTag.useSmartTagSearch();
  const [open, setOpen] = useState(false);

  const onSelect = (smartTag: SmartTagField) => {
    setOpen(false);
    setTimeout(() => {
      addField(smartTag.field);
    }, 100);
  };

  if (asMenu) {
    return (
      <Menubar.Root className="MenubarRoot">
        <Menubar.Menu>
          <Menubar.Trigger className="MenubarTrigger">
            Add Filter
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="MenubarContent"
              align="start"
              sideOffset={5}
              alignOffset={-3}
            >
              {smartTags.map((smartTag) => (
                <Menubar.Item
                  className="MenubarItem"
                  key={smartTag.field}
                  onClick={() => {
                    addField(smartTag.field);
                  }}
                >
                  {smartTag.field}
                </Menubar.Item>
              ))}
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      </Menubar.Root>
    );
  }
  return (
    <>
      <Popover.Root
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            setOpen(false);
          }
        }}
      >
        <Popover.Trigger asChild>
          <button
            className={'add-filter'}
            onClick={() => setOpen(!open)}
            type={'button'}
            aria-label="Update values"
          >
            + filter
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="PopoverContent linear"
            sideOffset={5}
            content={'left:130px;'}
          >
            <Command label="Add filter">
              <Command.Input placeholder={'Add a filter...'} />
              <Command.List>
                <Command.Empty>No results found.</Command.Empty>
                {smartTags.map((smartTag) => (
                  <Command.Item
                    key={smartTag.field}
                    onSelect={() => onSelect(smartTag)}
                  >
                    {smartTag.field}
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default MenuField;
