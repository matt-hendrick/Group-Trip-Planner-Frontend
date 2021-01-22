import reducer, { initialState } from './errorsReducer';
import * as types from '../types';

describe('errorsReducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      errors: '',
    });
  });

  it('setErrors should add an error message to the error state', () => {
    const payload = { error: 'an error message' };
    expect(
      reducer(initialState, {
        type: types.SET_ERRORS,
        ...initialState,
        payload,
      })
    ).toEqual({
      errors: { error: 'an error message' },
    });
  });

  it('clearErrors should return the initial state (meaning no errors)', () => {
    expect(
      reducer(initialState, {
        type: types.CLEAR_ERRORS,
        ...initialState,
        errors: '',
      })
    ).toEqual({
      errors: '',
    });
  });
});
