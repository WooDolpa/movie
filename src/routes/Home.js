import React from "react";
import axios from "axios";
import Movie from "../component/Movie";
import "./Home.css";

class Home extends React.Component {
    // 해당 컴포넌트가 마운트될때 로딩중 상태로 하기위한 초기화
    state = {
        isLoading: true,
        movies: [],
    };

    getMovies = async () => {
        const {
            data: {
                data: { movies },
            },
        } = await axios.get(
            "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
        );
        this.setState({ movies, isLoading: false });
    };

    // 영화 데이터 가져오기
    componentDidMount() {
        this.getMovies();
    }

    render() {
        const { isLoading, movies } = this.state;
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                ) : (
                    <div className="movies">
                        {movies.map((movie) => (
                            <Movie
                                key={movie.id}
                                id={movie.id}
                                year={movie.year}
                                title={movie.title}
                                summary={movie.summary}
                                poster={movie.medium_cover_image}
                                genres={movie.genres}
                            />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}

export default Home;
