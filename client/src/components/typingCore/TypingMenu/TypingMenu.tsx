import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { timeOptions } from "./TypingMenu.data";
import { faClock } from "@fortawesome/free-regular-svg-icons";

interface ITypingMenu {
    selectedTimeOption: number;
    sendTimeOption: (timeOption: number) => void;
}

export default function TypingMenu({
    selectedTimeOption,
    sendTimeOption,
}: ITypingMenu) {
    function handleSelectTimeOption(event: any) {
        sendTimeOption(event.target.value);
    }
    return (
        <nav className="flex justify-center text-sm">
            <ul
                className={
                    "flex justify-center w-min bg-neutral-800 rounded-lg items-center"
                }
            >
                <li
                    key={"clock-icon"}
                    className="border-r-2 border-gray-500 h-full py-2 px-8"
                >
                    <FontAwesomeIcon icon={faClock} />
                </li>
                {timeOptions.map((elem, index) => (
                    <li
                        key={`timeoption-${index}`}
                        className={`px-8 py-2 cursor-pointer transition duration-200 ease-in-out hover:text-white ${
                            selectedTimeOption === elem ? "text-white" : ""
                        }`}
                        onClick={handleSelectTimeOption}
                        value={elem}
                    >
                        {elem}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
