const theme = {
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff',
    },
  },
  classes: {
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: 'center',
    },
    pageTitle: {
      margin: '10px auto 10px auto',
      color: '#00bcd4',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      marginTop: 20,
      position: 'relative',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20,
    },
    paper: {
      padding: 20,
      marginBottom: 20,
    },
    profile: {
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle',
        },
        '& a': {
          color: '#00bcd4',
        },
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0',
      },
    },
    map: {
      height: '50vh',
    },
    card: {
      display: 'flex',
      marginBottom: 20,
    },
    cardContent: {
      width: '100%',
      flexDirection: 'column',
      padding: 25,
    },
    content: {
      width: '85%',
      padding: 25,
      objectFit: 'cover',
    },
    date: {
      height: 14,
      width: 100,
      backgroundColor: 'rgba(0,0,0, 0.3)',
      marginBottom: 10,
    },
    fullLine: {
      height: 15,
      width: '90%',
      backgroundColor: 'rgba(0,0,0, 0.6)',
      marginBottom: 10,
    },
    halfLine: {
      height: 15,
      width: '50%',
      backgroundColor: 'rgba(0,0,0, 0.6)',
      marginBottom: 10,
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
    deleteButton: {
      left: '90%',
      padding: '0px',
    },
    itineraryDeleteButton: {
      left: '50%',
      padding: '0px',
    },
    noPaddingButton: {
      padding: '0px',
      transform: `translate(-10px,-20px)`,
    },
    pins: {
      padding: '0px',
      transform: `translate(-10px,-20px)`,
    },
    submitButton: {
      position: 'relative',
      float: 'right',
      marginTop: 10,
    },
    centeredButton: {
      display: 'block',
      margin: '0 auto',
    },
    inviteButton: {
      position: 'relative',
      left: '10%',
    },
    progressSpinner: {
      position: 'absolute',
    },
    closeButton: {
      position: 'absolute',
      left: '89%',
      top: '6%',
    },
    listData: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    itemHandleAndDate: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    header: {
      marginBottom: 10,
      padding: 10,
      textAlign: 'center',
    },
    tripHeader: {
      marginBottom: 10,
      padding: 10,
      display: 'flex',
    },
    tripHeaderText: {
      textAlign: 'center',
    },
    itineraryList: {
      listStyle: 'none',
      paddingLeft: 0,
    },
    itineraryListItem: {
      display: 'flex',
      alignItems: 'center',
      border: 'solid 2px #d0d0d0',
      borderRadius: '.2em',
      padding: '.5em .8em .5em .5em',
      marginBottom: '1em',
      backgroundColor: '#fff',
      maxWidth: '100%',
    },
  },
};

export default theme;
