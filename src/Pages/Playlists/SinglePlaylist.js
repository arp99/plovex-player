import { useLocation, useParams } from "react-router-dom";
import SinglePlaylistStyles from "./SinglePlaylist.module.css";
import { PlaylistVideoCard } from "./Components/PlaylistVideosCard";
import { useVideos } from "../../Context";
import { Loading } from "../../Components";

export const Singleplaylist = () => {
  const { playlistId } = useParams();
  const location = useLocation();
  const {
    state: { playlist },
  } = useVideos();
  const { playlistName } = location.state || {};
  const videos = playlist.find(
    (playlist) => playlist._id === playlistId
  )?.videos;

  const thumbnail =
    videos?.length > 0
      ? videos[0]?.thumbnail
      : "https://i.ytimg.com/img/no_thumbnail.jpg";

  return (
    <>
      {!videos ? (
        <Loading />
      ) : (
        <div className={`${SinglePlaylistStyles["playlist__container"]}`}>
          <div
            className={`${SinglePlaylistStyles["playlist-description__container"]}`}
          >
            <img src={thumbnail} alt="sample" />
            <h1>{playlistName}</h1>
          </div>
          <div
            className={`${SinglePlaylistStyles["playlist-videos__container"]}`}
          >
            {videos?.map((video) => (
              <PlaylistVideoCard
                videoData={video}
                key={video._id}
                playlistId={playlistId}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
