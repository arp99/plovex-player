import NavStyle from "./Navbar.module.css"
import { MdHome , MdHistory , MdPlaylistAdd , MdWatchLater , MdFavorite } from "react-icons/md"
import { IconContext } from "react-icons";
import { useTheme } from "../../Context";
import { IconStyle } from "../../Utilities";
import { Listitem } from "./Listitem";

export const Navbar = () =>{
    const { theme } = useTheme()

    const getDarkNavbar = () =>{
        return theme === "dark"
            ?
            `${NavStyle.dark_navbar}`
            :
            ``
    }
    
    return(
        <nav className={`${NavStyle.navbar__container}`}>
            <div 
                className={`${NavStyle['navbar__list-items']} ${getDarkNavbar()}`} >
                <IconContext.Provider value={IconStyle()} >
                    <ul className={`${NavStyle.list__container}`}>
                        <Listitem link="/">
                            <MdHome />
                            <small className={`${NavStyle.nav_title}`}>Home</small>
                        </Listitem>        
                        <Listitem link="/playlist">
                            <MdPlaylistAdd />
                            <small className={`${NavStyle.nav_title}`}>Playlists</small>
                        </Listitem>
                        <Listitem link="/watchlater">
                            <MdWatchLater />
                            <small className={`${NavStyle.nav_title}`}>Watchlater</small>
                        </Listitem>
                        <Listitem link="/liked-videos">
                            <MdFavorite />
                            <small className={`${NavStyle.nav_title}`}>Likes</small>
                        </Listitem>
                        <Listitem link="/history">
                            <MdHistory />
                            <small className={`${NavStyle.nav_title}`}>History</small>
                        </Listitem>
                    </ul>
                </IconContext.Provider>
            </div>
        </nav>
    )
}