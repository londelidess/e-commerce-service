import React from 'react';
// import { BubbleChat } from 'flowise-embed-react'
import "./ChatBot.css";

function ChatBot() {
    return (
        <BubbleChat
            chatflowid="761007b0-4c69-4013-8b64-fb421b3fcca7"
            apiHost="https://flowise-ai-makoto.onrender.com"
            theme={{
                button: {
                    backgroundColor: "gold",
                  },
                chatWindow: {
                    welcomeMessage:"Hello! Welcome to PLAYBOX! I am an AI assistant. How can I assist you today? You can ask me about our products, or any other inquiries you might have.",
                    botMessage:{
                        showAvatar: true,
                        avatarSrc: "https://64.media.tumblr.com/1b92dccaf54b1bed9599a2e97167760d/a8a000f166be391d-d8/s540x810/26bdc54fd0f2c8b556032a871fd43a678d7dd3ed.jpg",
                    },
                    userMessage:{
                        backgroundColor: "gold",
                        textColor:'black',

                    },
                    textInput: {
                        placeholder: "Please type your question🤖",
                        sendButtonColor: "gold",
                      },
                }
            }}
        />
    );
};

export default ChatBot
