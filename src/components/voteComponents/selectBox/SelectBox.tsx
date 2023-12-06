import React, { useState, useEffect, useRef, useCallback, useMemo, ChangeEvent, forwardRef, useImperativeHandle } from 'react'
import { SelectableOptionDTO } from '../../../types/SurveyResponse.type';


interface SelectBoxProps {

  optionItems: Array<SelectableOptionDTO>;
  selectedOption: number[];
}


const SelectBox = forwardRef((props: SelectBoxProps, ref): JSX.Element => {

  const { optionItems, selectedOption } = props;
  const [checkStatus, setCheckStatus] = useState<number>(0);

  const selectRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => checkStatus,
    clearValues: clearValue,
  }))

  useEffect(() => {
    setCheckStatus(selectedOption ? selectedOption[0] : optionItems[0].id)
  }, [selectedOption, optionItems]);

  const onChangeSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCheckStatus(parseInt(value));
  };

  const clearValue = () => {
    if (!selectRef.current) return;
    selectRef.current.value = '';
  }

  return (
    <select onChange={onChangeSelection} ref={selectRef}>
      {optionItems.map((item, idx) => {
        return (
          <option
            value={item.id}
            selected={checkStatus === item.id}
            key={`${item.id}-${idx}`}
          >
            {item.text}
          </option>
        )
      })}
    </select>
  );


});
export default SelectBox;