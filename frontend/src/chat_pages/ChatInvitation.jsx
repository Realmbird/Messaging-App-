
import './ChatWindow.css'
import PropTypes from 'prop-types';

function ChatInvitation ({ name = "Unknown" }) {
    const joinGroup = () => {
        console.log("joined")
    }
    // id: integer, name: text, created_at: datetime, updated_at: datetime, user_id: integer
    return(
        <div className='ChatInvitation'>
           {name}
                
           <button className = "join_group" onClick={joinGroup}>Join</button>
        </div> 
    )
}

ChatInvitation.propTypes = {
    name: PropTypes.string,
};
export default ChatInvitation