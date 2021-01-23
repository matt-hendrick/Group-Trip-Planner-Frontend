import colorAssignment from './colorAssignment';

const loggedInUserHandle = 'johndoe';
let members = ['johndoe', 'janedoe', 'jimdoe'];
let userHandle = 'johndoe';
let output = 'primary';

describe('colorAssingment function', () => {
  it('colorAssignment should return "primary" when given a userHandle that is the same as the logged in userHandle', () => {
    expect(colorAssignment(loggedInUserHandle, members, userHandle)).toEqual(
      output
    );
  });

  it(`colorAssignment should return "#00c853" when the userHandle  is different from the loggedInUserHandle and
   the userHandle is the second item in the members array (after the removal of the loggedInUserHandle)`, () => {
    userHandle = 'jimdoe';
    output = '#00c853';
    expect(colorAssignment(loggedInUserHandle, members, userHandle)).toEqual(
      output
    );
  });
  it('colorAssignment should return "primary" if no members are in the array', () => {
    members = [];
    output = 'primary';
    expect(colorAssignment(loggedInUserHandle, members, userHandle)).toEqual(
      output
    );
  });
});
