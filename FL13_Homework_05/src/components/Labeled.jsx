import React from 'react';

const Labeled = (Inner) => (props) => {
  const { labelClassName, labelText, id, hasBreak, ...innerProps } = props;
  return (
    <>
      <label className={labelClassName} htmlFor={id}>
        {labelText}
      </label>
      {hasBreak ? <br /> : null}
      <Inner id={id} {...innerProps} />
    </>
  );
};

export default Labeled;
