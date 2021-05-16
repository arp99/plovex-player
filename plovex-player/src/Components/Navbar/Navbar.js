import "./Navbar.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import { MdMenu , MdClose} from "react-icons/md"

export const Navbar = () =>{
    const [ showNav , setShowNav ] = useState(false)
    return(
        <nav className="navbar__container">
            <div className="navbar__header">
                <div className="navbar__brand">Plovex-player</div>
                <button 
                    className="btn" 
                    onClick={()=>setShowNav(prev => !prev)}
                >
                    {showNav?<MdClose />:<MdMenu />}
                </button>
            </div>
            <div 
                className={showNav ?"navbar__list-items show" :"navbar__list-items"} >
                <ul className="list__container">
                    <li className="list__item">
                        <Link to="/playlist">
                            Playlist
                        </Link>
                    </li>
                    <li className="list__item">
                        <Link to="/watchlater">
                            Watchlater
                        </Link>
                    </li>
                    <li className="list__item">
                        <Link to="/liked">
                            Liked
                        </Link>
                    </li>
                    <li className="list__item">
                        <Link to="/history">
                            History
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}