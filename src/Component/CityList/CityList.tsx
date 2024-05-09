import {Alert, Divider, List, ListItem, ListItemText} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {City, Country} from "../../App";
import {Fragment, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import s from './list.module.css'
interface CityListProps {
    cities: City[];
    onClick: (city: City) => void;
}

export function CityList({ cities, onClick }: CityListProps) {
    const navigate = useNavigate();

    const handleClick = (city: City) => {
        onClick(city);
        navigate(`/country/${city.name.common}`);
    };

    return (
        <List className={s.list} aria-label="mailbox folders">
            {cities.map((city: City) => (
                <Fragment key={city.name.common}>
                    <ListItem className={s.listItem}>
                        <ListItemText onClick={() => handleClick(city)} primary={city.name.common} />
                    </ListItem>
                    <Divider component="li" />
                </Fragment>
            ))}
        </List>
    );
}

export function CountryInfo() {
    const { name } = useParams();
    const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();
    const [error, setError] = useState<AxiosError | undefined>();

    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/name/${name}`)
            .then(response => {
                setSelectedCountry(response.data[0]);
            })
            .catch((error: AxiosError) => {
                setError(error);
            });
    }, [name]);

    if (!selectedCountry) return null;

    return (
        <>
            <List className={s.list} aria-label="mailbox folders">
                <ListItem>{name}</ListItem>
                <ListItem>
                    <ListItemText primary={`Official name: ${selectedCountry.name.official}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Capital: ${selectedCountry.capital}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Population: ${selectedCountry.population}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Continents: ${selectedCountry.continents}`} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={`Languages: ${Object.values(selectedCountry.languages).join(", ")}`}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`startOfWeek: ${selectedCountry.startOfWeek}`} />
                </ListItem>
                <ListItem>
                    <img src={selectedCountry.flags.png} alt="" />
                </ListItem>
                <Divider component="li" />
            </List>
            {error && <Alert severity="error">{error.message}</Alert>}
        </>
    );
}