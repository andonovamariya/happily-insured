import { Link } from "react-router-dom";

import styles from "./Insurances.module.css";

const InsuranceItem = (props) => {
  return (
    <li className={styles.insuranceItem}>
      <h2 className="italicFont">{props.title}</h2>
      <Link className="link" to={`/insurances/${props.id}`}>
        View more
      </Link>
    </li>
  );
};

export default InsuranceItem;
