import { useEffect, useState } from "react";
import styled from "styled-components";
import { baseReq } from "../axiosURL";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;  
`;

const Search = () => {

    const [videos, setVideos] = useState([]);

    const query = useLocation().search;

    console.log(query);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await baseReq.get(`videos/search${query}`)
            setVideos(res.data);
        };
        fetchVideos();
    }, [query]);

  return (
    <Container>
        {videos.map(video => (
            <Card key={video.id} video={video} />
        ))}
    </Container>
  )
}

export default Search
