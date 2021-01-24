// import React from 'react';
// import { render, screen } from '../../utility/reduxTestUtils';
// import { MemoryRouter } from 'react-router-dom';
// import Pins from './Pins';

// describe('Pins tests', () => {
//   it('Properly renders Pins if passed tripinfo', () => {
//     const pins = [
//       {
//         createdAt: '2020-12-31T22:06:07.402Z',
//         coordinates: [-7.29, 54.59],
//         address: 'Omagh, Omagh, Northern Ireland, United Kingdom',
//         tripID: 'MlPuDgZccsfJyX2DeUYI',
//         comment: null,
//         userHandle: 'johndoe',
//         pinID: 'SWFmdtWFmE0ZQAiMrPYt',
//       },
//     ];
//     const { getByRole, getByText } = render(
//       <MemoryRouter>
//         <Pins pins={pins} />
//       </MemoryRouter>,
//       {
//         initialState: {
//           user: { credentials: { handle: 'johndoe' } },
//           trip: { trip: { members: ['johndoe', 'janedoe'] } },
//         },
//       }
//     );
//     screen.debug();
//     expect(getByRole('link', { name: /example trip/i })).toBeInTheDocument();
//     expect(getByRole('button', { name: /delete trip/i })).toBeInTheDocument();
//     expect(getByText(/by johndoe/i)).toBeInTheDocument();
//     expect(getByText(/members: johndoe, janedoe/i)).toBeInTheDocument();
//   });
// });
