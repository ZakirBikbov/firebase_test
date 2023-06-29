import { FC, ReactElement, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FIREBASE, TPagesProps } from '../containers/AppContainer'
import draftToHtml from 'draftjs-to-html'
import axios from 'axios'

export type TPage = {
    title: string,
    content: string
}

export const Page: FC<TPagesProps> = ({ load }): ReactElement => {
    let location = useLocation()
    let pageId = location.pathname.substring(1)
    if(pageId === '') pageId = "home"
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')

    const getContent = async () => {
        load(true)
        const { data } = await axios.get(`${FIREBASE}content/${pageId}.json`)
        if (data) {
            const markup = draftToHtml(JSON.parse(data.content))
            setContent(markup)
        }
        load(false)
    };

    const getTitle = async () => {
        load(true)
        const { data } = await axios.get(`${FIREBASE}pages/${pageId}.json`)
        if (data) {
            setTitle(data.title)
        }
        load(false)
    }

    useEffect(() => {
        getTitle()
        getContent()
    }, [location])

    return (
        <>
            <h1>{title}</h1>
            <p dangerouslySetInnerHTML={{ __html: content }} />
        </>
    )
}