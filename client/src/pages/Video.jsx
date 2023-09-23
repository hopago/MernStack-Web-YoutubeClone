import { AddTaskOutlined, ReplayOutlined, ThumbDown, ThumbDownAltOutlined, ThumbUp, ThumbUpOutlined, Try } from '@mui/icons-material';
import styled from 'styled-components';
import Comments from '../components/Comments';
import Cards from '../components/Cards';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { videoFetchFailure, videoFetchStart, videoFetchSuccess, like, dislike } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { authReq, baseReq } from '../axiosURL';
import axios from 'axios';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';


const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div`
  
`;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.span`
  color: ${({theme}) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({theme}) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({theme}) => theme.soft};
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`
const ChannelDetails = styled.div`
  min-width: max-content;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.text};
  font-size: 12px;
`;
const Description = styled.p`
  line-height: 14px;
  font-weight: 300;
  font-size: 14px;
`;
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 5px;
  height: max-content;
  padding: 10px;
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector(state => state.video);
  const dispatch = useDispatch();

  const videoId = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      dispatch(videoFetchStart());
      try {
        const videoRes = await baseReq.get(`videos/find/${videoId}`);
        const channelRes = await baseReq.get(`users/find/${videoRes.data.userId}`);
        setChannel(channelRes.data);
        dispatch(videoFetchSuccess(videoRes.data));
      } catch (err) {
        dispatch(videoFetchFailure());
      }
    };
    fetchData();
  }, [videoId, dispatch]);

  const handleLike = async () => {
    await authReq.put("users/like/" + currentVideo._id);
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await authReq.put("users/dislike/" + currentVideo._id);
    dispatch(dislike(currentUser._id));
  };

  const handleSubscribe = async () => {
    currentUser.subscribedUsers.includes(channel._id)
    ? await authReq.put("users/unsub/" + channel._id)
    : await authReq.put("users/sub/" + channel._id);
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame
            controls
            src={currentVideo.videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></VideoFrame>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} | {format(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser._id) 
              ? <ThumbUp /> 
              : <ThumbUpOutlined />} {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser._id) 
              ? <ThumbDown /> 
              : <ThumbDownAltOutlined />} {currentVideo?.dislikes?.length}
            </Button>
            <Button>
              <ReplayOutlined /> Share
            </Button>
            <Button>
              <AddTaskOutlined /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetails>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers}</ChannelCounter>
              <Description>
                {currentVideo?.desc}
              </Description>
            </ChannelDetails>
          </ChannelInfo>
          <Subscribe style={{cursor:"pointer"}} onClick={handleSubscribe}>{
          currentUser.subscribedUsers?.includes(channel._id) 
          ? "Subscribed" 
          : "Subscribe"}</Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  );
}

export default Video
