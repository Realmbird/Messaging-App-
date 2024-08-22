import { Link } from "react-router-dom";
function Sidebar () {
    return (
        <div className="sideBar">
            <div className="top">
                <img src="explore_24dp_5F6368.svg" alt="Navigation" />
                {/* Adding Chatrooms/Servers */}
                
            </div>
          
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
                <img className="account_link" src="account_circle_24dp_5F6368.svg" alt="Account" />
            </Link>
            
        </div>
    )
}
export default Sidebar