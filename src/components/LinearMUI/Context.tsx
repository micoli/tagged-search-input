import { createContext, useContext, useState, JSX } from 'react';
import {
  getSmartTagFieldByLabel,
  SmartTagField,
  SmartTagFieldValues,
  SmartTagOption,
  SmartTagOptionType,
} from '../SmartTagField';

const SearchContext = createContext<{
  smartTags: SmartTagField[];
  values: SmartTagOption[];
  //setValues: (values: SmartTagOption[]) => void;
  addField: (fieldName: SmartTagOptionType) => void;
  updateAt: (
    index: number,
    _newOperator: string,
    _newValue: SmartTagFieldValues,
  ) => void;
  deleteAt: (_index: number) => void;
} | null>(null);

export const useSmartTagSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      'Toggle compound components must be rendered within the Search component',
    );
  }

  return context;
};

export const SearchContextProvider = ({
  smartTags,
  children,
}: {
  smartTags: SmartTagField[];
  children: JSX.Element;
}) => {
  const [values, setValues] = useState<SmartTagOption[]>([]);
  const addField = (fieldName: SmartTagOptionType) => {
    setValues([
      ...values,
      {
        field: fieldName,
        operator: getSmartTagFieldByLabel(smartTags, fieldName).operators[0]
          .label,
        value: null,
      },
    ]);
  };

  const deleteAt = (index: number) => {
    setValues([...values].filter((_, _index) => index !== _index));
  };

  const updateAt = (
    index: number,
    newOperator: string,
    newValue: SmartTagFieldValues,
  ) => {
    setValues(
      [...values].map((_oldValue, _index) => {
        return index !== _index
          ? _oldValue
          : {
              field: _oldValue.field,
              operator: newOperator,
              value: newValue,
            };
      }),
    );
  };
  return (
    <SearchContext.Provider
      value={{
        smartTags,
        values,
        addField,
        updateAt,
        deleteAt,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
