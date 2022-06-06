import React, { useRef } from 'react';
import '../App.css';

interface PinInputGridProps {
  onPinChanged: (pinEntry: number | undefined, index: number) => void;
  pin: (number | undefined)[];
  pinLength: number;
}

const PinInputGrid: React.FC<PinInputGridProps> = ({
  pinLength,
  pin,
  onPinChanged,
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const changePinFocus = (pinIndex: number) => {
    const ref = inputRefs.current[pinIndex];
    if (ref) {
      ref.focus();
    }
  };

  const PIN_MIN_VALUE = 0;
  const PIN_MAX_VALUE = 9;
  const BACKSPACE_KEY = 'Backspace';

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;
    const pinNumber = Number(value.trim());
    if (isNaN(pinNumber) || value.length === 0) {
      return;
    }
    if (pinNumber >= PIN_MIN_VALUE && pinNumber <= PIN_MAX_VALUE) {
      onPinChanged(pinNumber, index);
      if (index < pinLength - 1) {
        changePinFocus(index + 1);
      }
    }
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const keyboardkeyCode = event.nativeEvent.code;
    if (keyboardkeyCode !== BACKSPACE_KEY) {
      return;
    }
    if (pin[index] === undefined) {
      changePinFocus(index - 1);
    } else {
      onPinChanged(undefined, index);
    }
  };

  return (
    <>
      {Array.from({ length: pinLength }, (_, index) => {
        return (
          <input
            key={index}
            value={pin[index] || ''}
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            className='pinInput'
            onKeyDown={(event) => onKeyDown(event, index)}
            onChange={(event) => onChange(event, index)}
          />
        );
      })}
    </>
  );
};

export default PinInputGrid;
