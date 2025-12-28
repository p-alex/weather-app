interface Props {
  title: string;
}

function Header({ title }: Props) {
  return (
    <header className="w-full text-center py-12 sm:py-16">
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
