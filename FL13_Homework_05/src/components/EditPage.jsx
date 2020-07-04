import React, { useState } from 'react';
import { LabeledInput, LabeledTextArea } from './LabeledInputs';
import { EDITOR_LABEL } from '../utils/constants';
import './EditPage.css';

const EMPTY_ITEM = {
  title: '',
  description: '',
  duration: '',
  authors: '',
};

const leadingZero = (number) => (number < 10 ? `0${number}` : number);

const getDate = (now = new Date()) =>
  `${now.getFullYear()}-${leadingZero(now.getMonth())}-${leadingZero(now.getDate())}`;

const stringToInputDate = (stringDate) =>
  stringDate && stringDate.length === 8
    ? `20${stringDate.substring(6, 8)}-${stringDate.substring(3, 5)}-${stringDate.substring(0, 2)}`
    : getDate();

const inputDateToString = (inputDate) =>
  `${inputDate.substring(8, 10)}.${inputDate.substring(5, 7)}.${inputDate.substring(2, 4)}`;

const EditPage = ({ editItem = { ...EMPTY_ITEM }, onSave, onCancel }) => {
  const isEditPage = editItem.id === undefined;
  const [item, setItem] = useState({
    ...editItem,
    date: stringToInputDate(editItem.date),
  });
  const { title, description, duration, authors, date } = item;
  const handleChange = ({ target: { name, value } }) => {
    item[name] = value;
    setItem({ ...item });
  };
  const smartLabel = (name, value, InputType = LabeledInput, additionalProps = {}) => (
    <InputType
      labelClassName={`${EDITOR_LABEL} ${name}-label`}
      labelText={`${name[0].toUpperCase()}${name.slice(1)} *`}
      id={`${name}-input`}
      name={name}
      className="editor-input"
      value={value}
      hasBreak="1"
      onChange={handleChange}
      {...additionalProps}
    />
  );
  const invalidData = () => !title || !description || !duration || !authors || !date;
  return (
    <div className="editor-page">
      <h2 className="editor-header">{`${isEditPage ? 'Edit' : 'Add'} course`}</h2>
      {smartLabel('title', title)}
      <br />
      {smartLabel('description', description, LabeledTextArea, { className: 'editor-textarea' })}
      <br />
      <div className="row">
        <div className="col">
          {smartLabel('duration', duration)}
          <br />
          {smartLabel('authors', authors)}
        </div>
        <div>{smartLabel('date', date, LabeledInput, { type: 'date' })}</div>
      </div>
      <div className="row">
        <input
          type="button"
          className="submit-button button"
          value="Save"
          disabled={invalidData()}
          onClick={() => onSave({ ...item, date: inputDateToString(item.date) })}
        />
        <input type="button" className="cancel-button button" value="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
};

export default EditPage;
