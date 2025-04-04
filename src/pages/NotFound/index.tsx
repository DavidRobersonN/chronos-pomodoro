import { Container } from '../../components/Container';
import { GenericHtml } from '../../components/GenericHtml';
import { MainTemplate } from '../../templates/MainTemplate';

export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <GenericHtml>Página Não Encontrada</GenericHtml>
      </Container>
    </MainTemplate>
  );
}
