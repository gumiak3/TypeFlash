import { useState } from "react";
import TypingCore from "./TypingCore";
import TypingMenu from "./TypingMenu/TypingMenu";

export default function TypingDashboard() {
    const [timeOption, setTimeOption] = useState<number>(30);

    function handleSettingTimeOption(timeOption: number) {
        setTimeOption(timeOption);
    }

    return (
        <section className="box-border p-8 text-gray-500">
            <TypingMenu
                selectedTimeOption={timeOption}
                sendTimeOption={handleSettingTimeOption}
            />
            <TypingCore timeOption={timeOption} />
        </section>
    );
}
