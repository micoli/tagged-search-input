import * as React from 'react';

import { Button, Menu, MenuItem } from '@mui/material';
import { SmartTag } from './index.ts';

const MenuField = () => {
  const { smartTags, addField } = SmartTag.useSmartTagSearch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        size={'small'}
        color={'secondary'}
        variant={'contained'}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        Add Filter
      </Button>
      {open && smartTags.length > 0 ? (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {smartTags.map((smartTag) => (
            <MenuItem
              key={smartTag.field}
              onClick={() => {
                handleClose();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                addField(smartTag.field);
              }}
            >
              {smartTag.field}
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </>
  );
};

export default MenuField;
