import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import teal from '@material-ui/core/colors/teal';

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
  ];
  const currentUserIndex = members.indexOf(loggedInUserHandle);
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
