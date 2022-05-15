import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useVideos } from "../../../Context";
import { IconStyle } from "../../../Utilities";
import PlaylistVideoCardStyle from "./PlaylistVideoCard.module.css";

import axios from "axios";

export const PlaylistVideoCard = ({ videoData, playlistId }) => {
  const { dispatch } = useVideos();

  const truncateStr = (str) =>
    str.length > 40 ? `${str.substring(0, 60)}...` : str;

  const removeVideoFromPlaylist = async () => {
    try {
      await axios.delete(
        `https://plovex-player-backend-production.up.railway.app/playlists/remove-video/${playlistId}?videoId=${videoData._id}`
      );
      dispatch({
        type: "REMOVE_FROM_PLAYLIST",
        payload: { playlistId, videoId: videoData.videoId },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={PlaylistVideoCardStyle.video__container}>
      <div className={PlaylistVideoCardStyle.thumbnail__container}>
        <Link to={`/v/${videoData.videoId}`}>
          <img src={videoData.thumbnail} alt="sample" className="card-img" />
        </Link>
      </div>
      <div className={PlaylistVideoCardStyle["video-description__container"]}>
        <p>{truncateStr(videoData.title)}</p>
        <IconContext.Provider value={IconStyle()}>
          <RiDeleteBin6Line
            className="btn-action"
            onClick={removeVideoFromPlaylist}
          />
        </IconContext.Provider>
      </div>
    </div>
  );
};
