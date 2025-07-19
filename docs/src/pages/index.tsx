import { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('npx @enumura/chatbot-flow-editor');
      setIsCopied(true);
      // Display end
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              GUI tool for designing chatbot conversation flows. Create, test, and export as JSON for any chatbot framework.
            </p>

            <div className={styles.quickStart}>
              <div className={styles.installCommand}>
                <span className={styles.commandPrefix}>$</span>
                <code>npx @enumura/chatbot-flow-editor</code>
                <button
                  className={clsx(styles.copyButton, {
                    [styles.copied]: isCopied
                  })}
                  onClick={handleCopy}
                  title={isCopied ? "Copied!" : "Copy command"}
                >
                  {isCopied ? '✅' : '📋'}
                </button>
              </div>
              <p className={styles.quickStartText}>
                🎨 Launch visual flow designer in your browser
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
                  <img
                    src="img/chatbot-flow-editor.webp"
                    alt="Chatbot Flow Editor Interface"
                    className={styles.screenshot}
                  />
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
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Visual Chatbot Flow Designer`}
      description="Design chatbot conversation flows with visual GUI tool. Create, test, and export JSON for any chatbot framework or platform.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />

        {/* What It Does Section */}
        <section className={styles.quickStartSection}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="text--center">
                  <Heading as="h2" className={styles.sectionTitle}>
                    Design First, Implement Later
                  </Heading>
                  <p className={styles.sectionSubtitle}>
                    This is a visual design tool, not a complete chatbot solution. Design your flows, export JSON.
                  </p>

                  <div className={styles.stepsContainer}>
                    <div className={styles.step}>
                      <div className={styles.stepNumber}>1</div>
                      <h4>Design Flows</h4>
                      <span>Create conversation paths visually</span>
                    </div>
                    <div className={styles.arrow}>→</div>
                    <div className={styles.step}>
                      <div className={styles.stepNumber}>2</div>
                      <h4>Test & Preview</h4>
                      <span>Simulate conversations in real-time</span>
                    </div>
                    <div className={styles.arrow}>→</div>
                    <div className={styles.step}>
                      <div className={styles.stepNumber}>3</div>
                      <h4>Export JSON</h4>
                      <span>Download structured flow data</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Tutorial Section */}
        <section className={styles.videoSection}>
          <div className="container">
            <div className="text--center margin-bottom--xl">
              <Heading as="h2" className={styles.sectionTitle}>
                See It In Action
              </Heading>
              <p className={styles.sectionSubtitle}>
                Watch this introduction to understand how Chatbot Flow Editor works
              </p>
            </div>
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className={styles.videoContainer}>
                  <iframe 
                    width="100%" 
                    height="400" 
                    src="https://www.youtube.com/embed/4wV240EaIPA?si=inZ6wGqkYxVzGsEC" 
                    title="Introduction to Chatbot Flow Editor" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JSON Export Section */}
        <section className={styles.useCasesSection}>
          <div className="container">
            <div className="text--center margin-bottom--xl">
              <Heading as="h2" className={styles.sectionTitle}>
                Export Structured Data
              </Heading>
              <p className={styles.sectionSubtitle}>
                Download your conversation flows as clean JSON format
              </p>
            </div>
            <div className="row">
              <div className="col col--4">
                <div className={styles.useCase}>
                  <div className={styles.useCaseIcon}>📋</div>
                  <h3>Structured Format</h3>
                  <p>Export flows as clean, well-structured JSON data with clear node relationships and options.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.useCase}>
                  <div className={styles.useCaseIcon}>💾</div>
                  <h3>Easy Export</h3>
                  <p>One-click export functionality to download your complete conversation flow design.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.useCase}>
                  <div className={styles.useCaseIcon}>🔄</div>
                  <h3>Import & Export</h3>
                  <p>Save your work and share flows with team members through JSON file exchange.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
