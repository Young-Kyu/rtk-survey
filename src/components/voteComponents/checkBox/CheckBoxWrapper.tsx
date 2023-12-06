import React, { useState, useEffect, useRef, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react'
import { S_CheckboxWrapper } from '../../../styles/checkBox/S_Checkbox';
import { SelectableOptionDTO } from '../../../types/SurveyResponse.type';
import CheckBox from './CheckBox';


interface CheckBoxWrapperProps {

  renderItem: Array<SelectableOptionDTO>;
  onCheckHandler?: (itemId: Pick<SelectableOptionDTO, 'id'>) => void;
  currentStatus: number[];

}


const CheckBoxWrapper = forwardRef((props: CheckBoxWrapperProps, ref): JSX.Element => {

  const { renderItem, currentStatus } = props;
  const [checkStatus, setCheckStatus] = useState<Array<number>>([]);

  useEffect(() => {
    setCheckStatus(currentStatus);
  }, [currentStatus]);

  useImperativeHandle(ref, () => ({
    getValues: () => checkStatus,
    clearValues: clearBoxStatus,
  }));

  const onChangeBoxStatus = (itemId: number) => {
    const itemIndex = checkStatus.indexOf(itemId);
    let copyArray = [...checkStatus];
    /* 추가 */
    if (itemIndex < 0) {
      copyArray.push(itemId);
    } else {
      /* 삭제 */
      copyArray.splice(itemIndex, 1);
    }
    setCheckStatus(copyArray)
  }

  const clearBoxStatus = () => {
    setCheckStatus([]);
  }

  const checkPrevStatus = (itemId: number): boolean => {
    if (!currentStatus) return false;
    return currentStatus.indexOf(itemId) !== -1;
  }
  return (
    <S_CheckboxWrapper>
      {renderItem.map((e, idx) => {
        return (
          <CheckBox
            prevStatus={checkPrevStatus(e.id)}
            text={e.text}
            itemId={e.id}
            changeBoxStatus={onChangeBoxStatus}
            key={`${e.id}-${idx}`}
          />
        )
      })}
    </S_CheckboxWrapper>
  );


});
export default CheckBoxWrapper;