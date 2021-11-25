import NavStyle from "./Navbar.module.css"
import { useTheme } from "../../Context";
import { Link } from "react-router-dom"

export const Listitem  = props =>{
    const { theme } = useTheme()

    const getDarkListItem = () =>{
        return theme === "dark"
            ?
            `${NavStyle.dark_list__item}`
            :
            ``
    }
    return(
        <li className={`${NavStyle.list__item} ${getDarkListItem()}`}>
            <Link to={ props.link }>
                { props.children }
            </Link>
        </li>
    )
}