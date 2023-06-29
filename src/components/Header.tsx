import { FC, ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { TNavList } from '../containers/AppContainer'

type THeaderProps = {
    pages: TNavList
}

export const Header: FC<THeaderProps> = ({ pages }): ReactElement => {
    return (
        <header>
            <div className="container">
                <ul className="nav-list">
                    {pages.length !== 0 &&
                        <>
                            <li><NavLink to="/">{pages.filter(p => p.path === "/")[0].title}</NavLink></li>
                            <li><NavLink to="/bio">{pages.filter(p => p.path === "/bio")[0].title}</NavLink></li>
                            <li><NavLink to="/contact">{pages.filter(p => p.path === "/contact")[0].title}</NavLink></li>
                            <li><NavLink to="/faq">{pages.filter(p => p.path === "/faq")[0].title}</NavLink></li>
                            <li><NavLink to="/games">{pages.filter(p => p.path === "/games")[0].title}</NavLink></li>
                            <li><NavLink to="/admin">ADMIN</NavLink></li>
                        </>
                    }

                </ul>
            </div>
        </header>
    )
}