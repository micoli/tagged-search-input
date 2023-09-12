import {
  EditorTypeEnum,
  SmartTagField,
  SmartTagFieldValue,
} from './components/SmartTagField.ts';
import { persons } from './fake.ts';

export const smartTags: SmartTagField[] = [
  {
    field: 'name',
    label: 'Name',
    editorType: EditorTypeEnum.autocomplete,
    operators: [
      { label: 'not-in', value: 'not in' },
      { label: 'in', value: 'in' },
    ],
    values: async (inputValue) => {
      if (inputValue === '') {
        return Promise.resolve<SmartTagFieldValue[]>(
          persons.slice(0, 10).map((person) => ({
            value: person.id,
            label: `${person.firstName} ${person.lastName} (${person.email})`,
          })),
        );
      }
      const lower = inputValue.toLowerCase();
      return Promise.resolve<SmartTagFieldValue[]>(
        persons
          .filter((person) => person.searchable.includes(lower))
          .map((person) => ({
            value: person.id,
            label: `${person.firstName} ${person.lastName} (${person.email})`,
          })),
      );
    },
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
