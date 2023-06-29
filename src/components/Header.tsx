import { FC, ReactElement, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FIREBASE } from '../App'
import axios from 'axios'

export type TNavList = {
    id: string,
    title: string,
    path: string
}[]

type THeaderProps = {
    setPageId: React.Dispatch<React.SetStateAction<string>>
}

export const Header: FC<THeaderProps> = ({ setPageId }): ReactElement => {
    const [navlist, setNavList] = useState<TNavList>([])
    const getTitles = async () => {
        const { data } = await axios.get(`${FIREBASE}pages.json`)
        if (data) {
            const pages: TNavList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            setNavList(pages)
        }
    }
    useEffect(() => {
        getTitles().then().catch(e=>console.error(e))
    }, [])
    return (
        <header>
            <div className="container">
                <ul className="nav-list">
                    {navlist.map(page => <li key={page.id}><NavLink onClick={()=>setPageId(page.id)} to={page.path}>{page.title}</NavLink></li>)}
                    <li><NavLink to="/admin">Admin</NavLink></li>
                </ul>
            </div>
        </header>
    )
}