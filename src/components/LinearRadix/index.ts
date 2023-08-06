import MenuField from './MenuField';
import Tag from './Tag/Tag.tsx';
import SearchInputField from './SearchInputField';
import Value from './Tag/Value.tsx';
import Operator from './Tag/Operator.tsx';
import { SearchContextProvider, useSmartTagSearch } from './Context.tsx';
import './style/style.css';

export const SmartTag = {
  useSmartTagSearch,
  SearchInputField,
  SearchContextProvider,
  MenuField,
  Tag,
  Value,
  Operator,
};
