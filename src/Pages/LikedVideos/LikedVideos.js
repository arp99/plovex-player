import { useVideos } from "../../Context";
import { HorizontalVideoCard, Loading } from "../../Components";
import LikedVideosStyles from "./LikedVideos.module.css";

export const LikedVideos = () => {
  const { state } = useVideos();

  const likedVideos = state.liked;

  return (
    <div className={`${LikedVideosStyles.likedvideos__container}`}>
      <h1 className="heading">Liked Videos</h1>
      {state.videos.length === 0 ? (
        <Loading />
      ) : likedVideos.length === 0 ? (
        <small>No Liked Videos</small>
      ) : (
        <div className={`${LikedVideosStyles["liked-videos"]}`}>
          {likedVideos.map((video) => {
            return (
              <HorizontalVideoCard
                key={video._id}
                videoData={video}
                type="TOGGLE_LIKE"
                url="https://plovex-player-backend-production.up.railway.app/liked-videos"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
