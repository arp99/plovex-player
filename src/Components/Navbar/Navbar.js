import NavStyle from "./Navbar.module.css"
import { Link } from "react-router-dom"
import { MdHome , MdHistory , MdPlaylistAdd , MdWatchLater , MdFavorite } from "react-icons/md"
import { IconContext } from "react-icons";
import { useTheme } from "../../Context";

export const Navbar = () =>{
    const { theme } = useTheme()
    
    const iconStyle = {
        color:"turquoise",
        size:"2rem"
    }
    const darkIconStyle = {
        color:"#7a9fba",
        size:"2rem"
    }

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
    const getIconStyle = () =>{
        return theme === "dark"
            ?
            darkIconStyle
            :
            iconStyle
    }
    return(
        <nav className={`${NavStyle.navbar__container}`}>
            <div 
                className={`${NavStyle['navbar__list-items']} ${getDarkNavbar()}`} >
                <IconContext.Provider value={getIconStyle()} >
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