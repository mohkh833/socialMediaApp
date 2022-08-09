import { useState, useEffect } from "react";
import { publicRequest } from "../../requestMethod";
import { Post } from "./Post/Post";
import FALLBACK_IMAGE from "../../assets/noPosts.png";
import "./Post.css";
import Loading from "../Loading/Loading";

export const Posts = () => {
    const [PostsLoaded, setPostsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
            try {
                setPostsLoaded(false);
                const res = await publicRequest.get("/post");
                if (res.data.status === "success") {
                    setPosts(res.data.data);
                    setPostsLoaded(true);
                }
            } catch (err) {
                
            }
        };
        getPosts();
    }, []);
    
    if (PostsLoaded) {
        return (
            <div className="row">
                {
                    posts.map((item) => (
                        <Post item={item} key={item.id} />
                    ))
                }
            </div>
        );
    } else if(posts.length == 0) {
        return(
            <div className="noPosts">
                <img src={FALLBACK_IMAGE}  />
            </div>
        )
    }
    
    else {
        return <Loading />;
    }
};
