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
        Drag, drop, and connect nodes to create complex chatbot logic without coding.
      </>
    ),
  },
  {
    title: 'Test Preview',
    icon: '💬',
    description: (
      <>
        Test your flows with the built-in chat simulator. 
        Experience realistic conversations just like your users will.
      </>
    ),
  },
  {
    title: 'Export Ready',
    icon: '📦',
    description: (
      <>
        Export flows as clean JSON structure. 
        Use with any chatbot framework or custom implementation.
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
            Everything you need to design chatbots
          </Heading>
          <p className={styles.featuresSubtitle}>
            From concept to implementation in minutes, not hours
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
