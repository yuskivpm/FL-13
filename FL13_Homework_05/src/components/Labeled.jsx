import React from 'react';

const Labeled = (Inner) => ({ labelClassName, labelText, id, hasBreak, ...innerProps }) => (
  <>
    <label className={labelClassName} htmlFor={id}>
      {labelText}
    </label>
    {hasBreak ? <br /> : null}
    <Inner id={id} {...innerProps} />
  </>
);

export default Labeled;
