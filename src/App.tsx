import './App.css';
import { smartTags } from './smartTags.ts';
import { SmartTag as SmartTagRadix } from './components';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
const initialValues = [
  {
    field: 'name',
    operator: 'in',
    value: [
      { value: 'name-b', label: 'name-b' },
      { value: 'name-c', label: 'name-c' },
    ],
  },
  {
    field: 'comment',
    operator: 'contain',
    value: [{ value: 'dsdsq', label: 'dsdsq' }],
  },
  {
    field: 'size',
    operator: '<',
    value: [{ value: '3', label: '3' }],
  },
  {
    field: 'tag',
    operator: 'in',
    value: [
      { value: 'tag_2', label: 'tag2' },
      { value: 'tag_3', label: 'tag3' },
      { value: 'tag_4', label: 'tag4' },
    ],
  },
  {
    field: 'when',
    operator: '<',
    value: [{ value: '2023-01-01', label: '2023-01-01' }],
  },
];
const App = () => {
  return (
    <Theme
      appearance="light"
      accentColor="purple"
      grayColor="slate"
      panelBackground="solid"
      scaling="90%"
    >
      <h1>Radix SearchInputTextHook</h1>
      <div style={{ width: 900 }}>
        <SmartTagRadix.SearchInputField
          smartTags={smartTags}
          initialValues={initialValues}
        />
      </div>
    </Theme>
  );
};

export default App;
