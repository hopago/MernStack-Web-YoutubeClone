import { useEffect, useState } from "react";
import styled from "styled-components"
import { baseReq } from "../axiosURL";
import Card from "./Card";


const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await baseReq.get(`/videos/tags?tags=${tags}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [tags]);

  return (
    <Container>
        {videos.map(video => (
            <Card key={video._id} video={video} type="row" />
        ))}
    </Container>
  )
}

export default Recommendation
