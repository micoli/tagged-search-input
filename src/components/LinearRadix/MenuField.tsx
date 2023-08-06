import { SmartTag } from './index.ts';
import * as Menubar from '@radix-ui/react-menubar';
const MenuField = () => {
  const { smartTags, addField } = SmartTag.useSmartTagSearch();
  return (
    <Menubar.Root className="MenubarRoot">
      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">Add Filter</Menubar.Trigger>
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
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
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
};

export default MenuField;
