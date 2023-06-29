import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Page } from './components/Page'
import Layout from './components/Layout'
import { Admin } from './components/Admin'
import './App.css'

export const FIREBASE = "https://homework-63-zakir-bikbov-default-rtdb.europe-west1.firebasedatabase.app/"

export type TPagesProps = {
	load: React.Dispatch<React.SetStateAction<boolean>>
	pageId: string
}

function App() {
	const [isLoading, setIsloading] = useState(false)
	const [pageId, setPageId] = useState('-NZ5JT-afoyIvxcP5iyY')

	return (
		<Routes>
			<Route element={<Layout isLoad={isLoading} setPageId={setPageId} />}>
				<Route path="/" element={<Page load={setIsloading} pageId={pageId} />} />
				<Route path="/bio" element={<Page load={setIsloading} pageId={pageId} />} />
				<Route path="/contact" element={<Page load={setIsloading} pageId={pageId} />} />
				<Route path="/faq" element={<Page load={setIsloading} pageId={pageId} />} />
				<Route path="/games" element={<Page load={setIsloading} pageId={pageId} />} />
				<Route path="/admin" element={<Admin load={setIsloading} />} />
			</Route>
		</Routes >
	)
}

export default App
