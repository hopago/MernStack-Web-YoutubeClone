import styled from "styled-components"
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from 'firebase/auth';


const Container = styled.div`
    height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${({theme}) => theme.text};
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({theme}) => theme.bgLighter};
    border: 1px solid ${({theme}) => theme.soft};
    color: ${({theme}) => theme.text};
    padding: 11px 24px;
    gap: 15px;
`;
const Title = styled.h1`
    font-size: 24px;
`;
const SubTitle = styled.h2`
    font-size: 14px;
    font-weight: 400;
`;
const Input = styled.input`
    border: 1px solid ${({theme}) => theme.soft};
    color: ${({theme}) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    width: 100%;
`;
const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({theme}) => theme.soft};
    color: ${({theme}) => theme.textSoft};
`;
const More = styled.div`
    display: flex;
    font-size: 12px;
    color: ${({theme}) => theme.textSoft};
    margin-top: 20px;
`;
const Links = styled.div`
    margin-left: 25px;
`;
const Link = styled.span`
    margin-left: 30px;
`;

const SignIn = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { currentUser } = useSelector(state => state.user);

    const handleSignIn = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("auth/signin", { name, password});
            dispatch(loginSuccess(res.data));
            currentUser && navigate('/');
        } catch (err) {
            dispatch(loginFailure());
        }
    };

    const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
        .then(async (result) => {
            await axios.post("/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL
            })
            .then(res => dispatch(loginSuccess(res.data)))
        })
        .then(navigate('/'))
        .catch(err => dispatch(loginFailure()));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

    };

  return (
    <Container>
        <Wrapper>
            <Title>Sign In</Title>
            <SubTitle>to HOTUBE</SubTitle>
            <Input placeholder="UserName" onChange={e => setName(e.target.value)} />
            <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <Button onClick={(e) => handleSignIn(e)}>Sign In</Button>
            <SubTitle>OR</SubTitle>
            <Button onClick={signInWithGoogle}>SignIn with Google</Button>
            <SubTitle>OR</SubTitle>
            <Input placeholder="UserName" onChange={e => setName(e.target.value)} />
            <Input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <Button onClick={(e) => handleSignUp(e)}>Sign Up</Button>
        </Wrapper>
        <More>
            English(USA)
            <Links>
              <Link>Help</Link>
              <Link>Privacy</Link>
              <Link>Contact</Link>
            </Links>
        </More>
    </Container>
  )
}

export default SignIn
