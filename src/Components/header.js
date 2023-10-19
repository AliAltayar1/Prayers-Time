import "../App.css";

export default function Header() {
  return (
    <div className="main-header">
      <div className="burger-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h3>Main Page</h3>
      <h3 className="lang">EN</h3>
    </div>
  );
}
