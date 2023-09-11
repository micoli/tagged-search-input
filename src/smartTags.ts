import {
  EditorTypeEnum,
  SmartTagField,
  SmartTagFieldValue,
} from './components/SmartTagField.ts';

export const smartTags: SmartTagField[] = [
  {
    field: 'name',
    label: 'Name',
    editorType: EditorTypeEnum.autocomplete,
    operators: [
      { label: '=', value: '=' },
      { label: 'in', value: 'in' },
    ],
    values: async (_inputValue) =>
      Promise.resolve<SmartTagFieldValue[]>([
        {
          value: 'free',
          label: _inputValue,
        },
        ...['name-b', 'name-c', 'name-d']
          .filter((x) => x)
          .map((label) => ({
            value: label,
            label,
          })),
      ]),
  },
  {
    field: 'comment',
    label: 'Comment',
    editorType: EditorTypeEnum.text,
    operators: [{ label: 'contain', value: 'contain' }],
    values: null,
  },
  {
    field: 'size',
    label: 'Size',
    editorType: EditorTypeEnum.numeric,
    operators: [
      {
        value: '<',
        label: '<',
      },
      {
        value: '<=',
        label: '<=',
      },
      {
        value: '>=',
        label: '>=',
      },
      {
        value: '>',
        label: '>',
      },
    ],
    values: ['10', '100', '200', '500', '20000'].map((label) => ({
      value: label,
      label,
    })),
  },
  {
    field: 'tag',
    label: 'Tag',
    editorType: EditorTypeEnum.autocomplete,
    operators: [{ value: 'in', label: 'in' }],
    values: [...Array(25).keys()].map((label) => ({
      value: `tag_${label}`,
      label: `tag ${label}`,
    })),
  },
  {
    field: 'when',
    label: 'When',
    editorType: EditorTypeEnum.date,
    operators: [
      { value: '<', label: 'Before' },
      { value: '>', label: 'After' },
    ],
    values: null,
  },
];
