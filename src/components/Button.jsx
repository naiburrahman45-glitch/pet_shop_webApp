import { Link } from "react-router-dom";
export default function Button({children,to,onClick,type="button",variant="primary",className=""}) {
  const cls=`btn btn-${variant} ${className}`;
  return to ? <Link className={cls} to={to}>{children}</Link> : <button className={cls} onClick={onClick} type={type}>{children}</button>;
}