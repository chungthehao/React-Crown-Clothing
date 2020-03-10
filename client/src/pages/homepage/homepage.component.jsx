import React, { Profiler } from 'react';

import Directory from '../../components/directory/directory.component';
import {HomePageContainer} from "./homepage.styles";
// import './homepage.styles.scss';

const HomePage = () => {
  // throw Error; // test ErrorBoundary

  return (
    <HomePageContainer>
      <Profiler id='Directory'
                onRender={(id, phrase, actualDuration) => { console.log({id, phrase, actualDuration}) }}
      >
        <Directory />
      </Profiler>
    </HomePageContainer>
    /*<div className='homepage'>
        <Directory />
    </div>*/
  );
};

export default HomePage;
