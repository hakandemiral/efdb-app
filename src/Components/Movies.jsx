import MovieList from "./MovieList";
import HeroSection from "./HeroSection";
import {useState} from "react";

const Movies = () => {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <HeroSection search={search} handleSearch={handleSearch}/>
            <MovieList search={search}/>
        </>
    )
};

export default Movies;