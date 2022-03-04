import "./App.css";
import React, { useEffect } from "react";
import Country from "./components/Country/Country";
import CountryDetail from "./components/CountryDetail/CountryDetail.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "./Context";

function App() {
	const { handledDisplay, dark } = useGlobalContext();

	useEffect(() => {
		if (dark) {
			document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
		} else {
			document.body.style.backgroundColor = "hsl(0, 0%, 93%)";
		}
	}, [dark]);

	return (
		<div className='App'>
			<header className={dark ? "dark" : ""}>
				<h4>Where in the world?</h4>
				<div className='mode' onClick={handledDisplay}>
					{dark ? (
						<>
							<i className='fa-solid fa-sun'></i>
							<p>Light Mode</p>
						</>
					) : (
						<>
							<i className='fa-solid fa-moon'></i>
							<p>Dark Mode</p>
						</>
					)}
				</div>
			</header>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Country dark={dark} />}></Route>
					<Route
						path='/:detail'
						element={<CountryDetail dark={dark} />}
					></Route>
				</Routes>
			</BrowserRouter>
			,
		</div>
	);
}

export default App;
