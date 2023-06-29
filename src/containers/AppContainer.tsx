import { FC, ReactElement, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Page } from '../components/Page'
import Layout from '../components/Layout'
import { Admin } from '../components/Admin'
import axios from 'axios'

export const FIREBASE = "https://homework-63-zakir-bikbov-default-rtdb.europe-west1.firebasedatabase.app/"

export type TNavList = {
    id: string,
    title: string,
    path: string
}[]

export type TPagesProps = {
	load: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContainer: FC = (): ReactElement => {
	const [isLoading, setIsloading] = useState(false)
	const [pages, setPages] = useState<TNavList>([])

	const getPages = async () => {
		setIsloading(true)
        const { data } = await axios.get(`${FIREBASE}pages.json`)
        if (data) {
            const pages: TNavList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            setPages(pages)
        }
		setIsloading(false)
    }
    useEffect(() => {
        getPages().then().catch(e=>console.error(e))
    }, [])

	return (
		<Routes>
			<Route element={<Layout isLoad={isLoading} pages={pages} />}>
				<Route path="/" element={<Page load={setIsloading} />} />
				<Route path="/bio" element={<Page load={setIsloading} />} />
				<Route path="/contact" element={<Page load={setIsloading} />} />
				<Route path="/faq" element={<Page load={setIsloading} />} />
				<Route path="/games" element={<Page load={setIsloading} />} />
				<Route path="/admin" element={<Admin load={setIsloading} pages={pages} />} />
			</Route>
		</Routes >
	)
}
