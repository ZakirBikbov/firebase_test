import { FC, ReactElement, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FIREBASE, TPagesProps } from '../App'
import axios from 'axios'

export type TPage = {
    title: string,
    content: string
}

export const Page: FC<TPagesProps> = ({ load, pageId }): ReactElement => {
    let location = useLocation()
    let pathname = location.pathname.replace('/', '')
    let title = pathname.replace(/^\w/, (c) => c.toUpperCase())
    if(pathname === '') {
        title = "Home"
    }
    const [content, setContent] = useState<string>('')

    const getContent = async () => {
        load(true)
        const { data } = await axios.get(`${FIREBASE}content/${pageId}.json`)
        if(data) {
            setContent(data)
        }
        load(false)
    };

    useEffect(() => {
        getContent().then().catch(e => console.log(e))
    }, [location])

    return (
        <>
            <h2>{title}</h2>
            <p>{content}</p>
        </>
    )
}