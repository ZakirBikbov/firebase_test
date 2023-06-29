import { FC, ReactElement, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FIREBASE } from '../containers/AppContainer'
import { TNavList } from '../containers/AppContainer'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from "react-draft-wysiwyg"
import axios from 'axios'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

type TAdminProps = {
    load: React.Dispatch<React.SetStateAction<boolean>>,
    pages: TNavList
}

export const Admin: FC<TAdminProps> = ({ load, pages }): ReactElement => {
    const [mounted, setMounted] = useState(false);
    const [currentPageId, setCurrentPageId] = useState('home')
    const [title, setTitle] = useState('')
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    )

    const getContent = async () => {
        load(true)
        const { data } = await axios.get(`${FIREBASE}content/${currentPageId}.json`)
        if (data) {
            let content = convertFromRaw(JSON.parse(data.content))
            setEditorState(EditorState.createWithContent(content))
        }
        load(false)
    }

    let navigate = useNavigate()

    const changePage = async () => {
        load(true)
        if (editorState !== null && editorState !== undefined && mounted) {
            const contentState = editorState.getCurrentContent()
            const content = JSON.stringify(convertToRaw(contentState))
            await axios.put(`${FIREBASE}content/${currentPageId}.json`, { content })
            await axios.patch(`${FIREBASE}pages/${currentPageId}.json`, { title })
        }
        load(false)
        if (mounted) {
            navigate(pages.filter(page => page.id === currentPageId)[0].path)
        }
    }

    useEffect(() => {
        setMounted(true)
        getContent()
        return () => {
            setMounted(false);
        }
    }, [])

    useEffect(() => {
        if (pages.length !== 0) {
            setTitle(pages.filter(page => page.id === currentPageId)[0].title)
            getContent().then().catch(e => console.error(e))
        }
    }, [currentPageId])

    return (
        <>
            <div className="admin-panel-block">
                <label htmlFor="">Select page</label>
                <select onChange={e => setCurrentPageId(e.target.value)}>
                    {pages.length !== 0 && 
                        <>
                            <option value='home'>{pages.filter(p => p.id === "home")[0].title}</option>
                            <option value='bio'>{pages.filter(p => p.id === "bio")[0].title}</option>
                            <option value='contact'>{pages.filter(p => p.id === "contact")[0].title}</option>
                            <option value='faq'>{pages.filter(p => p.id === "faq")[0].title}</option>
                            <option value='games'>{pages.filter(p => p.id === "games")[0].title}</option>
                        </>
                    }
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