import './App.css';
import GitlabSearchInputTextHook from './components/Gitlab/GitlabSearchInputTextHook.tsx';
import GitlabSearchInputText from './components/Gitlab/GitlabSearchInputText.tsx';
import { Divider, Typography } from '@mui/material';
import { smartTags } from './components/smartTags.ts';
import { SmartTag as SmartTagMUI } from './components/LinearMUI';
import { SmartTag as SmartTagRadix } from './components/LinearRadix';
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
function App() {
  return (
    <div style={{ width: 900 }}>
      <Typography typography={'H1'}>
        Linear Radix SearchInputTextHook
      </Typography>
      <Theme
        appearance="light"
        accentColor="purple"
        grayColor="slate"
        panelBackground="solid"
        scaling="90%"
      >
        <SmartTagRadix.SearchInputField
          smartTags={smartTags}
          debug
          initialValues={initialValues}
        />
      </Theme>

      <Divider />

      <Typography typography={'H1'}>Linear MUI SearchInputTextHook</Typography>
      <SmartTagMUI.SearchInputField smartTags={smartTags} />

      <Divider />

      <Typography typography={'H1'}>GitlabSearchInputTextHook</Typography>
      <GitlabSearchInputTextHook />

      <Divider />

      <Typography typography={'H1'}>GitlabSearchInputText</Typography>
      <GitlabSearchInputText />
    </div>
  );
}

export default App;
