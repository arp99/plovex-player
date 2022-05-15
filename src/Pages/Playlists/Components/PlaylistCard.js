import PlaylistStyles from "../Playlist.module.css";
import { RiPlayList2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export const Playlistcard = ({ playlistName, playlistId, videos }) => {
  const thumbnail =
    videos.length > 0
      ? videos[0].thumbnail
      : "https://i.ytimg.com/img/no_thumbnail.jpg";

  const navigate = useNavigate();
  return (
    <div
      className={`${PlaylistStyles["playlist-card__container"]}`}
      onClick={() =>
        navigate(`/playlist/${playlistId}`, {
          state: {
            videos,
            playlistName,
          },
        })
      }
    >
      <div className={`${PlaylistStyles["playlist-video-count"]}`}>
        <RiPlayList2Fill color="#292831" size={35} />
        <span style={{ color: "white", marginLeft: "8px", fontSize: "1.5rem" }}>
          {videos.length}
        </span>
      </div>
      <div className={`${PlaylistStyles["playlist-thumnail__container"]}`}>
        <img src={thumbnail} alt="sample" className="card-img" />
      </div>
      <div className={`${PlaylistStyles.playlist_name}`}>
        <h1 className="heading">{playlistName}</h1>
      </div>
    </div>
  );
};
