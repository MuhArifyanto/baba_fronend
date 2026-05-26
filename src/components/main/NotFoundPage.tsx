import { Link } from 'react-router-dom';
import "../../assets/style.css";

const NotFoundPage = () => {
    return (
      <div className="not-found-wrapper">
        <h1 className="title">404</h1>
        <h2 className="subtitle">Oops! The page you are looking for doesn't exist.</h2>
        <Link to="/" className="back-button">Go Back to Home</Link>
      </div>
    );
  };
  
export default NotFoundPage;