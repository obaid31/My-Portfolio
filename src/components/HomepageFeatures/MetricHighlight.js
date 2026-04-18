import React from 'react';
import styles from './styles.module.css';

export default function MetricHighlight({ value, label }) {
  return (
    <div className={styles.metricCard}>
      <span className={styles.metricValue}>{value}</span>
      <span className={styles.metricLabel}>{label}</span>
    </div>
  );
}