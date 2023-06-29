import { FC, ReactElement } from 'react'
import { Outlet } from "react-router-dom"
import { Header } from './Header'
import { Footer } from './Footer'
import { TNavList } from '../containers/AppContainer'

type TLayoutProps = {
    isLoad: boolean,
    pages: TNavList
}

const Layout: FC<TLayoutProps> = ({ isLoad, pages }): ReactElement => {
    return (
        <>
            <Header pages={pages} />
            <main>
                {isLoad &&
                    <div className="loading">
                        <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                }
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Layout
