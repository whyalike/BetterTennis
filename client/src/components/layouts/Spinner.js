/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
// Load gif
import React, {Fragment} from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{width: '200px', margin: 'auto', display: 'block'}}
    />
  </Fragment>
);
