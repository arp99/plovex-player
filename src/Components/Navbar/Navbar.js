import NavStyle from "./Navbar.module.css"
import { Link } from "react-router-dom"
import { MdHome , MdHistory , MdPlaylistAdd , MdWatchLater , MdFavorite } from "react-icons/md"
import { IconContext } from "react-icons";
import { useTheme } from "../../Context";
import { IconStyle } from "../../Utilities";

export const Navbar = () =>{
    const { theme } = useTheme()

    const getDarkNavbar = () =>{
        return theme === "dark"
            ?
            `${NavStyle.dark_navbar}`
            :
            ``
    }
    const getDarkListItem = () =>{
        return theme === "dark"
            ?
            `${NavStyle.dark_list__item}`
            :
            ``
    }
    return(
        <nav className={`${NavStyle.navbar__container}`}>
            <div 
                className={`${NavStyle['navbar__list-items']} ${getDarkNavbar()}`} >
                <IconContext.Provider value={IconStyle()} >
                    <ul className={`${NavStyle.list__container}`}>
                        <li className={`${NavStyle.list__item} ${getDarkListItem()}`}>
                            <Link to="/">
                                <MdHome />
                            </Link>
                        <small>Home</small>
                        </li>
                        <li className={`${NavStyle.list__item} ${getDarkListItem()}`}>
                            <Link to="/playlist">
                                <MdPlaylistAdd />
                            </Link>
                            <small>Playlists</small>
                        </li>
                        <li className={`${NavStyle.list__item} ${getDarkListItem()}`}>
                            <Link to="/watchlater">
                                <MdWatchLater />
                            </Link>
                            <small>Watchlater</small>
                        </li>
                        <li className={`${NavStyle.list__item} ${getDarkListItem()}`}>
                            <Link to="/liked-videos">
                                <MdFavorite />
                            </Link>
                            <small>Likes</small>
                        </li>
                        <li className={`${NavStyle.list__item} ${getDarkListItem()}`}>
                            <Link to="/history">
                                <MdHistory />
                            </Link>
                            <small>History</small>
                        </li>
                    </ul>
                </IconContext.Provider>
            </div>
        </nav>
    )
}