import {NavLink} from 'react-router-dom';

export default function ButtonLink(props) {
    const {text, url} = props;
    return (
        <NavLink to={url} activeClassName="active" className="btn navlink btn-block btn-outline-light" {...props}>{text}</NavLink>
    )
}
