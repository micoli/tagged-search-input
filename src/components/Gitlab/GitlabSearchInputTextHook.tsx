import * as React from 'react';
import useAutocomplete, {
  AutocompleteGetTagProps,
} from '@mui/base/useAutocomplete';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { FilterOptionsState } from '@mui/base/useAutocomplete/useAutocomplete';
import {
  getFieldGenerator,
  SmartTagField,
  SmartTagFieldValue,
  SmartTagOption,
  SmartTagOptionsGenerator,
} from '../SmartTagField';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { smartTags } from '../smartTags.ts';
import { debouncedPromise } from '../Helpers/DebouncedPromise.ts';

const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
`,
);

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 900px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.65)'
        : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  type: 'free' | keyof SmartTagField;
  label: string;
}

const Tag = (props: TagProps) => {
  const { type, label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>
        {type === 'free' && 'Add '}
        {label}
      </span>
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

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

export default function GitlabSearchInputTextHook() {
  const [options, setOptions] = useState<SmartTagFieldValue[]>([]);
  const optionsGenerator =
    React.useRef<null | SmartTagOptionsGenerator<SmartTagFieldValue>>(null);
  const filterOptions = React.useRef<
    (
      options: SmartTagOption[],
      state: FilterOptionsState<SmartTagOption>,
    ) => SmartTagOption[]
  >((x) => x);

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [],
    multiple: true,
    options,
    getOptionLabel: (option) => option.label ?? JSON.stringify(option),
  });

  useEffect(() => {
    const { generator } = getFieldGenerator(smartTags, value);

    if (Array.isArray(generator)) {
      setOptions(generator);
      optionsGenerator.current = null;
      filterOptions.current = (options, state) =>
        options.filter((x) => x?.value?.includes(state.inputValue));
      return;
    }
    optionsGenerator.current = debouncedPromise(generator, 300);
    filterOptions.current = (options) => options;
    generator('').then(setOptions);
  }, [value]);

  return (
    <React.Fragment>
      <Root>
        <div {...getRootProps()}>
          <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
            {value.map((option, index: number) => (
              <StyledTag
                {...getTagProps({ index })}
                type={typeof option === 'string' ? 'free' : option.type}
                label={typeof option === 'string' ? option : option.value}
              />
            ))}
            <input {...getInputProps()} />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.value}</span>
              </li>
            ))}
          </Listbox>
        ) : null}
      </Root>
      {JSON.stringify(value)}
    </React.Fragment>
  );
}
