import { Link } from "react-router-dom";
import NewRoom from "./NewRoom";
// eslint-disable-next-line react/prop-types
function Sidebar ({rooms}) {
    
    return (
        <div className="sideBar">
            {/* discover */}
            <div className="top">
                <Link to = "discover">
                    <img className = "account_link" src="/explore_24dp_5F6368.svg" alt="Navigation" />
                </Link>
                
                {/* Adding Chatrooms/Servers */}
                
            </div>
            <NewRoom rooms = {rooms}/>
            {/* <div className="chatrooms">
                <div className="chatroom">
                    <img src="groups_24dp_5F6368.svg" alt="ChatRooms" />
                    <div>Chatrooms</div>
                </div>
                
                <div className="add-chatroom">
                   
                </div>
                <img src="add_circle_outline_24dp_5F6368.svg" alt="Add" />
            </div>
          */}
            <Link to = "/user">
                <img className="account_link" src="/account_circle_24dp_5F6368.svg" alt="Account" />
            </Link>
            
        </div>
    )
}
export default Sidebar