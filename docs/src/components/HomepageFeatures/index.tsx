import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Visual Flow Designer',
    icon: '🎨',
    description: (
      <>
        Design conversation flows with an intuitive visual interface. 
        Create nodes, add options, and connect flows without any coding required.
      </>
    ),
  },
  {
    title: 'Live Chat Preview',
    icon: '💬',
    description: (
      <>
        Test your flows with the built-in chat simulator. 
        Experience conversations exactly as your users will before implementation.
      </>
    ),
  },
  {
    title: 'JSON Export',
    icon: '📦',
    description: (
      <>
        Export flows as clean, structured JSON data. 
        Integrate with any chatbot framework, platform, or custom implementation.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.feature}>
        <div className={styles.featureIcon}>
          <span>{icon}</span>
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" className={styles.featuresTitle}>
            Everything you need to design chatbot flows
          </Heading>
          <p className={styles.featuresSubtitle}>
            A complete visual design tool for conversation flow creation
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
