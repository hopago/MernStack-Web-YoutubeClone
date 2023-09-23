import styled from "styled-components"
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from 'axios';


const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Cards = ({ fetchType, type }) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`videos/${fetchType}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [fetchType]);

  return (
    <Container>
      {videos.map(video => (
        <Card key={video._id} type={type} video={video} />
      ))}
    </Container>
  )
}

export default Cards
