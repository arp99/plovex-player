import { useVideos } from "../../Context";
import { HorizontalVideoCard, Loading } from "../../Components";
import HistoryStyles from "./History.module.css";

export const History = () => {
  const { state } = useVideos();
  const historyData = state.history;
  return (
    <div className={`${HistoryStyles.history__conatainer}`}>
      <h1 className="heading">History</h1>
      {state.videos.length === 0 ? (
        <Loading />
      ) : historyData.length === 0 ? (
        <small>Nothing in Watch History.</small>
      ) : (
        <div className={`${HistoryStyles["history-videos"]}`}>
          {historyData.map((video) => {
            return (
              <HorizontalVideoCard
                videoData={video}
                key={video._id}
                type="REMOVE_FROM_HISTORY"
                url="https://plovex-player-backend-production.up.railway.app/history"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
