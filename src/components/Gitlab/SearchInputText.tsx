import * as React from 'react';
import { AutocompleteGetTagProps } from '@mui/base/useAutocomplete';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { FilterOptionsState } from '@mui/base/useAutocomplete/useAutocomplete';
import {
  debouncedPromise,
  getFieldGenerator,
  SmartTagField,
  SmartTagOption,
  SmartTagOptionsGenerator,
} from '../SmartTagField';
import {
  Autocomplete,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import { smartTags } from '../smartTags.ts';
import SmartTagDialog from './SmartTagDialog.tsx';

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  type: 'free' | keyof SmartTagField;
  label: string;
}

const Tag = (props: TagProps) => {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
};

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
  };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

export default function SearchInputText() {
  const [value, setValue] = React.useState<SmartTagOption[]>([]);
  const [smartTagFieldDialog, setSmartTagFieldDialog] = React.useState<
    string | null
  >(null);
  const [options, setOptions] = useState<SmartTagOption[]>([]);
  const optionsGenerator =
    React.useRef<null | SmartTagOptionsGenerator<SmartTagOption>>(null);
  //const [disableCloseOnSelect, setDisableCloseOnSelect]= React.useState<boolean>(true);
  const filterOptions = React.useRef<
    (
      options: SmartTagOption[],
      state: FilterOptionsState<SmartTagOption>,
    ) => SmartTagOption[]
  >((x) => x);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const { generator } = getFieldGenerator(smartTags, value);

    if (Array.isArray(generator)) {
      setOptions(generator);
      optionsGenerator.current = null;
      filterOptions.current = (options, state) =>
        options.filter((x) => x.label.includes(state.inputValue));
      return;
    }
    optionsGenerator.current = debouncedPromise(generator, 300);
    filterOptions.current = (options) => options;
    generator('').then(setOptions);
  }, [value]);

  return (
    <React.Fragment>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {smartTags.map((smartTag) => (
          <MenuItem
            key={smartTag.field}
            onClick={() => {
              handleCloseMenu();
              setSmartTagFieldDialog(smartTag.field);
            }}
          >
            {smartTag.field}
          </MenuItem>
        ))}
      </Menu>
      <SmartTagDialog
        smartTags={smartTags}
        field={smartTagFieldDialog}
        close={() => setSmartTagFieldDialog(null)}
      />
      <Autocomplete
        defaultValue={[]}
        multiple
        options={options}
        value={value}
        // disableCloseOnSelect={disableCloseOnSelect}
        filterOptions={filterOptions.current}
        onChange={(_event, newValue) => setValue(newValue)}
        onInputChange={(_event, inputValue) => {
          if (optionsGenerator.current === null) {
            return;
          }
          optionsGenerator.current(inputValue).then(setOptions);
        }}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.label
        }
        renderInput={(params) => {
          params.InputProps.startAdornment = (
            <InputAdornment position="start">
              <Button
                id="basic-button"
                aria-controls={menuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={handleClick}
              >
                Filters
              </Button>
            </InputAdornment>
          );
          return <TextField label="Filters" {...params} fullWidth />;
        }}
        renderOption={(props, option /*, { selected }*/) => {
          return (
            <li {...props}>
              {/*{!disableCloseOnSelect && <CheckBox*/}
              {/*  icon={icon}*/}
              {/*  checkedIcon={checkedIcon}*/}
              {/*  style={{ marginRight: 8 }}*/}
              {/*  checked={selected}*/}
              {/*/>}*/}
              {option.label}
            </li>
          );
        }}
        renderTags={(values) => {
          return values.map(
            (option: SmartTagOption | string, index: number) => (
              <StyledTag
                key={index}
                tabIndex={-1}
                data-tag-index={index}
                type={typeof option === 'string' ? 'free' : option.field}
                label={typeof option === 'string' ? option : option.label}
                onDelete={() => {
                  setValue(value.filter((_, _index) => index !== _index));
                }}
              />
            ),
          );
        }}
      />
      {JSON.stringify(value)}
    </React.Fragment>
  );
}
