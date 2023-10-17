import logo from "./logo.png";

function Logo({ dimension = 100, hideOnMobile = false }) {
  return (
    <img
      className={hideOnMobile ? "hide-on-mobile" : ""}
      src={logo}
      alt="logotype"
      style={{
        width: `${dimension}px`,
        height: `${dimension}px`,
        padding: `20px`,
      }}
    />
  );
}

export default Logo;
