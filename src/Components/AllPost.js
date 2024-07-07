import React, {useRef} from "react";
import "./Styles/allpost.css";
import { SlOptions } from "react-icons/sl";
import { GiSelfLove } from "react-icons/gi";
import { TfiCommentAlt } from "react-icons/tfi";
import { BiRepost } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";


function AllPost({ socialData, likePostBtn }) {
  function getExtension(filename) {
    return filename?.split(/[#?]/)[0].split(".").pop().trim();
  }

  const auth = useSelector((state) => state.auth)
  const user = auth.user

  console.log(user)


  return (
    <div className="allpost-container">
      {socialData &&
        socialData.map((soc) => {
          return (
            <div className="inside-container" key={soc.pk}>
              <div className="top">
                <div className="left-img-text">
                  <img src={soc.user.profile_image} alt="" />
                  <div className="top-text">
                    <span className="text-t">{soc.user.username}</span>
                    <span className="text-b">
                      <Moment format="D MMM YYYY">{soc.date_post}</Moment>
                    </span>
                  </div>
                </div>
                <SlOptions className="option" />
              </div>
              <div className="allpost-text">
                <p>{soc.user_post}</p>
                {getExtension(soc.file) === "MP4" ||
                getExtension(soc.file) === "mp4" ? (
                  <video controls>
                    <source src={soc.file} type="video/mp4" />
                  </video>
                ) : soc.file === null ? (
                  ""
                ) : (
                  <img src={soc.file} alt="pict" />
                )}
              </div>
              <hr />
              <div className="bottom">
                <div
                  className="bottom-like"
                  onClick={() => likePostBtn(soc.pk)}
                >
                  {
                    soc.user_like_post.includes(user) ? <BiSolidLike className="icon-color" /> : <BiSolidDislike className="icon-color" />
                  }
                  

                  <span className="like">
                    {`${soc.user_like_post.length === 1}`
                      ? `${soc.user_like_post.length} Like`
                      : `${soc.user_like_post.length} Likes`}
                  </span>
                </div>
                <div className="bottom-comment">
                  <div>
                    <TfiCommentAlt className="icon-color" />
                    <span className="comment">
                      {soc.comments.length} Commnets
                    </span>
                  </div>
                  <div>
                    <BiRepost className="icon-color" />
                    <span className="repost">0 Repost</span>
                  </div>
                </div>
              </div>
              <br></br>
            </div>
          );
        })}
    </div>
  );
}

export default AllPost;
