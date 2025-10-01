const Success = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        bg-green-500 
        text-white 
        text-sm 
        rounded-md 
        p-2
      "
    >
      {children}
    </div>
  );
};

export default Success;
