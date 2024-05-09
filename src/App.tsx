import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Alert} from "@mui/material";
import {CityList, CountryInfo} from "./Component/CityList/CityList";

export interface City {
    name: {
        common: string;
    };
}

export interface Country {
    name: {
        common: string;
        official: string;
    };
    capital: string;
    population: number;
    continents: string[];
    languages: {
        [key: string]: string;
    };
    startOfWeek: string;
    flags: {
        png: string;
    };
}

export function App() {
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<City | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCities(response.data);
            })
            .catch(error => setError(error));
    }, []);

    const onClickHandler = (city: City) => {
        setSelectedCountry(city);
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<CityList cities={cities} onClick={onClickHandler} />} />
                <Route path="/country/:name" element={<CountryInfo />} />
            </Routes>
            {error && <Alert severity="error">{error.message}</Alert>}
        </div>
    );
}