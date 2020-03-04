import React from 'react';

import Directory from '../../components/directory/directory.component';
import {HomePageContainer} from "./homepage.styles";
// import './homepage.styles.scss';

const HomePage = () => {
  // throw Error; // test ErrorBoundary

  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
    /*<div className='homepage'>
        <Directory />
    </div>*/
  );
};

export default HomePage;
