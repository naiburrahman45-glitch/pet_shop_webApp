import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, ShoppingBag, X, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";

const links=[["Home","/"],["Shop","/shop"],["Categories","/categories"],["Vet & Care","/vet-care"],["Services","/services"],["About Us","/about"],["Contact","/contact"]];
export default function Navbar(){
  const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
  const {count,setDrawerOpen}=useCart();
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>20); window.addEventListener("scroll",f); return()=>window.removeEventListener("scroll",f)},[]);
  return <header className={`navbar ${scrolled?"scrolled":""}`}>
    <div className="container nav-inner">
      <Link to="/" className="brand" onClick={()=>setOpen(false)}><span className="brand-mark">P</span><span><b>Pet</b> Solution<small>Pet Shop & Vet Care</small></span></Link>
      <nav className={`nav-links ${open?"open":""}`}>{links.map(([label,path])=><NavLink key={path} to={path} end={path==="/"} onClick={()=>setOpen(false)}>{label}</NavLink>)}</nav>
      <div className="nav-actions"><button className="icon-btn" aria-label="Search" onClick={()=>window.location.href="/shop"}><Search size={19}/></button><button className="icon-btn" aria-label="Wishlist"><Heart size={19}/></button><button className="cart-btn" onClick={()=>setDrawerOpen(true)} aria-label="Open cart"><ShoppingBag size={20}/><span>{count}</span></button><button className="mobile-toggle" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button></div>
    </div>
  </header>;
}