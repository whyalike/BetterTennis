import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import '../css/styles.css';

const Landing = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <link
        href='https://fonts.googleapis.com/css?family=Montserrat|Ubuntu'
        rel='stylesheet'
      />
      <div className='dark-overlay'>
        <div class='container' className='landing-inner' id='intro'>
          <div class='box'>
            <h1 className='x-large text-center'>BetterTennis</h1>
            <p className='lead'>Better tennis begins here.</p>
            <a
              href='https://github.com/whyalike/BetterTennis'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i class='fab fa-3x fa-github'></i>
            </a>
            <div class='sphere'>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
              <i_s></i_s>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
