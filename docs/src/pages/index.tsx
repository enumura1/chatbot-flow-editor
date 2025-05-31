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
            <p className={styles.heroSubtitle}>
              GUI tool for designing chatbot conversation flows. Create, test, and export as JSON for any chatbot framework.
            </p>
            
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
                    This is a visual design tool, not a complete chatbot solution. Design your flows, export JSON, integrate anywhere.
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
                    <div className={styles.arrow}>→</div>
                    <div className={styles.step}>
                      <div className={styles.stepNumber}>4</div>
                      <h4>Integrate</h4>
                      <span>Use in your chatbot platform</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Examples */}
        <section className={styles.useCasesSection}>
          <div className="container">
            <div className="text--center margin-bottom--xl">
              <Heading as="h2" className={styles.sectionTitle}>
                Integrates with Any Platform
              </Heading>
              <p className={styles.sectionSubtitle}>
                Export clean JSON structure compatible with popular frameworks
              </p>
            </div>
            <div className="row">
              <div className="col col--4">
                <div className={styles.useCase}>
                  <div className={styles.useCaseIcon}>🤖</div>
                  <h3>Bot Framework</h3>
                  <p>Microsoft Bot Framework, Botpress, Rasa - use the exported JSON to drive your bot logic.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.useCase}>
                  <div className={styles.useCaseIcon}>⚡</div>
                  <h3>Custom Code</h3>
                  <p>Build your own chatbot implementation using the structured flow data from the visual designer.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.useCase}>
                  <div className={styles.useCaseIcon}>🔧</div>
                  <h3>Any Platform</h3>
                  <p>The JSON output is framework-agnostic - adapt it to work with any chatbot platform or service.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Benefits */}
        <section className={styles.quickStartSection}>
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
                  <p>Design conversation flows before coding. Export structured JSON and integrate with any framework.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.useCase}>
                  <div className={styles.useCaseIcon}>📋</div>
                  <h3>Product Teams</h3>
                  <p>Plan and prototype chatbot interactions without technical knowledge. Collaborate on flow design.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.useCase}>
                  <div className={styles.useCaseIcon}>🎨</div>
                  <h3>UX Designers</h3>
                  <p>Create and test conversational user experiences with live preview before development.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
