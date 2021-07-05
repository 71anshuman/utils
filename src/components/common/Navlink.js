import {NavLink} from 'react-router-dom';

export default function Navlink(props) {
    const {text, url} = props;
    return (
        <NavLink to={url} activeClassName="active" className="nav-link">{text}</NavLink>
    )
}
