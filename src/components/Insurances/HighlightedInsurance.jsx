import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

import styles from "./Insurances.module.css";

const HighlightedInsurance = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const { loadedInsurance } = props;

  return (
    <>
      <div className={styles.highlightedInsurance}>
        <h3 className="italicFont">{loadedInsurance.title}</h3>
        <div className={styles.insuranceImg}>
          <img src={loadedInsurance.img} alt={loadedInsurance.title} />
        </div>
        <div className={styles.descriptionImg}>
          <img
            src={loadedInsurance.descriptionImg}
            alt={loadedInsurance.title}
          />
        </div>
        <h2>What you need to get a {loadedInsurance.title} quote? </h2>
        <div>
          To make getting a {loadedInsurance.title} quote effortless, make sure
          you have the following: <p>{loadedInsurance.description}</p>
        </div>
      </div>
      {params.insuranceId === "1" && (
        <div className="action">
          <Link className="link" to={`/insurances/getCarInsuranceQuote`}>
            Get quote
          </Link>
        </div>
      )}
      <Button
        className="goBackButton"
        type="button"
        onClick={() => navigate("/insurances")}
      >
        Go back
      </Button>
    </>
  );
};

export default HighlightedInsurance;
