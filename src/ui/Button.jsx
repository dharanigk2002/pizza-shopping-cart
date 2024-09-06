/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3 sm:px-6 sm:py-4",
    small: base + " px-4 py-2 text-xs md:px-5 md:py-2.5",
    round: base + " px-2.5 py-1 text-xs md:px-3.5 md:py-2",
    secondary:
      base +
      " px-4 py-2.5 bg-stone-50 text-sm text-stone-400 focus:text-stone-800 focus:ring-stone-200 focus:ring-offset-2 hover:text-stone-800 sm:px-6 sm:py-3.5 hover:bg-stone-300 border-2 border-stone-300",
  };
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
