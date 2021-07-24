import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addExperience} from '../../actions/profile';

const AddExperience = ({addExperience, history}) => {
  const [formData, setFormData] = useState({
    place: '', // place : place
    name: '', // name : name
    location: '',
    from: '',
    to: '',
    current: false,
    details: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {place, name, location, from, to, current, details} = formData;

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  return (
    <Fragment>
      <h1 class='large text-primary'>Add An Experience</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any tennis competitions you have
        been apart of!
      </p>
      <small>* = required field</small>
      <form
        class='form'
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Rank'
            name='place'
            required
            value={place}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Name'
            name='name'
            required
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Location'
            name='location'
            required
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value={current}
              checked={current}
              onChange={(e) => {
                setFormData({...formData, current: !current}); // Toggle current
                toggleDisabled(!toDateDisabled); // Toggle toDateDisabled
              }}
            />{' '}
            Currently Playing
          </p>
        </div>
        <div class='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div class='form-group'>
          <textarea
            name='details'
            cols='30'
            rows='5'
            placeholder='Competition Details'
            value={details}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <Link class='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, {addExperience})(withRouter(AddExperience));
