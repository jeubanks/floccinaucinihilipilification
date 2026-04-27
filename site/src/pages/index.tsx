import type {ReactNode} from 'react';
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
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container text--left">
        <div className={styles.heroGrid}>
          <div>
            <div className={styles.kicker}>Blog + project tracker</div>
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <p className={styles.lead}>
              Keep a public trail of notes, milestones, and shipped work in one
              place. Use the blog for updates and the docs side for the current
              roadmap.
            </p>
            <div className={styles.buttons}>
              <Link className="button button--secondary button--lg" to="/docs/intro">
                Open tracker
              </Link>
              <Link className="button button--outline button--lg" to="/blog">
                Read updates
              </Link>
            </div>
          </div>
          <div className={styles.panel}>
            <div className={styles.panelLabel}>This week</div>
            <ul className={styles.panelList}>
              <li>Capture decisions as short posts.</li>
              <li>Track active work in docs pages.</li>
              <li>Move finished items into the archive.</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="A blog and project tracker built with Docusaurus.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
