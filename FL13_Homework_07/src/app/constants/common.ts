import { Validators } from '@angular/forms';

import { NewsSource } from '../interfaces/NewsSource';

// routes
export const NEWS_LIST_BASE_URL = 'list';
export const NEWS_ADD_BASE_URL = 'add';
export const NEWS_VIEW_BASE_URL = 'view';

// url params
export const PARAM_SOURCE_ID = 'sourceId';
export const PARAM_NEWS_ID = 'id';

// all news list item
export const ALL_SOURCES: NewsSource = { id: 0, name: 'All sources' };

// full-view-component
export const FULL_VIEW_FAIL_LOAD_DATA = 'Fail load data';

// empty source item
export const EMPTY_SOURCE: NewsSource = { id: 0, name: '' };

// validators
const VALIDATOR_MIN_NAME_LENGTH = 2;
const VALIDATOR_MIN_DESCRIPTION_LENGTH = 4;
const VALIDATOR_URL_PATTERN = '^http.?://.{2,}.{2,}';
const MIN_LENGTH_WARNING = 'Field require at least';
export const FORM_COMPONENTS = {
  heading: [
    `${MIN_LENGTH_WARNING} ${VALIDATOR_MIN_NAME_LENGTH} characters`,
    [Validators.required, Validators.minLength(VALIDATOR_MIN_NAME_LENGTH)],
  ],
  description: [
    `${MIN_LENGTH_WARNING} ${VALIDATOR_MIN_DESCRIPTION_LENGTH} characters`,
    [
      Validators.required,
      Validators.minLength(VALIDATOR_MIN_DESCRIPTION_LENGTH),
    ],
  ],
  content: [
    `${MIN_LENGTH_WARNING} ${VALIDATOR_MIN_DESCRIPTION_LENGTH} characters`,
    [
      Validators.required,
      Validators.minLength(VALIDATOR_MIN_DESCRIPTION_LENGTH),
    ],
  ],
  date: ['Field is required', Validators.required],
  author: [
    `${MIN_LENGTH_WARNING} ${VALIDATOR_MIN_NAME_LENGTH} characters`,
    [Validators.required, Validators.minLength(VALIDATOR_MIN_NAME_LENGTH)],
  ],
  imageUrl: [
    'URL is required',
    [Validators.required, Validators.pattern(VALIDATOR_URL_PATTERN)],
  ],
};
