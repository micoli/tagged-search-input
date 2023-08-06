import { SmartTagField, SmartTagOptionArgument } from '../SmartTagField';
import { SmartTag } from './index.ts';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const SearchInputComponent = ({ debug }: { debug: boolean }) => {
  const { values } = SmartTag.useSmartTagSearch();

  return (
    <>
      <div className={'input-wrapper'}>
        <SmartTag.MenuField />
        {values.map((option) => (
          <SmartTag.Tag key={option.id} option={option} />
        ))}
        <input />
      </div>
      {debug && (
        <div style={{ textAlign: 'left', height: 400, overflow: 'auto' }}>
          <JsonView
            style={defaultStyles}
            data={values.map((value) => ({
              field: value.field,
              operator: value.operator,
              value: value.value,
            }))}
            shouldExpandNode={allExpanded}
          />
        </div>
      )}
    </>
  );
};

export default function SearchInputField({
  smartTags,
  debug,
  initialValues,
}: {
  smartTags: SmartTagField[];
  debug?: boolean;
  initialValues: SmartTagOptionArgument[];
}) {
  return (
    <SmartTag.SearchContextProvider
      smartTags={smartTags}
      initialValues={initialValues}
    >
      <SearchInputComponent debug={!!debug} />
    </SmartTag.SearchContextProvider>
  );
}
