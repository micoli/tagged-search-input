// import { styled } from '@mui/material/styles';
// import { useEffect, useState } from 'react';
// import { SmartTag } from './index.ts';
// import useAutocomplete from '@mui/base/useAutocomplete';
// import { autocompleteClasses } from '@mui/material/Autocomplete';
//
// const Listbox = styled('ul')(
//   ({ theme }) => `
//   width: 300px;
//   margin: 2px 0 0;
//   padding: 0;
//   position: absolute;
//   list-style: none;
//   background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
//   overflow: auto;
//   max-height: 250px;
//   border-radius: 4px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//   z-index: 1;
//
//   & li {
//     padding: 5px 12px;
//     display: flex;
//
//     & span {
//       flex-grow: 1;
//     }
//
//     & svg {
//       color: transparent;
//     }
//   }
//
//   & li[aria-selected='true'] {
//     background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
//     font-weight: 600;
//
//     & svg {
//       color: #1890ff;
//     }
//   }
//
//   & li.${autocompleteClasses.focused} {
//     background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
//     cursor: pointer;
//
//     & svg {
//       color: currentColor;
//     }
//   }
// `,
// );
//
// export const AutoCompleteAddOption = (children, addField) => {
//   const { smartTags } = SmartTag.useSmartTagSearch();
//
//   const [inputValue, setInputValue] = useState<string>('');
//   const {
//     getRootProps,
//     //getInputProps,
//     getListboxProps,
//     getOptionProps,
//     //anchorEl,
//     value,
//     groupedOptions,
//   } = useAutocomplete({
//     multiple: false,
//     options: smartTags,
//     inputValue,
//     onInputChange: (_event, newInputValue) => setInputValue(newInputValue),
//     isOptionEqualToValue: () => true,
//     getOptionLabel: (option) => {
//       return option.field;
//     },
//   });
//   useEffect(() => {
//     console.log(value);
//     if (value !== null) {
//       setInputValue('');
//       addField(value.field);
//     }
//   }, [value]);
//
//   return (
//     <>
//       <div {...getRootProps()}>{children}</div>
//       {groupedOptions.length > 0 ? (
//         <Listbox {...getListboxProps()}>
//           {groupedOptions.map((option, index) => (
//             <li {...getOptionProps({ option, index })}>
//               <span>{option.label}</span>
//             </li>
//           ))}
//         </Listbox>
//       ) : null}
//     </>
//   );
// };
