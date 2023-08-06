import MenuField from './MenuField';
import Tag from './Tag';
import SearchInputField from './SearchInputField';
import ValueButton from './ValueButton';
import OperatorButton from './OperatorButton';
import { SearchContextProvider, useSmartTagSearch } from './Context.tsx';

export const SmartTag = {
  useSmartTagSearch,
  SearchInputField,
  SearchContextProvider,
  MenuField,
  Tag,
  ValueButton,
  OperatorButton,
};
