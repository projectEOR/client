import './NavBar.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

function NavBar() {

  const cookies = new Cookies();
  const userId = cookies.get('userId');

  const renderProfileLink = () => {
    if (userId) {
      return <Link to="/profile">Profile</Link>;
    } else {
      return <Link to="/login">Login</Link>
    }
  }

  return (
    <>
      <ul>
        <li>
          <Link to="/">Organization</Link>
        </li>
        <li>
          <Link to="/tracker">Eval Tracker</Link>
        </li>
        <li>
          <Link to="/builder">Bullet Builder</Link>
        </li>
        <li>
          {renderProfileLink()}
        </li>
        
      </ul>

      <hr />
    </>
  );
}

export default NavBar;
