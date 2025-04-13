import { useEffect, useState } from "react";
import "./VoiceLines.css";

type MessageType = "whisper" | "talking" | "shouting" | null;

const Voice = () => {
  // States
  const [isActive, setIsActive] = useState<boolean>(true);
  const [messageType, setMessageType] = useState<MessageType>("whisper");
  const [isVisible, setIsVisible] = useState<boolean>(true); 

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (
        typeof event.data === "object" &&
        event.data !== null &&
        event.data.type
      ) {
        switch (event.data.type) {
          case "toggleVoice":
            setIsVisible((prev) => !prev); // Toggle visibility
            break;
          case "startVoice":
            setIsActive(true);
            break;
          case "stopVoice":
            setIsActive(false);
            setMessageType(null); // Reset the messageType when voice stops
            break;
          case "whisper":
            setMessageType("whisper");
            break;
          case "talking":
            setMessageType("talking");
            break;
          case "shouting":
            setMessageType("shouting");
            break;
          default:
            setMessageType(null);
            break;
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (!isVisible) {
    return null; // Return nothing if the component is not visible
  }

  return (
    <div id="container" className={`flex items-end justify-end h-full w-full`}>
      <div
        className={`m-7 mx-8 flex flex-col gap-3 items-center skew-active ${
          isActive ? "active" : "inactive"
        }`}
      >
        <div
          id="voice_lines"
          className="flex gap-1.5 items-center justify-center"
        >
          <div className="w-1 h-4 rounded-full voice-line line-1"></div>
          <div className="w-1 h-4 rounded-full voice-line line-2"></div>
          <div className="w-1 h-4 rounded-full voice-line line-3"></div>
          <div className="w-1 h-4 rounded-full voice-line line-4"></div>
          <div className="w-1 h-4 rounded-full voice-line line-5"></div>
          <div className="w-1 h-4 rounded-full voice-line line-6"></div>
          <div className="w-1 h-4 rounded-full voice-line line-7"></div>
          <div className="w-1 h-4 rounded-full voice-line line-8"></div>
        </div>
        <div id="voice_buttons" className="flex gap-2">
          <div
            className={`border-black border-opacity-40 border-[1px] w-6 h-[.4rem] rounded-full shadow-sm shadow-[#ffffff25]  ${
              messageType === "whisper" ||
              messageType === "talking" ||
              messageType === "shouting"
                ? "bg-[#a5f984]"
                : "bg-black"
            }`}
          ></div>
          <div
            className={`border-black border-opacity-40  border-[1px] w-6 h-[.4rem] rounded-full shadow-sm shadow-[#ffffff25]  ${
              messageType === "talking" || messageType === "shouting"
                ? "bg-[#a5f984]"
                : "bg-black"
            }`}
          ></div>
          <div
            className={`border-black border-opacity-40  border-[1px] w-6 h-[.4rem] rounded-full shadow-sm shadow-[#ffffff25]  ${
              messageType === "shouting" ? "bg-[#a5f984]" : "bg-black"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Voice;
