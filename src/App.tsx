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
      {
        value: '246277bd-7f0e-4024-93ac-edf29a1cbac9',
        label: 'Anastacio Hintz (anxiousMelanie@virgilio.it)',
      },
      {
        value: 'e1880173-2f5e-4f19-b5f6-925c046361da',
        label: 'Jordi Ondricka (homelyLawrence@comcast.net)',
      },
      {
        value: '9e97ece8-6531-4ac0-a54e-dad30ec4dab2',
        label: 'Vernon Lebsack (poisedJulie@ig.com.br)',
      },
      {
        value: '9def7af7-9320-4169-97cb-dcd996869f6a',
        label: 'Demond Gorczany (Jennylight@live.nl)',
      },
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
