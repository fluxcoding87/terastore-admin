const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-tl from-black/80 to-black">
      {children}
    </div>
  );
};

export default AuthLayout;
