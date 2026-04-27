import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {usePluginData} from '@docusaurus/useGlobalData';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function Terminal({children}: {children: ReactNode}) {
  return (
    <div className={styles.terminal}>
      <div className={styles.termBar}>
        <span className={styles.termDot} />
        <span className={styles.termDot} />
        <span className={styles.termDot} />
      </div>
      <div className={styles.termBody}>{children}</div>
    </div>
  );
}

function C({children}: {children: ReactNode}) {
  return <span className={styles.comment}>{children}</span>;
}

function A({children}: {children: ReactNode}) {
  return <span className={styles.accent}>{children}</span>;
}

function D({children}: {children: ReactNode}) {
  return <span className={styles.dim}>{children}</span>;
}

type RecentPost = {
  title: string;
  date: string | null;
  slug: string;
};

type Project = {
  name: string;
  description: string;
  status: string;
  url: string;
};

function ActiveProjects() {
  const {projects} = usePluginData('recent-blog-posts') as {
    projects: Project[];
  };

  const active = projects?.filter(p => p.status === 'active') || [];
  if (!active.length) return null;

  // Pad names to align descriptions
  const maxLen = Math.max(...active.map(p => p.name.length));

  return (
    <>
      <div className={styles.line}>&nbsp;</div>
      <div className={styles.line}><C># active projects</C></div>
      <div className={styles.line}>&nbsp;</div>
      {active.map((project) => (
        <div className={styles.line} key={project.name}>
          <Link to={project.url} className={styles.postLink}>
            <A>{project.name}</A>
          </Link>
          {' '.repeat(maxLen - project.name.length + 1)}
          {project.description}
        </div>
      ))}
    </>
  );
}

function RecentPosts() {
  const {recentPosts} = usePluginData('recent-blog-posts') as {
    recentPosts: RecentPost[];
  };

  if (!recentPosts?.length) return null;

  return (
    <>
      <div className={styles.line}>&nbsp;</div>
      <div className={styles.line}><C># recent posts</C></div>
      <div className={styles.line}>&nbsp;</div>
      {recentPosts.map((post) => (
        <div className={styles.line} key={post.slug}>
          <D>{post.date || '          '}</D>{'  '}
          <Link to={`/blog/${post.slug}`} className={styles.postLink}>
            {post.title}
          </Link>
        </div>
      ))}
    </>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="A blog and project tracker.">
      <main className={styles.page}>
        <Terminal>
          <div className={styles.line}><C># floccinaucinihilipilification</C></div>
          <div className={styles.line}>&nbsp;</div>
          <div className={styles.line}>
            <D>noun</D>  a 29-letter word meaning the act or habit
          </div>
          <div className={styles.line}>
            {'       '}of estimating something as worthless.
          </div>
          <div className={styles.line}>&nbsp;</div>
          <div className={styles.line}>
            A personal blog and project tracker.
          </div>
          <div className={styles.line}>&nbsp;</div>
          <div className={styles.line}><C># what's here</C></div>
          <div className={styles.line}>&nbsp;</div>
          <div className={styles.line}>
            <A>blog</A>     Short updates, notes, and retrospectives.
          </div>
          <div className={styles.line}>
            <A>tracker</A>  Current projects and status.
          </div>
          <ActiveProjects />
          <RecentPosts />
          <div className={styles.line}>&nbsp;</div>
          <div className={styles.line}><C># background</C></div>
          <div className={styles.line}>&nbsp;</div>
          <div className={styles.line}>
            X10 on a Tandy, Insteon, Z-Wave, Zigbee, Lutron,
          </div>
          <div className={styles.line}>
            Home Assistant, HomeSeer, Hubitat, RTI, ISY...
          </div>
          <div className={styles.line}>
            never completely happy with any of them.
          </div>
        </Terminal>

        <nav className={styles.links}>
          <Link to="/docs/intro">tracker</Link>
          <span className={styles.sep}>/</span>
          <Link to="/blog">blog</Link>
          <span className={styles.sep}>/</span>
          <a href="https://github.com/jeubanks/floccinaucinihilipilification">github</a>
        </nav>
      </main>
    </Layout>
  );
}
