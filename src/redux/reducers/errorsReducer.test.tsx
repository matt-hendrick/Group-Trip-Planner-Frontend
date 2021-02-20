import reducer, { initialState } from './errorsReducer';
import * as types from '../reduxTypes';

describe('errorsReducer tests', () => {
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
    const newState = { errors: { error: 'example error' } };
    expect(
      reducer(newState, {
        type: types.CLEAR_ERRORS,
        ...newState,
      })
    ).toEqual({
      errors: '',
    });
  });
});
