import { useVideos } from "../../Context";
import { HorizontalVideoCard, Loading } from "../../Components";
import WatchlaterStyles from "./Watchlater.module.css";

export const Watchlater = () => {
  const { state } = useVideos();
  const videoData = state.watchLater;

  return (
    <div className={`${WatchlaterStyles.watchlater__container}`}>
      <h1 className="heading">Watchlater</h1>
      {state.videos.length === 0 ? (
        <Loading />
      ) : videoData.length === 0 ? (
        <small>No videos in Watchlater</small>
      ) : (
        <div className={`${WatchlaterStyles["watchlater-videos"]}`}>
          {videoData.map((video) => {
            return (
              <HorizontalVideoCard
                key={video._id}
                videoData={video}
                type="REMOVE_FROM_WATCHLATER"
                url="https://plovex-player-backend-production.up.railway.app/watchlater"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
