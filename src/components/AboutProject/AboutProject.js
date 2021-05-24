import React from 'react';
import './AboutProject.css';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import { navTabData, aboutProjectDescription, aboutProjectSchedule } from '../../utils/constants';

const AboutProject = () => {
  return (
    <section id={navTabData[0].hash} className='about-project'>
      <Container
        additionalClass='about-project__container'
      >
        <SectionTitle>
          {navTabData[0].text}
        </SectionTitle>
        <ul className='about-project__list'>
          {
            aboutProjectDescription.map((item, index) => (
              <li className='about-project__item' key={index}>
                <h3 className='about-project__heading'>
                  {item.title}
                </h3>
                <p className='about-project__description'>
                  {item.description}
                </p>
              </li>
            ))
          }
        </ul>
        <dl className='about-project__schedule'>
          {
            aboutProjectSchedule.map((item, index) => (
              <div className={`about-project__wrap_${item.modifier}`} key={index}>
                <dt className={`about-project__duration about-project__duration_${item.modifier}`}>
                  {item.duration}
                </dt>
                <dd className='about-project__name'>
                  {item.name}
                </dd>
              </div>
            ))
          }
        </dl>
      </Container>
    </section>
  );
};

export default AboutProject;
