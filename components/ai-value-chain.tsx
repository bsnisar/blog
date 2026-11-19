import styles from './ai-value-chain.module.css'

const stages = [
  { name: 'Nvidia', product: 'Hardware revenue', value: '$4.00', period: 'one-time', margin: '75% gross margin', detail: 'On $1 of cost of goods sold' },
  { name: 'SpaceXAI', product: 'Compute revenue', value: '$8.6', period: 'per year', margin: '≈83% margin', detail: 'After depreciation + power', note: 'Assumes a 5-year hardware life' },
  { name: 'Anthropic', product: 'Model revenue', value: '$17.8', period: 'per year', margin: '85% serving margin', detail: '52% after all compute' },
  { name: 'Customers', product: 'Value created · assumed', value: '$36–178', period: 'per year', margin: '2–10× model spend', detail: 'Assumed benefit, not margin' },
]

export function AIValueChain() {
  return (
    <figure className={styles.figure} id="ai-value-chain" aria-labelledby="value-chain-title">
      <header className={styles.header}>
        <h3 id="value-chain-title">What $1 of Nvidia cost supports</h3>
        <p>Hardware becomes compute, intelligence, then customer value.</p>
      </header>
      <div className={styles.chain}>
        {stages.map((stage, index) => (
          <div className={styles.stage} key={stage.name}>
            <h4>{stage.name}</h4>
            <p className={styles.product}>{stage.product}</p>
            <div className={styles.revenue}><strong>{stage.value}</strong><span>{stage.period}</span></div>
            <p className={styles.margin}>{stage.margin}</p>
            <p className={styles.detail}>{stage.detail}</p>
            {stage.note ? <p className={styles.note}>{stage.note}</p> : null}
            {index < stages.length - 1 ? <svg className={styles.arrow} width="24" height="18" viewBox="0 0 24 18" aria-hidden="true"><path d="M23 9H2m7-7L2 9l7 7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg> : null}
          </div>
        ))}
      </div>
      <figcaption className={styles.caption}>
        Illustrative model, adapted from All-In. Hardware revenue is one-time; downstream figures are annual. Margins use different cost bases. Customer value is assumed.
      </figcaption>
    </figure>
  )
}
