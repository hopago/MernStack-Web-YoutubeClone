import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { format } from 'timeago.js';
import axios from 'axios';
import { baseReq } from '../axiosURL';


const Container = styled.div`
    width: ${(props) => props.type !== "row" && '360px'};
    margin-bottom: ${(props) => props.type === "row" ? "25px" : "50px"};
    display: ${(props) => props.type === "row" && "flex"};
    row-gap: 10px;
`;
const Image = styled.img`
    width: 100%;
    height: ${(props) => props.type === "row" ? "100px" : "202px"};
    background-color: #999;
    object-fit: cover;
    border-radius: ${(props) => props.type === "row" ? "9px" : "18px"};
    cursor: pointer;
    flex: 1;
`;
const Details = styled.div`
    display: flex;
    margin-top: ${(props) => props.type === 'row' ? "0px" : "16px"};
    gap: 12px;
    flex: 1;
`;
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;  
  cursor: pointer;
  display: ${(props) => props.type === 'row' && 'none'};
`;
const Texts = styled.div`
    
`;
const Title = styled.h1`
    font-size: 16px;
    font-weight: bold;
    color: ${({theme}) => theme.text};
`;
const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({theme}) => theme.textSoft};
    margin: 10px 0px;
`;
const Info = styled.div`
    font-size: 14px;
    color: ${({theme}) => theme.textSoft};
`;

const Card = ({ video, type }) => {

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await baseReq.get(`users/find/${video.userId}`);
      setUser(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Container type={type}>
      <Link className="link" to={`video/${video._id}`}>
        <Image type={type} src={video.imgUrl} />
      </Link>
      <Details type={type}>
        <ChannelImage type={type} src={user.img ? user.img : ""} />
        <Texts>
          <Link className="link" to="/video/vId">
            <Title>{video.title}</Title>
          </Link>
          <ChannelName>{user.name}</ChannelName>
          <Info>
            {video.views} views | {format(video.createdAt)}
          </Info>
        </Texts>
      </Details>
    </Container>
  );
}

export default Card
