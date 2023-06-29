import { FC, ReactElement } from 'react'

export const Footer: FC = (): ReactElement => {
    return (
        <footer>
            <div className="container">
                <div className="site-copyright">
                    Copyright © 2023 Drew Karpyshyn. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}