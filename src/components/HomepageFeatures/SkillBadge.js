import React from 'react';
import styles from './styles.module.css';

export default function SkillBadge({ children }) {
  return (
    <span className={styles.skillBadge}>{children}</span>
  );
}