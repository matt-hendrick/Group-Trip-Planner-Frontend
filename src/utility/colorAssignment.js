import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import brown from '@material-ui/core/colors/brown';

function colorAssignment(loggedInUserHandle, members, userHandle) {
  let color = 'primary';
  const colorArray = [
    'secondary',
    green['A700'],
    purple['A700'],
    indigo['A700'],
    yellow['A700'],
    teal['A700'],
    red['A700'],
    blue['A700'],
    pink['A700'],
    grey['A700'],
    brown['A700'],
  ];
  const currentUserIndex = members ? members.indexOf(loggedInUserHandle) : 0;
  let membersList = [...members];
  if (membersList.includes(loggedInUserHandle))
    membersList.splice(currentUserIndex, 1);
  if (userHandle !== loggedInUserHandle) {
    const otherUserIndex = membersList.indexOf(userHandle);
    if (otherUserIndex < 7) {
      color = colorArray[otherUserIndex];
    }
  }
  return color;
}

export default colorAssignment;
