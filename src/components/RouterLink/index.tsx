// Importa o componente Link da biblioteca react-router
import { Link } from 'react-router';

// Define os tipos (TypeScript) das props que o componente RouterLink vai receber
type RouterLinkProps = {
  // 'children' é qualquer conteúdo React que ficará dentro do Link (texto, ícones, etc.)
  children: React.ReactNode;

  // 'href' é a URL para onde o link vai redirecionar
  href: string;

  // '& React.ComponentProps<'a'>' permite que o componente aceite todas as propriedades
  // padrão de uma tag <a> (como target, rel, className, style, etc.)
} & React.ComponentProps<'a'>;

// Cria um componente de link que faz navegação interna no React Router
export function RouterLink({ children, href, ...props }: RouterLinkProps) {
  return (
    // Usa o componente <Link> do React Router, que permite navegação SPA (sem recarregar a página)
    // 'to={href}' define o destino do link
    // '...props' espalha qualquer outra prop extra (como className, target, etc.)
    <Link to={href} {...props}>
      {/* Renderiza o conteúdo passado dentro do Link */}
      {children}
    </Link>
  );
}
