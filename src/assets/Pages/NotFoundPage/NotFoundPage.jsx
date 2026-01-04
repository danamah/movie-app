import { NavLink } from 'react-router';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.errorIcon}>
        <i className="bi bi-camera-reels-off"></i>
      </div>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.heading}>Page Not Found</h2>
      <p className={styles.description}>
        Oops! The movie reel seems to have broken. The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <NavLink to="/home" className={styles.homeBtn}>
        <i className="bi bi-house-door-fill"></i>
        Go Back Home
      </NavLink>
    </div>
  )
}
