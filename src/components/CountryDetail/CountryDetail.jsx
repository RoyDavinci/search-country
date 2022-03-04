import React, { useState, useEffect } from "react";
import "./countrydetail.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useGlobalContext } from "../../Context";

const CountryDetail = () => {
	const [countryDetail, setCountryDetail] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const { detail } = useParams();
	const { dark } = useGlobalContext();

	useEffect(() => {
		const getSingleCountry = async () => {
			try {
				let { data } = await axios.get(
					`https://restcountries.com/v3.1/name/${detail}`
				);

				setCountryDetail(data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};
		getSingleCountry();

		return () => {
			console.log("cleared");
		};
	}, [detail]);

	return (
		<div className={dark ? "countryDetail light" : "countryDetail"}>
			{isLoading ? (
				<div className='oval'>
					<Oval color='#00BFFF' height={120} width={120} />
				</div>
			) : error ? (
				<h2 className='error'>{error}</h2>
			) : (
				<>
					<Link className='back' to='/'>
						<i className='fa-solid fa-arrow-left-long'></i> back
					</Link>
					<div className='countryDetails'>
						<img src={countryDetail[0].flags.png} alt='' />
						<div className='countryDetails-container'>
							<div className='countryDetails-containerPersonal'>
								<section>
									<h1>{countryDetail[0].name.common}</h1>
									<p>
										<strong>Native Name : </strong>{" "}
										<span>
											{Object.values(countryDetail[0].name.nativeName)[0].common
												? Object.values(countryDetail[0].name.nativeName)[0]
														.common
												: ""}
										</span>
									</p>
									<p>
										<strong>Population : </strong> {countryDetail[0].population}
									</p>
									<p>
										<strong>Region : </strong> {countryDetail[0].region}{" "}
									</p>
									<p>
										<strong>Sub-Region : </strong> {countryDetail[0].subregion}{" "}
									</p>
									<p>
										<strong>Capital : </strong> {countryDetail[0].capital[0]}{" "}
									</p>
								</section>
							</div>
							<div className='countryDetails-containerDomain'>
								<p>
									<strong>Top Level Domain : </strong> {countryDetail[0].tld[0]}{" "}
								</p>
								<p>
									<strong>Currencies : </strong>{" "}
									{Object.values(countryDetail[0].currencies)[0].name
										? Object.values(countryDetail[0].currencies)[0].name
										: ""}
								</p>
								<p>
									<strong>Languages : </strong>{" "}
									{Object.keys(countryDetail[0].languages).map(
										(language, index) => {
											return (
												<span className='language-span' key={index}>
													{language}
												</span>
											);
										}
									)}
								</p>
								<div className='border'>
									<p>Border Countries:</p>
									<p className='border-span'>
										{countryDetail[0].borders
											? countryDetail[0].borders.map((border, index) => {
													return (
														<span
															key={index}
															className={dark ? "span dark" : "span"}
														>
															{border}
														</span>
													);
											  })
											: "No Borders"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CountryDetail;
