import './styles/theme.css';
import './styles/global.css';
import { Container } from './components/Container';
import { Heading } from './components/Heading';
export function App() {
  return (
    <>
      <Container>
        <Heading>LOGO</Heading>
      </Container>

      <Container>
        <section>MENU</section>
      </Container>

      <Container>
        <section>TEXT</section>
      </Container>

      <Container>
        <section>FOOTER</section>
      </Container>
    </>
  );
}
