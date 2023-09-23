import styled from "styled-components"
import Cards from "../components/Cards";


const Container = styled.div`

`;

const Home = ({ type }) => {
  return (
    <Container>
        <Cards fetchType={type} type="column" />
    </Container>
  )
}

export default Home
