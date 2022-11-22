import purple from "../../assets/purple.png";
import styles from "./Welcome.module.css";

const Welcome = () => {
  return (
    <section className={styles.starting}>
      <h1>Why you should choose us?</h1>
      <div className={styles.welcomeSection}>
        <ol>
          <li>
            Committed to savings: Buying your insurance online is just one way
            to save! Happily Insured by Mariya offers many ways to save
            including discounts for fire alarms, multiple vehicles, bundling
            home and car and more.
          </li>
          <li>
            Coverage that fits: Personalized coverage recommendations so you can
            feel confident your coverage fits your needs.
          </li>
          <li>
            Here for you when it matters most: With our insurance, you'll get
            outstanding customer service with claims support 24/7.
          </li>
        </ol>
      </div>
      <div className={styles["main-image"]}>
        <img src={purple} alt="purple logo insurance" />
      </div>
    </section>
  );
};

export default Welcome;
