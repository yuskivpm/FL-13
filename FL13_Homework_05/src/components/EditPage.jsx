import React, { useState } from 'react';
import { LabeledInput, LabeledTextArea } from './LabeledInputs';
import './EditPage.css';

const EMPTY_ITEM = {
  title: '',
  description: '',
  duration: '',
  authors: '',
};

const leadingZero = (number) => (number < 10 ? `0${number}` : number);

const getDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${leadingZero(now.getMonth())}-${leadingZero(now.getDate())}`;
};

const stringToInputDate = (stringDate) =>
  stringDate && stringDate.length === 8
    ? `20${stringDate.substring(6, 8)}-${stringDate.substring(3, 5)}-${stringDate.substring(0, 2)}`
    : getDate();

const inputDateToString = (inputDate) =>
  `${inputDate.substring(8, 10)}.${inputDate.substring(5, 7)}.${inputDate.substring(2, 4)}`;

const EditPage = (props) => {
  const { editItem = { ...EMPTY_ITEM }, onSave, onCancel } = props;
  editItem.startDate = stringToInputDate(editItem.startDate);
  const isEditPage = editItem.id === undefined;
  const [item, setItem] = useState(editItem);
  const { title, description, duration, authors, startDate } = item;
  const handleChange = (event) => {
    item[event.target.name] = event.target.value;
    setItem({ ...item });
  };
  const invalidData = () => !title || !description || !duration || !authors || !startDate;
  return (
    <div className="editor-page">
      <h2 className="editor-header">{isEditPage ? 'Edit' : 'Add course'}</h2>
      <LabeledInput
        labelClassName="editor-label title-label"
        labelText="Title *"
        id="title-input"
        name="title"
        className="editor-input"
        value={title}
        hasBreak="1"
        onChange={handleChange}
      />
      <br />
      <LabeledTextArea
        labelClassName="editor-label description-label"
        labelText="Description *"
        id="description-input"
        name="description"
        className="editor-textarea"
        value={description}
        hasBreak="1"
        onChange={handleChange}
      />
      <br />
      <div className="row">
        <div className="col">
          <LabeledInput
            labelClassName="editor-label duration-label"
            labelText="Duration *"
            id="duration-input"
            name="duration"
            className="editor-input"
            value={duration}
            hasBreak="1"
            onChange={handleChange}
          />
          <br />
          <LabeledInput
            labelClassName="editor-label authors-label"
            labelText="Authors *"
            id="authors-input"
            name="authors"
            className="editor-input"
            value={authors}
            hasBreak="1"
            onChange={handleChange}
          />
        </div>
        <div>
          <LabeledInput
            labelClassName="editor-label date-label"
            labelText="Date *"
            id="date-input"
            type="date"
            name="startDate"
            className="editor-input"
            value={startDate}
            hasBreak="1"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <input
          type="button"
          className="submit-button button"
          value="Save"
          disabled={invalidData()}
          onClick={() => onSave({ ...item, startDate: inputDateToString(item.startDate) })}
        />
        <input type="button" className="cancel-button button" value="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
};

export default EditPage;
