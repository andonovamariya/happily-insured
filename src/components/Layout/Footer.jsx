import styles from "./Footer.module.css";
import mailIcon from "../../assets/mailIcon.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>You can connect with me via email</h3>
      <img src={mailIcon} alt="mail icon" className={styles.icon} />
      <p>andonova.mariya22@gmail.com or stu1901561002@uni.plovdiv.bg</p>
    </footer>
  );
};

export default Footer;
