import { AccountCircleOutlined, SearchOutlined, VideoCallOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Upload from "./Upload";


const Container = styled.div`
  position: sticky;
  top: 0px;
  background-color: ${({theme}) => theme.bgLighter};
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;
const Search = styled.div`
  width: 50%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({theme}) => theme.text};
`;
const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  width: 75%;
  color: ${({theme}) => theme.text};
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #32a6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 300;
  color: ${({theme}) => theme.text};
`;
const Avatar = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-color: #999;
  object-fit: cover;
`;

const Navbar = () => {

  const { currentUser } = useSelector(state => state.user);

  const [open, setOpen] = useState(false);

  const [q, setQ] = useState();

  const navigate = useNavigate();

  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input 
            placeholder="Search..." 
            onChange={e => setQ(e.target.value)} 
          />
          <SearchOutlined style={{ cursor: "pointer" }} onClick={() => navigate(`/search?q=${q}`)} />
        </Search>
        {currentUser ? (
          <User>
            <VideoCallOutlined 
              onClick={() => setOpen(true)} 
              style={{ cursor: "pointer" }} 
            />
            <Avatar src={currentUser.img} />
            {currentUser.name}
          </User>
        ) : (
          <Link to="/signin" className="link">
            <Button>
              <AccountCircleOutlined />
              SIGN IN
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen} />}
    </>
  );
}

export default Navbar
