import { useState, useEffect, useRef } from 'react'
import './ChatPage.css'
import { useAuthContext } from "../shared/hooks/AuthContext";
interface Message {
    id: string;
    type: string;
    text: string;
    timestamp: Date;
}

function ChatPage() {
    
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [userId, setUserId] = useState('');
    const [roomName, setRoomName] = useState('');
    const [currentRoom, setCurrentRoom] = useState<string | null>(null);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const {user} = useAuthContext();


    const connectToWebSocket = () => {
        const userIdValue = user?.profile?.username;
        if (!userIdValue) {
            alert('Please enter a user ID');
            return;
        }

        if (ws) return;

        const webSocket = new WebSocket('ws://localhost:8081/websocket/');

        webSocket.onopen = () => {
            setIsConnected(true);
            const room = roomName.trim();
            setCurrentRoom(room);
            webSocket.send(`USER:${userIdValue}:${room}`)
        }

        webSocket.onmessage = (event) => {
            const message = event.data;

            if (message.includes('Welcome') && !isRegistered) {
                setIsRegistered(true);
                addMessage(message, 'system');
            }else if (message.includes('joined') || message.includes('left')) {
                addMessage(message, 'system');
            } else {
                addMessage(message, 'received');
            }
        }

        webSocket.onclose = (event) => {
            setIsConnected(false);
            setIsRegistered(false);
            setCurrentRoom(null);
            setWs(null);
            addMessage('Connection closed: ' + event.code + ' ' + event.reason  , 'system');
        }

        setWs(webSocket);
    }

    const disconnect = () => {
        if (ws) {
            ws.close();

        }
    } 

    const addMessage = (text: string, type: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            type,
            text,
            timestamp: new Date(),
        }

        setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    const sendMessage = () => {
        const message = messageInput.trim();
        if (ws && isConnected && isRegistered && message) {
            ws.send(message);
           
            setMessageInput('');
        }

    
   
    }

    const formatClaim = (_key: string, value?: any) =>{
        if(typeof value === 'object' && value !== null) {
            return JSON.stringify(value);
        }
        if(typeof value === 'boolean') {
            return value ? 'true' : 'false';
        }
        if(typeof value === 'number') {
            return value.toString();
        }
        return String(value || '');
    }
   const checkUsername = () => {
        if(formatClaim(user?.profile?.username) == "admin") {
            return "admin";
        }
        return '';
    }

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1>Chat</h1>
                <div className="user-setup">
                    <h1>Hola: {user?.profile?.username} comienza a chatear:</h1>
                    
                    
                    <input 
                        type="text" 
                        value={roomName} 
                        onChange={(e) => setRoomName(e.target.value)} 
                        placeholder='Room Name' 
                        disabled={isConnected} 
                        className='room-input' 
                    />
                    <button onClick={connectToWebSocket} disabled={isConnected} className='connect-btn'>Connect</button>
                    <button onClick={disconnect} disabled={!isConnected} className='disconnect-btn'>Disconnect</button>
                    <span className="status">{isConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
            </div>

            <div className="input-container">
                <input 
                    type="text" 
                    value={messageInput} 
                    onChange={(e) => setMessageInput(e.target.value)}   
                    placeholder="Type your message..." 
                    className="message-input"
                    disabled={!isRegistered}
                />  
                <button onClick={sendMessage} disabled={!isRegistered} className='send-btn'>Send</button>
            </div>    
            
            <div className="messages-container">
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.type}`}> 
                        <div className="message-content">{message.text}</div>
                    </div>
                ))}
            </div>
            
        </div>
    )

}

export default ChatPage;    