import styled from "styled-components"
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { baseReq } from "../axiosURL";
import { useSelector } from "react-redux";


const Container = styled.div`
    
`;
const NewComment = styled.div`
    display: flex;
    align-content: center;
    gap: 10px;
`;
const Avatar = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
`;
const Input = styled.input`
    border: none;
    outline: none;
    border-bottom: 1px solid ${({theme}) => theme.soft};
    background-color: transparent;
    color: ${({theme}) => theme.text};
    padding: 5px;
    width: 100%;
`;

const Comments = ({ videoId }) => {

    const { currentUser } = useSelector(state => state.user);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await baseReq.get(`comments/${videoId}`);
                setComments(res.data);
            } catch (err) {
                
            }
        };
        fetchComments();
    }, []);

  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser.img} />
            <Input placeholder="Comment..." />
        </NewComment>
        {comments.map(comment => (
            <Comment comment={comment} currentUser={currentUser} key={comment._id} />
        ))}
    </Container>
  )
}

export default Comments
