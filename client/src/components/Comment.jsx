import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from 'timeago.js';
import { baseReq } from "../axiosURL";


const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0px;
`;
const Avatar = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
`;
const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const Title = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: ${({theme}) => theme.text};
`;
const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({theme}) => theme.textSoft};
    margin-left: 5px;
`;
const Text = styled.div`
    font-size: 14px;
    color: ${({theme}) => theme.text};
`;

const Comment = ({ comment }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchComment = async () => {
            const res = await baseReq.get(`/users/find/${comment?.userId}`);
            console.log(res.data);
            setUser(res.data);
        };
        fetchComment();
    }, [comment.userId]);

  return (
    <Container>
        <Avatar src={user.img} />
        <Details>
            <Title>{user.name} <Date>{format(comment.createdAt)}</Date></Title>
            <Text>{comment.desc}</Text>
        </Details>
    </Container>
  )
}

export default Comment
