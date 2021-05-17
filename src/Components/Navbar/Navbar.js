import "./Navbar.css"
import { Link } from "react-router-dom"
import { MdHome , MdHistory , MdPlaylistAdd , MdWatchLater , MdFavorite } from "react-icons/md"
import { IconContext } from "react-icons";

export const Navbar = () =>{
    const iconStyle = {
        color:"turquoise",
        size:"2rem"
    }
    return(
        <nav className="navbar__container">
            <div 
                className="navbar__list-items" >
                <IconContext.Provider value={iconStyle} >
                    <ul className="list__container">
                        <li className="list__item">
                            <Link to="/">
                                <MdHome />
                            </Link>
                        </li>
                        <li className="list__item">
                            <Link to="/playlist">
                                <MdPlaylistAdd />
                            </Link>
                        </li>
                        <li className="list__item">
                            <Link to="/watchlater">
                                <MdWatchLater />
                            </Link>
                        </li>
                        <li className="list__item">
                            <Link to="/liked">
                                <MdFavorite />
                            </Link>
                        </li>
                        <li className="list__item">
                            <Link to="/history">
                                <MdHistory />
                            </Link>
                        </li>
                    </ul>
                </IconContext.Provider>
            </div>
        </nav>
    )
}