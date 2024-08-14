const NotFound = () => {
  return (
    <div
      className="bacgroundWraoer"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/404.svg)`,
        height: "auto",
      }}
    />
  );
};

export default NotFound;
