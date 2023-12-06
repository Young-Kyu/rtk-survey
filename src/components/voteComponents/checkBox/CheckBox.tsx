import React, { useState, useEffect, useRef, useCallback, useMemo, ChangeEvent } from 'react'


interface CheckBoxProps {
  prevStatus: boolean;
  text: string;
  itemId: number;
  changeBoxStatus: (itemId: number) => void;
}


const CheckBox = (props: CheckBoxProps): JSX.Element => {
  const { prevStatus, text, itemId, changeBoxStatus } = props;
  const [status, setStatus] = useState<boolean>(false);

  useEffect(()=>{
    if(prevStatus !== status){
      setStatus(prevStatus);
    }
  },[prevStatus,text]);

  const onChangeBox = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.checked);
    changeBoxStatus(itemId);
  }
  return (
    <div>
      <input type="checkbox" id={text} value="coding" onChange={onChangeBox} checked={status} />
      <label htmlFor={text}>{text}</label>
    </div >
  );


}
export default React.memo(CheckBox);