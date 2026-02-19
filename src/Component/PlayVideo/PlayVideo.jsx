import React, { useEffect, useState } from 'react'
import { API_KEY } from '../../Data'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { value_converter } from '../../Data'
import moment from 'moment'

function PlayVideo({ videoId }) {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=snippet,contentDetails,statistics`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then(data => setApiData(data.items && data.items[0]));
  }

  const fetchChannelData = async () => {
    if (!apiData || !apiData.snippet || !apiData.snippet.channelId) return;
    const channelData_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url)
      .then((res) => res.json())
      .then(data => setChannelData(data.items && data.items[0]));
  }

  const fetchcommentData = async () => {
    const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url)
      .then((res) => res.json())
      .then(data => setCommentData(data.items));
  }


  useEffect(() => {
    fetchVideoData();
    fetchcommentData();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [apiData?.snippet?.channelId]);

  return (
    <div className='play-video'>
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>
      <div className="play-video-info">
        <p>{apiData && apiData.statistics && apiData.statistics.viewCount ? value_converter(apiData.statistics.viewCount) : '16k'} views {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}</p>
        <div>
          <span><img src={like} alt="" />{apiData && apiData.statistics && apiData.statistics.likeCount ? value_converter(apiData.statistics.likeCount) : 155}</span>
          <span><img src={dislike} alt="" />1</span>
          <span><img src={share} alt="" />Share</span>
          <span><img src={save} alt="" />Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData && channelData.snippet && channelData.snippet.thumbnails ? channelData.snippet.thumbnails.default.url : ""} alt="" />
        <div><p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span> {channelData ? value_converter(channelData.statistics.subscriberCount) : ""} Subscribers </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>


        <hr />
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 102} Comments</h4>
        {Array.isArray(commentData) && commentData.map((item, index) => {
          const comment = item.snippet.topLevelComment.snippet;
          return (
            <div key={index} className="comment">
              <img src={comment.authorProfileImageUrl || user_profile} alt="" />
              <div>
                <h3>{comment.authorDisplayName} <span>{moment(comment.publishedAt).fromNow()}</span></h3>
                <p dangerouslySetInnerHTML={{ __html: comment.textDisplay }} />
                <div className='comment-action'>
                  <img src={like} alt="" />
                  <span>{comment.likeCount}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* end of .play-video */}
    </div>
  );
}

export default PlayVideo
