import * as React from 'react';
import { AutocompleteGetTagProps } from '@mui/base/useAutocomplete';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { FilterOptionsState } from '@mui/base/useAutocomplete/useAutocomplete';
//import { CheckBox } from '@mui/icons-material';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  getFieldGenerator,
  SmartTagField,
  SmartTagOption,
  SmartTagOptionsGenerator,
} from '../SmartTagField';
import { Autocomplete, TextField } from '@mui/material';
import { smartTags } from '../smartTags.ts';
import { debouncedPromise } from '../Helpers/DebouncedPromise.ts';

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

export default function GitlabSearchInputText() {
  const [value, setValue] = React.useState<SmartTagOption[]>([]);
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
          typeof option === 'string' ? option : option.value
        }
        renderInput={(params) => <TextField {...params} fullWidth />}
        renderOption={(props, option /*, { selected }*/) => {
          return <li {...props}>{option.value}</li>;
        }}
        renderTags={(values) => {
          return values.map(
            (option: SmartTagOption | string, index: number) => (
              <StyledTag
                key={index}
                tabIndex={-1}
                data-tag-index={index}
                type={typeof option === 'string' ? 'free' : option.field}
                label={typeof option === 'string' ? option : option.value}
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
