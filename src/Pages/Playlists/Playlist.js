import { useVideos } from "../../Context";
import { Loading } from "../../Components";
import { Playlistcard } from "./Components/PlaylistCard";
import PlaylistStyles from "./Playlist.module.css";

export const Playlist = () => {
  const { state } = useVideos();
  const playlists = state.playlist;
  return (
    <div className={`${PlaylistStyles.allPlaylists__container}`}>
      {state.videos.length === 0 ? (
        //check if videos have loaded or not
        <Loading />
      ) : playlists.length > 0 ? (
        playlists.map((playlist) => (
          <Playlistcard
            playlistId={playlist._id}
            playlistName={playlist.playlistName}
            videos={playlist.videos}
            key={playlist._id}
          />
        ))
      ) : (
        <h1>No Playlists available</h1>
      )}
    </div>
  );
};
