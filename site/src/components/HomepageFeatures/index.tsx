import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
  eyebrow: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Blog posts',
    eyebrow: 'Writing',
    description: (
      <>
        Ship short updates, weekly notes, and launch posts without building a
        separate publishing stack.
      </>
    ),
  },
  {
    title: 'Project tracker',
    eyebrow: 'Planning',
    description: (
      <>
        Keep a live status page for what is active, what is blocked, and what
        has shipped already.
      </>
    ),
  },
  {
    title: 'Docs that stay useful',
    eyebrow: 'Reference',
    description: (
      <>
        Use docs pages for roadmaps, decisions, and the current state of the
        work so the site stays searchable and current.
      </>
    ),
  },
];

function Feature({title, eyebrow, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCard)}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <div className={styles.content}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
