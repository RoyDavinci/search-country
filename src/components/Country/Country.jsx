import React, { useState, useEffect } from "react";
import "./country.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useGlobalContext } from "../../Context";

const Country = () => {
	const [country, setCountry] = useState([]);
	const [countries, setCountries] = useState([]);
	const [singleCountry, setSingleCountry] = useState([]);
	const [search, setSearch] = useState("");
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const { dark } = useGlobalContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let { data } = await axios.get(
				`https://restcountries.com/v3.1/name/${country}`
			);
			setCountry("");
			setSingleCountry(data);
			setLoading(false);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};

	const handleRegion = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			let { data } = await axios.get(
				`https://restcountries.com/v3.1/region/${search}`
			);
			setSingleCountry(data);
			setLoading(false);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};
	useEffect(() => {
		const fetchCountries = async () => {
			try {
				let { data } = await axios.get("https://restcountries.com/v2/all");
				setCountries(data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};
		fetchCountries();
	}, []);

	return (
		<div className='country-container'>
			{isLoading ? (
				<div className='oval'>
					<Oval color='#00BFFF' height={120} width={120} />
				</div>
			) : error ? (
				<h2 className='error'>{error}</h2>
			) : (
				<main>
					<div className='formCountry-container'>
						<div
							className={
								dark
									? "dark searchCountry-container"
									: "searchCountry-container"
							}
						>
							<form action='' onSubmit={handleSubmit}>
								<button type='submit'>
									<i
										className={dark ? "dark fa fa-search" : "fa fa-search"}
										aria-hidden='true'
									></i>
								</button>
								<input
									type='search'
									name=''
									value={country}
									onChange={(e) => setCountry(e.target.value)}
									id=''
									placeholder='Search for Country'
									className={dark ? "dark " : ""}
								/>
							</form>
						</div>
						<div className='selectCountry-container'>
							<form action='' className={dark ? "dark form" : "form"}>
								<select
									name=''
									id=''
									value={search || ""}
									onChange={(e) => setSearch(e.target.value)}
									className={dark ? "dark " : ""}
								>
									<option value=''>Filter by Region</option>
									<option value='Asia'>Asia</option>
									<option value='Africa'>Africa</option>
									<option value='America'>America</option>
									<option value='Europe'>Europe</option>
									<option value='Oceania'>Oceania</option>
								</select>
							</form>
							<button
								className={dark ? "dark form" : "form"}
								onClick={handleRegion}
							>
								Filter
							</button>
						</div>
					</div>
					{singleCountry.length > 0 ? (
						<div
							className={dark ? "dark countryContainer" : "countryContainer"}
						>
							{singleCountry.map((country, index) => {
								return (
									<div key={index} className='countryContainer'>
										<Link
											to={`/${country.name.common}`}
											className={dark ? "dark country" : "country"}
										>
											<img src={country.flags.svg} alt='' />
											<article className='countryContainerDetail'>
												<h1>{country?.name.common}</h1>
												<p>
													<strong>Population :</strong> {country.population}
												</p>
												<p>
													<strong>Region :</strong> {country.region}
												</p>
												<p>
													<strong>Capital :</strong>{" "}
													{country.capital ? country.capital[0] : ""}
												</p>
											</article>
										</Link>
									</div>
								);
							})}
						</div>
					) : (
						<div className='countryContainer'>
							{countries.map((country, index) => {
								return (
									<div key={index}>
										<Link
											to={`/${country.name}`}
											className={dark ? "dark country" : "country"}
										>
											<img src={country?.flags.svg} alt='' />
											<article className='countryContainerDetail'>
												<h1>{country.name}</h1>
												<p>
													<strong>Population :</strong> {country.population}
												</p>
												<p>
													<strong>Region :</strong> {country.region}
												</p>
												<p>
													<strong>Capital :</strong> {country.capital}
												</p>
											</article>
										</Link>
									</div>
								);
							})}
						</div>
					)}
				</main>
			)}
		</div>
	);
};

export default Country;
