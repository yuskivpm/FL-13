import React from 'react';
import Labeled from './Labeled';

const Input = (props) => <input type="text" {...props} />;
const TextArea = (props) => <textarea {...props} />;

export const LabeledInput = Labeled(Input);
export const LabeledTextArea = Labeled(TextArea);
