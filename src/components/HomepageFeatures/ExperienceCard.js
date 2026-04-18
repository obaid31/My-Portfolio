import React from 'react';
import styles from './styles.module.css';

export default function ExperienceCard({ company, role, duration, location, children }) {
  return (
    <div className={styles.experienceCard}>
      <div className={styles.experienceHeader}>
        <div>
          <h3 className={styles.experienceRole}>{role}</h3>
          <p className={styles.experienceCompany}>{company}</p>
        </div>
        <div className={styles.experienceMeta}>
          <span className={styles.experienceDuration}>{duration}</span>
          <span className={styles.experienceLocation}>📍 {location}</span>
        </div>
      </div>
      <div className={styles.experienceBody}>{children}</div>
    </div>
  );
}