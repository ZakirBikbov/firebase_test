import { FC, ReactElement, useState, useEffect } from 'react'
import { FIREBASE } from '../App'
import { TNavList } from './Header'
import axios from 'axios'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

type TAdminProps = {
    load: React.Dispatch<React.SetStateAction<boolean>>
}

export const Admin: FC<TAdminProps> = ({ load }): ReactElement => {
    const [pages, setPages] = useState<TNavList>([])
    const [currentPageId, setCurrentPageId] = useState('-NZ5JT-afoyIvxcP5iyY')
    const [title, setTitle] = useState('')
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    )
    const getPages = async () => {
        load(true)
        const { data } = await axios.get(`${FIREBASE}pages.json`)
        if (data) {
            const dataList: TNavList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            setPages(dataList)
            setTitle(dataList.filter(page => page.id === currentPageId)[0].title)
        }
        load(false)
    }

    const getContent = async () => {
        load(true)
        const { data } = await axios.get(`${FIREBASE}content/${currentPageId}.json`)
        if (data) {
            let content = convertFromRaw(JSON.parse(data.content))
            setEditorState(EditorState.createWithContent(content))
        }
        load(false)
    }

    const changePage = async () => {
        load(true)
        if (editorState) {
            const contentState = editorState.getCurrentContent()
            const content = JSON.stringify(convertToRaw(contentState))
            await axios.put(`${FIREBASE}content/${currentPageId}.json`, { content })
            await axios.patch(`${FIREBASE}pages/${currentPageId}.json`, { title })
        }
        load(false)
    }

    useEffect(() => {
        getPages()
        getContent()
    }, [])

    useEffect(() => {
        if (pages.length === 0) {
            return
        }
        setTitle(pages.filter(page => page.id === currentPageId)[0].title)
        getContent().then().catch(e => console.error(e))
    }, [currentPageId])

    return (
        <>
            <div className="admin-panel-block">
                <label htmlFor="">Select page</label>
                <select onChange={e => setCurrentPageId(e.target.value)}>
                    {pages.map(page => <option key={page.id} value={page.id}>{page.title}</option>)}
                </select>
            </div>

            <div className="admin-panel-block">
                <label htmlFor="inputTitle">Title</label>
                <input id="inputTitle" type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="admin-panel-block">
                <label>Content</label>
                <div style={{ border: "1px solid #F1F1F1", minHeight: "6em", cursor: "text" }}>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={setEditorState}
                    />
                </div>
            </div>
            <div className="admin-panel-block">
                <button className="save-btn" onClick={changePage}>Save</button>
            </div>

        </>
    )
}