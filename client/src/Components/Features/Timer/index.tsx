import { Howl } from "howler";
import React from "react";
import Setup from "./Setup";
import Timer from "./Timer";

const TimerIndex = () => {
  const howl = new Howl({ src: require("../../../Chime.wav") });

  const [currentPage, setCurrentPage] = React.useState<"setup" | "timer">(
    "setup"
  );

  return (
    <>
      {currentPage === "setup" ? (
        <Setup GoToTimer={() => setCurrentPage("timer")} />
      ) : (
        <Timer howl={howl} GoToSetup={() => setCurrentPage("setup")} />
      )}
    </>
  );
};

export default TimerIndex;
