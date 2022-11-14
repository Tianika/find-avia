import { Link } from 'react-router-dom';
import { ROUTER_MAP } from '../../utils/constants';

const IndexPage = () => {
  return (
    <div>
      <Link to={ROUTER_MAP.avia}>Найти авиабилеты</Link>
    </div>
  );
};

export default IndexPage;
