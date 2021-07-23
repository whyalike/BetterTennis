import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';

const AddEducation = ({addEducation, history}) => {
  const [formData, setFormData] = useState({
    school: '', // place : place
    degree: '', // name : name
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    details: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {school, degree, fieldofstudy, from, to, current, details} = formData;

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  return (
    <Fragment>
      <h1 class='large text-primary'>Add Your Education</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add your schools
      </p>
      <small>* = required field</small>
      <form
        class='form'
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div class='form-group'>
          <input
            type='text'
            placeholder='* School'
            name='school'
            required
            value={school}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Degree'
            name='degree'
            required
            value={degree}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Field of Study'
            name='fieldofstudy'
            required
            value={fieldofstudy}
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
            Current Job
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, {addEducation})(AddEducation);
