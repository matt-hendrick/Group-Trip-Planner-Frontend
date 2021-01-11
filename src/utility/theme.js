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
    logoImage: {
      margin: '20px auto 20px auto',
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
    progress: {
      position: 'absolute',
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
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%',
        },
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
      },
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
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer',
        },
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
    cover: {
      minWidth: 200,
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
      padding: '5px',
    },
    itineraryDeleteButton: {
      left: '70%',
      padding: '0px',
    },
    zoomButton: {
      padding: '0px',
    },
    marker: {
      padding: '0px',
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
      left: '91%',
      top: '6%',
    },
    commentImage: {
      maxWidth: '100%',
      height: 100,
      objectFit: 'cover',
      borderRadius: '50%',
    },
    commentData: {
      marginLeft: 20,
      marginRight: 20,
      padding: 10,
    },
    header: {
      marginBottom: 10,
      padding: 10,
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
