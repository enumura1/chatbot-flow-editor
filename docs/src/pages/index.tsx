import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            
            <div className={styles.quickStart}>
              <div className={styles.installCommand}>
                <span className={styles.commandPrefix}>$</span>
                <code>npx chatbot-flow-editor</code>
                <button 
                  className={styles.copyButton}
                  onClick={() => navigator.clipboard.writeText('npx chatbot-flow-editor')}
                  title="Copy command"
                >
                  📋
                </button>
              </div>
              <p className={styles.quickStartText}>
                🚀 Launch instantly in your browser
              </p>
            </div>

            <div className={styles.heroButtons}>
              <Link
                className={clsx('button button--primary button--lg', styles.ctaButton)}
                to="/docs/getting-started">
                Get Started
              </Link>
              <Link
                className={clsx('button button--outline button--lg', styles.secondaryButton)}
                to="https://github.com/enumura1/chatbot-flow-editor">
                View on GitHub
              </Link>
            </div>
          </div>
          
          <div className={styles.heroImage}>
            <div className={styles.mockupContainer}>
              <div className={styles.browserMockup}>
                <div className={styles.browserHeader}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>
                <div className={styles.browserContent}>
                  <div className={styles.editorPreview}>
                    <div className={styles.nodePreview}>
                      <div className={styles.node}>💬</div>
                      <div className={styles.connector}></div>
                      <div className={styles.node}>❓</div>
                      <div className={styles.connector}></div>
                      <div className={styles.node}>✅</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Visual Chatbot Flow Designer`}
      description="Create, test, and export chatbot conversation flows with our visual development tool. No coding required.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        
        {/* Quick Start Section */}
        <section className={styles.quickStartSection}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="text--center">
                  <Heading as="h2" className={styles.sectionTitle}>
                    Ready in seconds
                  </Heading>
                  <p className={styles.sectionSubtitle}>
                    No installation required. Just run one command and start designing.
                  </p>
                  
                  <div className={styles.stepsContainer}>
                    <div className={styles.step}>
                      <div className={styles.stepNumber}>1</div>
                      <h4>Install</h4>
                      <code>npm install --save-dev chatbot-flow-editor</code>
                    </div>
                    <div className={styles.arrow}>→</div>
                    <div className={styles.step}>
                      <div className={styles.stepNumber}>2</div>
                      <h4>Launch</h4>
                      <code>npx chatbot-flow-editor</code>
                    </div>
                    <div className={styles.arrow}>→</div>
                    <div className={styles.step}>
                      <div className={styles.stepNumber}>3</div>
                      <h4>Design</h4>
                      <span>Create your flows visually</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className={styles.useCasesSection}>
          <div className="container">
            <div className="text--center margin-bottom--xl">
              <Heading as="h2" className={styles.sectionTitle}>
                Perfect for every team
              </Heading>
            </div>
            <div className="row">
              <div className="col col--4">
                <div className={styles.useCase}>
                  <div className={styles.useCaseIcon}>👨‍💻</div>
                  <h3>Developers</h3>
                  <p>Design conversation flows before coding. Export JSON and integrate with any framework.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.useCase}>
                  <div className={styles.useCaseIcon}>📋</div>
                  <h3>Product Teams</h3>
                  <p>Plan and prototype chatbot interactions. No technical knowledge required.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.useCase}>
                  <div className={styles.useCaseIcon}>🎨</div>
                  <h3>Designers</h3>
                  <p>Create and test conversational user experiences with live preview.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
