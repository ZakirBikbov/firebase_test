import { FC, ReactElement } from 'react'
import { Outlet } from "react-router-dom"
import { Header } from './Header'
import { Footer } from './Footer'

type TLayoutProps = {
    isLoad: boolean,
    setPageId: React.Dispatch<React.SetStateAction<string>>
}

const Layout: FC<TLayoutProps> = ({ isLoad, setPageId }): ReactElement => {
    return (
        <>
            <Header setPageId={setPageId} />
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
