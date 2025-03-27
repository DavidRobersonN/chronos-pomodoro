import { Heading } from './components/Heading';
import './styles/theme.css';
import './styles/global.css';

export function App() {
  console.log('Oi');
  return (
    <>
      <Heading attr={123}>Hello Word 1</Heading>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
        minima itaque animi veritatis nesciunt adipisci a inventore, soluta
        possimus exercitationem recusandae asperiores laborum eveniet quis,
        assumenda excepturi vitae molestias placeat.
      </p>
    </>
  );
}
