import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './module/home/Home';
import Blogs from './module/blogs/Blogs';
import Contact from './module/contact/Contact';
import NoPage from './module/nopage/NoPage';

import Layout from './Layout';
import './App.css';

class App extends React.Component {

	render() {
		return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home homeprop="prop test" onClick={() => {
							console.log('home clicked');
						}} />} />
						<Route path="blogs" element={<Blogs />} />
						<Route path="contact" element={<Contact />} />
					</Route>
					<Route path="*" element={<NoPage />} />
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;
