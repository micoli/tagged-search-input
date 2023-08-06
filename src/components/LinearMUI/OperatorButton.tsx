import * as React from 'react';
import { useState } from 'react';
import { SmartTagField } from '../SmartTagField';

import { Button, Menu, MenuItem } from '@mui/material';

const OperatorButton = ({
  field,
  initialValue,
  onOperatorChange,
}: {
  field: SmartTagField;
  initialValue: string;
  onOperatorChange: (_value: string) => void;
}) => {
  const [operator, setOperator] = useState<string>(initialValue);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const setMenuClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (field.operators.length === 2) {
      const value = field.operators.filter(
        (_operator) => _operator.label !== operator,
      )[0].label;
      setOperator(value);
      onOperatorChange(value);
      return;
    }
    if (menuOpen) {
      return;
    }
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Button
        disabled={field.operators.length === 1}
        onClick={handleClick}
        size={'small'}
        style={{ minWidth: 32 }}
      >
        {operator}
      </Button>
      {menuOpen && (
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={setMenuClose}>
          {field.operators.map((field) => (
            <MenuItem
              key={field.label}
              onClick={() => {
                setOperator(field.label);
                onOperatorChange(field.label);
                setMenuClose();
              }}
            >
              {field.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default OperatorButton;
