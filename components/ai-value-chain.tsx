import styles from './ai-value-chain.module.css'

function Breakdown({ margin, cost, label }: { margin: number; cost: string; label: string }) {
  return (
    <div className={styles.breakdown}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.retained} style={{ width: `${margin}%` }} />
        <span className={styles.cost} style={{ width: `${100 - margin}%` }} />
      </div>
      <div className={styles.barLabels}><span>{label}</span><span>{cost}</span></div>
    </div>
  )
}

export function AIValueChain() {
  return (
    <figure className={styles.figure} id="ai-value-chain" aria-labelledby="value-chain-title">
      <header className={styles.header}>
        <h3 id="value-chain-title">Where the margin comes from</h3>
        <p>Each layer sells a more useful form of the input it buys.</p>
      </header>
      <div className={styles.legend}><span><i className={styles.blueKey} />Margin under stated cost basis</span><span><i className={styles.grayKey} />Included costs</span></div>
      <div className={styles.stage}>
        <div className={styles.identity}><span className={styles.step}>01</span><div><h4>Hardware</h4><p>Nvidia · sells chips</p></div></div>
        <div className={styles.detail}>
          <div className={styles.metric}><strong>75%</strong><span>gross margin</span></div>
          <Breakdown margin={75} cost="25% cost of goods" label="75% gross profit" />
          <p className={styles.economics}>$1 production cost supports $4 of hardware revenue, once.</p>
        </div>
      </div>
      <div className={styles.stage}>
        <div className={styles.identity}><span className={styles.step}>02</span><div><h4>Compute</h4><p>SpaceXAI · rents capacity</p></div></div>
        <div className={styles.detail}>
          <div className={styles.metric}><strong>≈83%</strong><span>after depreciation + power</span></div>
          <Breakdown margin={83} cost="≈17% included costs" label="≈83% remaining" />
          <p className={styles.economics}>$8.6 annual revenue in the model. Assumes a five-year hardware life.</p>
        </div>
      </div>
      <div className={styles.stage}>
        <div className={styles.identity}><span className={styles.step}>03</span><div><h4>Intelligence</h4><p>Anthropic · sells model use</p></div></div>
        <div className={styles.detail}>
          <div className={styles.metric}><strong>85%</strong><span>serving-only gross margin</span></div>
          <Breakdown margin={85} cost="15% serving costs" label="85% before other compute" />
          <div className={styles.secondMetric}><strong>52%</strong><span>remaining after all compute</span></div>
          <Breakdown margin={52} cost="48% all compute" label="52% remaining" />
          <p className={styles.economics}>$17.8 annual revenue in the model. Broader compute costs reduce the share by 33 percentage points.</p>
        </div>
      </div>
      <div className={styles.stage}>
        <div className={styles.identity}><span className={styles.step}>04</span><div><h4>Completed work</h4><p>Customer · applies the output</p></div></div>
        <div className={styles.detail}>
          <div className={styles.metric}><strong>2–10×</strong><span>assumed value / model spend</span></div>
          <div className={styles.range} aria-hidden="true"><span>2×</span><span className={styles.rangeLine} /><span>10×</span></div>
          <p className={styles.economics}>$36–178 annual value in the model. A benefit estimate, not a customer margin.</p>
        </div>
      </div>
      <figcaption className={styles.caption}>
        <p>Different cost boundaries: these percentages are not directly comparable or additive. Bars each represent 100% of that layer’s revenue; customer value uses a separate scale.</p>
        <p>Original visualization based on the illustrative model shown on All-In. Revenue figures are normalized to $1 of Nvidia cost of goods; hardware revenue is one-time, downstream figures annual. Customer returns are assumptions.</p>
      </figcaption>
    </figure>
  )
}
