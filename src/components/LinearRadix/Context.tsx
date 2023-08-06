import { createContext, useContext, useState, JSX } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  getSmartTagFieldByLabel,
  SmartTagField,
  SmartTagFieldValues,
  SmartTagOption,
  SmartTagOptionArgument,
  SmartTagOptionType,
} from '../SmartTagField';

const SearchContext = createContext<{
  smartTags: SmartTagField[];
  values: SmartTagOption[];
  //setValues: (values: SmartTagOption[]) => void;
  addField: (fieldName: SmartTagOptionType) => void;
  updateAt: (
    id: string,
    newOperator: string,
    newValue: SmartTagFieldValues,
  ) => void;
  deleteAt: (id: string) => void;
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
  initialValues,
  children,
}: {
  smartTags: SmartTagField[];
  initialValues: SmartTagOptionArgument[];
  children: JSX.Element;
}) => {
  const [values, setValues] = useState<SmartTagOption[]>(
    initialValues.map((value) => ({ ...value, id: uuidv4() })),
  );
  const addField = (fieldName: SmartTagOptionType) => {
    setValues([
      ...values,
      {
        id: uuidv4(),
        field: fieldName,
        operator: getSmartTagFieldByLabel(smartTags, fieldName).operators[0]
          .label,
        value: null,
      },
    ]);
  };

  const deleteAt = (id: string) => {
    setValues(values.filter((option) => id !== option.id));
  };

  const updateAt = (
    id: string,
    newOperator: string,
    newValue: SmartTagFieldValues,
  ) => {
    setValues(
      [...values].map((option) => {
        return option.id !== id
          ? option
          : {
              id,
              field: option.field,
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
