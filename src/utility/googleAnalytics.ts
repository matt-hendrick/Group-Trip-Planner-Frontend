const googleAnalytics = () => {
  if (window.gtag && process.env.REACT_APP_FIREBASE_MEASUREMENT_ID) {
    window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
      page_title: document.title,
      page_path: window.location.pathname + window.location.search,
    });
  }
};

export default googleAnalytics;
