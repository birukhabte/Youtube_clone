import React, { useEffect, useState } from 'react'
import './Recommended.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'

import { API_KEY } from '../../Data'
import { value_converter } from '../../Data'
import { Link } from 'react-router-dom'



function Recommended({ categoryId }) {
    const [apiData, setApiData] = useState([])
    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(videoList_url)
            .then(res => res.json())
            .then(data => setApiData(data.items || []));
    }

    useEffect(() => {
        fetchData();
    }, [categoryId]);
    return (
        <div className='recommended'>
            {apiData.map((item, index) => {
                const snippet = item.snippet;
                return (
                    <Link to={`/video/${snippet.categoryId}/${item.id}`} key={item.id || index} className="side-video-list">
                        <img src={snippet?.thumbnails?.medium?.url || thumbnail1} alt={snippet?.title || ''} />
                        <div className='vid-info'>
                            <h4>{snippet?.title || 'No title'}</h4>
                            <p>{snippet?.channelTitle || 'Unknown Channel'}</p>
                            <p>{item.statistics ? value_converter(item.statistics.viewCount) + ' views' : ''}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Recommended