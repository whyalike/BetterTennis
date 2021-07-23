import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// import {connect} from 'react-redux';

export const Experience = ({experience}) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.name}</td>
      <td className='hide-sm'>{exp.place}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        )}
      </td>
      <td className='hide-sm'>{exp.location}</td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th className='hide-sm'>Rank</th>
            <th className='hide-sm'>Date</th>
            <th className='hide-sm'>Location</th>

            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
