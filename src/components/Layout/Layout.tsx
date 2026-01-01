interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <main className="w-full max-w-304 mx-auto mt-4 sm:mt-12 max-[1248px]:px-4">
      {children}
    </main>
  );
}

export default Layout;
