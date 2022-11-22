import React from "react";

import sad from "../../assets/sad.webp";
import styles from "./NotFoundPage.module.css";

const NotFound = () => (
  <div className={styles.notFoundPage}>
    <h1>Page not found</h1>
    <p>
      If you came upon this page by mistake, try checking the URL in your web
      browser.
    </p>
    <div className={styles["main-image"]}>
      <img src={sad} alt="sadness character from the disney movie" />
    </div>
  </div>
);

export default NotFound;
