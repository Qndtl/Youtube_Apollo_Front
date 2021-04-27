
import "../styles/Button.css";

const Button = ({ text, color = "black", onClick }) => {
  return (
    <div className="button" style={{ border: `5px solid ${color}`, color }} onClick={onClick}>{text}</div>
  )
}

export default Button;